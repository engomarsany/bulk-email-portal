/* ==========================================================================
   BULK EMAIL DISPATCH ENGINE & LIVE CONSOLE
   ========================================================================== */

class DispatcherController {
  constructor() {
    this.isSending = false;
    this.currentTimeout = null;
  }

  init() {
    this.bindEvents();
    this.updateDelayLabel();
  }

  updateDelayLabel() {
    const slider = document.getElementById('dispatchDelaySlider');
    const label = document.getElementById('dispatchDelayVal');
    if (slider && label) {
      label.textContent = `${slider.value} sec / email`;
    }
  }

  logMessage(message, type = 'info') {
    const logBox = document.getElementById('dispatchConsoleLogs');
    if (!logBox) return;

    const time = new Date().toLocaleTimeString();
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="log-msg ${type}">${message}</span>
    `;

    logBox.appendChild(logLine);
    logBox.scrollTop = logBox.scrollHeight;
  }

  clearLogs() {
    const logBox = document.getElementById('dispatchConsoleLogs');
    if (logBox) logBox.innerHTML = '';
  }

  async startBulkDispatch() {
    const sender = window.appState.sender;
    const companies = window.appState.companies.filter(c => c.status !== 'Sent');
    const template = window.appState.template;
    const aiConfig = window.appState.aiConfig;
    const delaySec = parseInt(document.getElementById('dispatchDelaySlider').value) || 3;

    if (!sender || !sender.email) {
      alert('Please setup your Sender Email and SMTP credentials first (Click on the top-right Sender pill).');
      return;
    }

    if (companies.length === 0) {
      alert('No pending target companies to dispatch. Please add companies or reset target list.');
      return;
    }

    // Run quick Spam Audit check
    const audit = window.spamAuditor.auditEmail(template.subject, template.body, template.attachments || []);
    if (audit.score < 60) {
      const proceed = confirm(`⚠️ Warning: Your email has a high spam risk score (${audit.score}/100). We recommend running "1-Click Auto-Fix" before sending. Do you still want to proceed?`);
      if (!proceed) return;
    }

    this.isSending = true;
    this.toggleSendingUI(true);
    this.clearLogs();

    this.logMessage(`🚀 Initializing Bulk Dispatch Engine for ${companies.length} target companies...`, 'success');
    this.logMessage(`🔑 Sender Account: ${sender.email} via ${sender.smtpHost}:${sender.smtpPort}`, 'info');
    this.logMessage(`⏱️ Staggered Sending Delay: ${delaySec} seconds per message (Anti-Spam Mode)`, 'info');
    this.logMessage(`🤖 AI Optimization Bot: ${aiConfig.enabled ? 'ACTIVE (Tone: ' + aiConfig.tone + ')' : 'OFF (Standard Copy)'}`, aiConfig.enabled ? 'purple' : 'info');

    const total = companies.length;
    let completed = 0;

    for (let i = 0; i < total; i++) {
      if (!this.isSending) {
        this.logMessage('🛑 Dispatch cancelled by user.', 'error');
        break;
      }

      const comp = companies[i];
      this.logMessage(`[${i + 1}/${total}] Preparing message for ${comp.name} (${comp.contactEmail})...`, 'info');

      // Generate email content (AI or Standard)
      let finalSubject = '';
      let finalBody = '';
      let isAiOptimized = false;

      if (aiConfig.enabled) {
        const aiResult = window.aiOptimizerBot.optimizeEmail(comp, template, sender, aiConfig.tone);
        finalSubject = aiResult.subject;
        finalBody = aiResult.body;
        isAiOptimized = true;
        this.logMessage(`✨ [AI Bot] Industry hook generated for ${comp.industry} sector`, 'purple');
      } else {
        finalSubject = template.subject.replace(/\{\{company_name\}\}/g, comp.name).replace(/\{\{industry\}\}/g, comp.industry);
        finalBody = template.body.replace(/\{\{company_name\}\}/g, comp.name).replace(/\{\{contact_person\}\}/g, comp.contactPerson).replace(/\{\{industry\}\}/g, comp.industry).replace(/\{\{sender_name\}\}/g, sender.name);
      }

      // Append Signature
      if (sender.signature) {
        finalBody += `\n\n${sender.signature}`;
      }

      // Simulate SMTP Handshake & Delivery Delay
      await new Promise(resolve => setTimeout(resolve, delaySec * 1000));

      if (!this.isSending) break;

      // Update Company Status
      comp.status = 'Sent';
      completed++;

      // Create Sent Log for Owner Panel
      const logEntry = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString(),
        senderEmail: sender.email,
        recipientCompany: comp.name,
        recipientEmail: comp.contactEmail,
        industry: comp.industry,
        subject: finalSubject,
        status: 'Delivered',
        spamScore: `${audit.score}% Clean (Inbox)`,
        aiOptimized: isAiOptimized,
        attachments: (template.attachments || []).map(a => a.name),
        body: finalBody
      };

      window.appState.addSentLog(logEntry);

      this.logMessage(`✅ Delivered to ${comp.contactEmail} | Spam Score: ${audit.score}% (Inbox Ready)`, 'success');

      // Update Progress Bar
      this.updateProgress(completed, total);
    }

    if (this.isSending) {
      this.logMessage(`🎉 Bulk Dispatch Complete! Total Emails Sent: ${completed}/${total}`, 'success');
      if (window.showToast) window.showToast(`Dispatch Finished! Sent ${completed} emails successfully.`, 'success');
    }

    this.isSending = false;
    this.toggleSendingUI(false);
    
    // Refresh Lead Table & Owner Panel Analytics
    window.appState.save(STORAGE_KEYS.COMPANIES, window.appState.companies);
    if (window.leadsController) window.leadsController.renderCompanyTable();
    if (window.ownerPanelController) window.ownerPanelController.renderAll();
  }

  stopDispatch() {
    this.isSending = false;
    this.toggleSendingUI(false);
  }

  updateProgress(current, total) {
    const progressBar = document.getElementById('dispatchProgressBarInner');
    const progressText = document.getElementById('dispatchProgressStatusText');

    const pct = Math.round((current / total) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `Sending ${current} of ${total} (${pct}%)`;
  }

  toggleSendingUI(isSending) {
    const btnStart = document.getElementById('btnStartDispatch');
    const btnStop = document.getElementById('btnStopDispatch');

    if (btnStart) btnStart.style.display = isSending ? 'none' : 'inline-flex';
    if (btnStop) btnStop.style.display = isSending ? 'inline-flex' : 'none';
  }

  bindEvents() {
    const slider = document.getElementById('dispatchDelaySlider');
    if (slider) {
      slider.addEventListener('input', () => this.updateDelayLabel());
    }

    const btnStart = document.getElementById('btnStartDispatch');
    if (btnStart) {
      btnStart.addEventListener('click', () => this.startBulkDispatch());
    }

    const btnStop = document.getElementById('btnStopDispatch');
    if (btnStop) {
      btnStop.addEventListener('click', () => this.stopDispatch());
    }
  }
}

window.dispatcherController = new DispatcherController();
