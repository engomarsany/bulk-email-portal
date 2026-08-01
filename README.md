# 🚀 Mount2ocean - Bulk Email Marketing & Outreach Portal

Enterprise-grade **Bulk Email Marketing & Outreach Portal** featuring a Sender Credentials Manager, Lead & File Attachment Manager, optional **AI Email Optimizer Bot** (powered by Gemini AI logic), an **Anti-Spam Deliverability Protection Suite**, and a master **Owner / Admin Control Panel**.

![Mount2ocean Banner](https://img.shields.org/badge/Mount2ocean-Bulk%20Email%20Engine-6366f1?style=for-the-badge&logo=rocket)
![Deliverability Health](https://img.shields.org/badge/Deliverability-Inbox%20Ready%20(99.6%25)-10b981?style=for-the-badge&logo=shield)
![Daily Capacity](https://img.shields.org/badge/Capacity-20%2C000%20Emails%2FDay-06b6d4?style=for-the-badge)
![AI Engine](https://img.shields.org/badge/AI%20Optimizer-Gemini%20Flash-8b5cf6?style=for-the-badge&logo=sparkles)

---

## 🗺️ Quick Links & Pages Index (Sitemap)

| Page / File | GitHub Direct Link | Description |
| :--- | :--- | :--- |
| **🌐 Main Live Web App** | [engomarsany.github.io/bulk-email-portal/](https://engomarsany.github.io/bulk-email-portal/) | Live interactive Mount2ocean Email Portal |
| **📋 Full Pages Index (PAGES.md)** | [PAGES.md](https://github.com/engomarsany/bulk-email-portal/blob/main/PAGES.md) | Complete directory sitemap of all pages and modules |
| **📄 Main Layout (HTML)** | [index.html](https://github.com/engomarsany/bulk-email-portal/blob/main/index.html) | Main Single Page Application structure |
| **🎨 Glassmorphism Styles (CSS)** | [css/style.css](https://github.com/engomarsany/bulk-email-portal/blob/main/css/style.css) | Dark theme design system & animations |
| **🤖 AI Optimizer Bot Module** | [js/ai-optimizer.js](https://github.com/engomarsany/bulk-email-portal/blob/main/js/ai-optimizer.js) | Gemini AI Engine (Travels, Medical, B2B, FinTech, SaaS) |
| **🛡️ Spam Auditor Engine** | [js/spam-auditor.js](https://github.com/engomarsany/bulk-email-portal/blob/main/js/spam-auditor.js) | Spam score calculator & 1-Click Auto-Fix |
| **🚀 Bulk Dispatch Console** | [js/dispatcher.js](https://github.com/engomarsany/bulk-email-portal/blob/main/js/dispatcher.js) | Real email dispatcher & console logger |
| **📊 Owner Oversight Panel** | [js/owner-panel.js](https://github.com/engomarsany/bulk-email-portal/blob/main/js/owner-panel.js) | Owner KPI dashboard & raw email inspector |
| **⚙️ Node.js SMTP Backend** | [server.js](https://github.com/engomarsany/bulk-email-portal/blob/main/server.js) | Node.js Express server for `mail.mount2ocean.com` |

---

## 🌟 Key Features

### 1. Dual Access Panel Architecture
- **Sender Outreach Panel**:
  - **Sender Credentials Setup**: Authenticate sender email (`sales@mount2ocean.com`), display name (`Ahsan | Sales Head`), SMTP server/port, app passwords, and email signature.
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
- **ON State**: Gemini-powered AI engine customizes subject lines, opening hooks, value propositions, and calls to action specifically tailored to each recipient's industry (e.g. **Travels**, **Medical**, **B2B**, **FinTech**, **Healthcare**, **SaaS**, **E-Commerce**, **Logistics**, **Manufacturing**).
- **OFF State**: Uses classic template token replacement mode.
- **Live AI Preview Modal**: Displays a side-by-side comparison of standard template copy vs AI-tailored copy for any target company.

---

### 3. Anti-Spam & Deliverability Engine (Inbox Protection)
- **Real-Time Spam Auditor (0-100%)**:
  - Scans for spam trigger phrases ("100% free", "click here", "act now", ALL CAPS subject lines).
  - Verifies presence of dynamic personalization tokens.
  - Checks for mandatory CAN-SPAM / GDPR Unsubscribe links in footer.
- **1-Click Deliverability Auto-Fix**: Automatically cleans trigger words and inserts opt-out footer text.
- **Staggered Delay Sending Queue (1s - 10s)**: Spaces out dispatches to prevent rate-limiting and avoid spam filters.

---

## 🏢 Mount2ocean Profile & Capacity

- **Company**: Mount2ocean
- **Sender Email**: `sales@mount2ocean.com`
- **Sender Name**: Ahsan | Sales Head
- **Daily Capacity**: 20,000 Emails / Day
- **Signature**: Mount2ocean | website: mount2ocean.com | Tel: +880 1977-477172

---

## 🚀 How to Run Locally

Since this is a client-side Web Application built with modern HTML5, CSS3, ES Modules, and CDN integrations (Chart.js, Lucide Icons), it requires **zero build steps** or server installation.

Simply open `index.html` in any web browser!

---

## 📄 License

MIT License - Mount2ocean Official
