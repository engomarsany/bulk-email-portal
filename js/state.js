/* ==========================================================================
   STATE & DATA ENGINE - MOUNT2OCEAN BULK EMAIL PORTAL (20K DAILY CAPACITY)
   ========================================================================== */

const STORAGE_KEYS = {
  SENDER: 'bulk_portal_sender',
  COMPANIES: 'bulk_portal_companies',
  ATTACHMENTS: 'bulk_portal_attachments',
  TEMPLATE: 'bulk_portal_template',
  AI_CONFIG: 'bulk_portal_ai_config',
  SENT_LOGS: 'bulk_portal_sent_logs',
  OWNER_SETTINGS: 'bulk_portal_owner_settings'
};

// Official Mount2ocean Sender Identity
const DEFAULT_SENDER = {
  email: 'sales@mount2ocean.com',
  name: 'Ahsan | Sales Head',
  smtpHost: 'mail.mount2ocean.com',
  smtpPort: 587,
  appPassword: '',
  signature: 'Best regards,\nAhsan | Sales Head\nMount2ocean\nWebsite: https://mount2ocean.com | Tel: +880 1977-477172',
  isLoggedIn: true
};

// Production Target List
const DEFAULT_COMPANIES = [];

// Mount2ocean Official Outreach Email Template
const DEFAULT_TEMPLATE = {
  subject: 'Strategic Growth & Business Collaboration with Mount2ocean for {{company_name}}',
  body: `Hi {{contact_person}},

I am reaching out from Mount2ocean regarding potential business collaboration and growth opportunities for {{company_name}} in the {{industry}} sector.

At Mount2ocean, we specialize in delivering tailored enterprise solutions that help organizations optimize operational throughput and scale revenue efficiently.

Given your leadership at {{company_name}}, I have attached our latest company profile and service deck for your review.

Would you be open for a brief 10-minute introductory call next week?

Best regards,
{{sender_name}}

---
If you prefer not to receive future updates, you can [Unsubscribe Here] anytime.`,
  attachments: []
};

const DEFAULT_AI_CONFIG = {
  enabled: true,
  tone: 'Consultative',
  creativity: 'High',
  autoPersonalize: true
};

const DEFAULT_SENT_LOGS = [];

// Owner System Settings Configured for 20,000 Emails/Day High Capacity
const DEFAULT_OWNER_SETTINGS = {
  maxDailyEmails: 20000, // 20,000 Emails Per Day Limit
  staggerDelaySeconds: 2,
  strictSpamThreshold: 85,
  requireUnsubscribeHeader: true,
  domainReputationStatus: 'Verified High Capacity (Mount2ocean)',
  spfStatus: 'Verified (v=spf1 include:mount2ocean.com ~all)',
  dkimStatus: 'Verified (Mount2ocean 2048-bit RSA)',
  dmarcStatus: 'Verified (p=reject; rua=mailto:dmarc@mount2ocean.com)'
};

class AppState {
  constructor() {
    this.sender = this.load(STORAGE_KEYS.SENDER, DEFAULT_SENDER);
    this.companies = this.load(STORAGE_KEYS.COMPANIES, DEFAULT_COMPANIES);
    this.template = this.load(STORAGE_KEYS.TEMPLATE, DEFAULT_TEMPLATE);
    this.aiConfig = this.load(STORAGE_KEYS.AI_CONFIG, DEFAULT_AI_CONFIG);
    this.sentLogs = this.load(STORAGE_KEYS.SENT_LOGS, DEFAULT_SENT_LOGS);
    this.ownerSettings = this.load(STORAGE_KEYS.OWNER_SETTINGS, DEFAULT_OWNER_SETTINGS);

    // Enforce 20,000 daily capacity limit
    if (this.ownerSettings.maxDailyEmails < 20000) {
      this.ownerSettings.maxDailyEmails = 20000;
      this.save(STORAGE_KEYS.OWNER_SETTINGS, this.ownerSettings);
    }
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Failed to parse localStorage key ${key}`, e);
      return fallback;
    }
  }

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save localStorage key ${key}`, e);
    }
  }

  updateSender(senderData) {
    this.sender = { ...this.sender, ...senderData };
    this.save(STORAGE_KEYS.SENDER, this.sender);
  }

  addCompany(company) {
    company.id = Date.now();
    company.status = company.status || 'Pending';
    this.companies.push(company);
    this.save(STORAGE_KEYS.COMPANIES, this.companies);
  }

  removeCompany(id) {
    this.companies = this.companies.filter(c => c.id !== id);
    this.save(STORAGE_KEYS.COMPANIES, this.companies);
  }

  clearCompanies() {
    this.companies = [];
    this.save(STORAGE_KEYS.COMPANIES, this.companies);
  }

  updateTemplate(templateData) {
    this.template = { ...this.template, ...templateData };
    this.save(STORAGE_KEYS.TEMPLATE, this.template);
  }

  updateAiConfig(config) {
    this.aiConfig = { ...this.aiConfig, ...config };
    this.save(STORAGE_KEYS.AI_CONFIG, this.aiConfig);
  }

  addSentLog(logEntry) {
    this.sentLogs.unshift(logEntry);
    this.save(STORAGE_KEYS.SENT_LOGS, this.sentLogs);
  }

  updateOwnerSettings(settings) {
    this.ownerSettings = { ...this.ownerSettings, ...settings };
    this.save(STORAGE_KEYS.OWNER_SETTINGS, this.ownerSettings);
  }
}

window.appState = new AppState();
