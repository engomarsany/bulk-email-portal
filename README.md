# 🚀 MailPulse AI - Bulk Email & Marketing Outreach Portal

Enterprise-grade **Bulk Email Marketing & Outreach Portal** featuring a Sender Credentials Manager, Lead & File Attachment Manager, optional **AI Email Optimizer Bot** (powered by Gemini AI logic), an **Anti-Spam Deliverability Protection Suite**, and a master **Owner / Admin Control Panel**.

![MailPulse AI Banner](https://img.shields.org/badge/MailPulse-AI%20Bulk%20Engine-6366f1?style=for-the-badge&logo=rocket)
![Deliverability Health](https://img.shields.org/badge/Deliverability-Inbox%20Ready%20(99.4%25)-10b981?style=for-the-badge&logo=shield)
![AI Engine](https://img.shields.org/badge/AI%20Optimizer-Gemini%20Flash-8b5cf6?style=for-the-badge&logo=sparkles)

---

## 🌟 Key Features

### 1. Dual Access Panel Architecture
- **Sender Outreach Panel**:
  - **Sender Credentials Setup**: Authenticate sender email, display name, SMTP server/port, app passwords, and email signature.
  - **CSV Target Lead Importer**: Drag & drop or upload CSV target company lists with automatic column parsing.
  - **File Attachment Support**: Attach pitch decks, PDF brochures, proposals, and images to bulk dispatches.
  - **Dynamic Token Composer**: Insert variable tags (`{{company_name}}`, `{{contact_person}}`, `{{industry}}`, `{{sender_name}}`) into email body & subject lines.

- **Owner / Admin Master Control Panel**:
  - **KPI Dashboard**: Track Total Bulk Emails Sent, Delivery Rate %, Spam Rate, and AI Usage Count.
  - **Analytics Charts**: Interactive Chart.js graph tracking daily dispatch volume and AI personalization trends.
  - **Raw Sent Email Content Inspector**: Search, filter, and inspect the exact content, body copy, timestamps, and attachments of any email sent by the team.
  - **Domain Deliverability & DNS Reputation Advisor**: Real-time status cards for SPF, DKIM, DMARC, and domain health.

---

### 2. AI Email Optimizer Bot (Optional Toggle Switch)
- **ON State**: Gemini-powered AI engine customizes subject lines, opening hooks, value propositions, and calls to action specifically tailored to each recipient's industry (e.g. FinTech, Healthcare, SaaS, E-Commerce, Logistics, Manufacturing).
- **OFF State**: Uses classic template token replacement mode.
- **Live AI Preview Modal**: Displays a side-by-side comparison of standard template copy vs AI-tailored copy for any target company.

---

### 3. Anti-Spam & Deliverability Engine (In-box Protection)
- **Real-Time Spam Auditor (0-100%)**:
  - Scans for spam trigger phrases ("100% free", "click here", "act now", ALL CAPS subject lines).
  - Verifies presence of dynamic personalization tokens.
  - Checks for mandatory CAN-SPAM / GDPR Unsubscribe links in footer.
- **1-Click Deliverability Auto-Fix**: Automatically cleans trigger words and inserts opt-out footer text.
- **Staggered Delay Sending Queue (1s - 10s)**: Spaces out dispatches to prevent rate-limiting and avoid spam filters.

---

## 📁 Repository Directory Structure

```
bulk-email-portal/
├── index.html          # Main Single Page Application Entry Point
├── css/
│   └── style.css       # Enterprise Glassmorphism CSS Design System
├── js/
│   ├── state.js        # AppState & LocalStorage Persistence Engine
│   ├── ai-optimizer.js # Gemini AI Email Optimizer Bot Engine
│   ├── spam-auditor.js # Spam Deliverability Inspector Engine
│   ├── sender.js       # Sender Account & SMTP Setup Controller
│   ├── leads.js        # Target Companies & File Attachment Manager
│   ├── composer-ui.js  # Email Composer & AI UI Controller
│   ├── spam-auditor-ui.js # Deliverability UI & 1-Click Auto-Fix
│   ├── dispatcher.js   # Bulk Email Staggered Dispatcher & Live Logs
│   ├── owner-panel.js  # Owner Master Oversight Panel
│   └── app.js          # Main Application Router & Toast Engine
└── README.md           # Project Documentation
```

---

## 🚀 How to Run Locally

Since this is a client-side Web Application built with modern HTML5, CSS3, ES Modules, and CDN integrations (Chart.js, Lucide Icons), it requires **zero build steps** or server installation.

Simply open `index.html` in any web browser!

---

## 📄 License

MIT License - feel free to use and customize for your outreach campaigns!
