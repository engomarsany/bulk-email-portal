/* ==========================================================================
   MOUNT2OCEAN - NODE.JS SMTP REAL EMAIL BACKEND SERVER
   ========================================================================== */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend portal requests
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.static('.'));

// Real Email Dispatch API Endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { sender, recipientEmail, recipientName, subject, bodyText, attachments } = req.body;

    if (!recipientEmail || !subject || !bodyText) {
      return res.status(400).json({ success: false, error: 'Recipient email, subject, and body are required.' });
    }

    // SMTP Transporter setup (using sender configuration or environment defaults)
    const smtpHost = (sender && sender.smtpHost) ? sender.smtpHost : 'mail.mount2ocean.com';
    const smtpPort = (sender && sender.smtpPort) ? parseInt(sender.smtpPort) : 587;
    const smtpUser = (sender && sender.email) ? sender.email : 'sales@mount2ocean.com';
    const smtpPass = (sender && sender.appPassword) ? sender.appPassword : process.env.SMTP_PASSWORD;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false // Helps avoid SSL self-signed certificate errors
      }
    });

    // Construct Mail Options
    const mailOptions = {
      from: `"${sender.name || 'Ahsan | Sales Head'}" <${smtpUser}>`,
      to: recipientName ? `"${recipientName}" <${recipientEmail}>` : recipientEmail,
      subject: subject,
      text: bodyText,
      html: bodyText.replace(/\n/g, '<br>')
    };

    // Attach collateral files if provided
    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      mailOptions.attachments = attachments.map(att => ({
        filename: att.name,
        content: att.contentBase64 ? Buffer.from(att.contentBase64, 'base64') : att.content,
        path: att.path
      }));
    }

    // Send Mail via SMTP
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [SMTP SUCCESS] Real email sent to ${recipientEmail} | Message ID: ${info.messageId}`);

    return res.json({
      success: true,
      messageId: info.messageId,
      response: info.response
    });

  } catch (error) {
    console.error('❌ [SMTP ERROR]', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'SMTP Authentication / Transmission failed'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Mount2ocean SMTP Real Email Backend', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Mount2ocean Real SMTP Server running on port ${PORT}`);
  console.log(`📩 Dispatch API Endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`===================================================`);
});
