/* ==========================================================================
   STATE & DATA ENGINE - BULK EMAIL PORTAL
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

// Initial Sample Data for Quick Test & Out-of-Box Functionality
const DEFAULT_SENDER = {
  email: 'alex.marketing@apextech.com',
  name: 'Alex Rivera (Growth Lead)',
  smtpHost: 'smtp.apextech.com',
  smtpPort: 587,
  appPassword: '••••••••••••••••',
  signature: 'Best regards,\nAlex Rivera | Head of Business Outreach\nApexTech Solutions Inc.\nWeb: https://apextech.com | Tel: +1 (800) 555-0199',
  isLoggedIn: true
};

const DEFAULT_COMPANIES = [
  { id: 1, name: 'Nexus Financial Systems', industry: 'FinTech', contactEmail: 'contact@nexusfin.com', contactPerson: 'Sarah Jenkins', status: 'Pending', website: 'https://nexusfin.com' },
  { id: 2, name: 'CarePulse HealthTech', industry: 'Healthcare', contactEmail: 'info@carepulsehealth.org', contactPerson: 'Dr. Robert Miller', status: 'Pending', website: 'https://carepulsehealth.org' },
  { id: 3, name: 'Vortex Cloud Solutions', industry: 'SaaS', contactEmail: 'outreach@vortexcloud.io', contactPerson: 'Marcus Vance', status: 'Pending', website: 'https://vortexcloud.io' },
  { id: 4, name: 'OmniTrade Global Logistics', industry: 'Logistics', contactEmail: 'sales@omnitradeglobal.com', contactPerson: 'Elena Rostova', status: 'Pending', website: 'https://omnitradeglobal.com' },
  { id: 5, name: 'UrbanRetail E-Commerce', industry: 'E-Commerce', contactEmail: 'partnerships@urbanretail.shop', contactPerson: 'David Chen', status: 'Pending', website: 'https://urbanretail.shop' }
];

const DEFAULT_TEMPLATE = {
  subject: 'Unlocking 3x Growth Potential for {{company_name}} in 2026',
  body: `Hi {{contact_person}},

I noticed the incredible market position of {{company_name}} in the {{industry}} sector. 

Our team at ApexTech recently developed an AI-driven automation framework designed specifically to streamline operational workflows and lower acquisition costs by up to 42%.

Given your role at {{company_name}}, I thought this pitch deck and product brochure would be directly relevant to your quarterly growth initiatives.

Would you be open to a brief 10-minute discovery call next Tuesday?

Best regards,
{{sender_name}}

---
If you prefer not to receive future updates, you can [Unsubscribe Here] anytime.`,
  attachments: [
    { name: 'ApexTech_Enterprise_PitchDeck_2026.pdf', size: '2.4 MB' },
    { name: 'Product_Brochure_Features.pdf', size: '1.1 MB' }
  ]
};

const DEFAULT_AI_CONFIG = {
  enabled: true, // Default AI Bot switch state
  tone: 'Consultative',
  creativity: 'High',
  autoPersonalize: true
};

const DEFAULT_SENT_LOGS = [
  {
    id: 'LOG-9001',
    timestamp: '2026-08-01 10:15:22',
    senderEmail: 'alex.marketing@apextech.com',
    recipientCompany: 'Nexus Financial Systems',
    recipientEmail: 'contact@nexusfin.com',
    industry: 'FinTech',
    subject: 'AI Financial Compliance & Growth Engine for Nexus Financial Systems',
    status: 'Delivered',
    spamScore: '96% Clean (Inbox)',
    aiOptimized: true,
    attachments: ['ApexTech_Enterprise_PitchDeck_2026.pdf'],
    body: `Hi Sarah Jenkins,\n\nIn the fast-evolving FinTech space, compliance efficiency and real-time transaction processing are top priorities for leaders at Nexus Financial Systems.\n\nOur ApexTech suite automates financial data pipeline audits while scaling user onboarding...\n\nBest regards,\nAlex Rivera`
  },
  {
    id: 'LOG-9002',
    timestamp: '2026-08-01 11:30:05',
    senderEmail: 'alex.marketing@apextech.com',
    recipientCompany: 'CarePulse HealthTech',
    recipientEmail: 'info@carepulsehealth.org',
    industry: 'Healthcare',
    subject: 'HIPAA-Compliant Patient Data Automation for CarePulse HealthTech',
    status: 'Delivered',
    spamScore: '94% Clean (Inbox)',
    aiOptimized: true,
    attachments: ['ApexTech_Enterprise_PitchDeck_2026.pdf'],
    body: `Hi Dr. Robert Miller,\n\nHealthcare providers like CarePulse HealthTech require seamless, secure patient telemetry and data interoperability...\n\nBest regards,\nAlex Rivera`
  }
];

const DEFAULT_OWNER_SETTINGS = {
  maxDailyEmails: 2500,
  staggerDelaySeconds: 4,
  strictSpamThreshold: 85,
  requireUnsubscribeHeader: true,
  domainReputationStatus: 'Excellent (A+)',
  spfStatus: 'Verified (v=spf1 include:_spf.apextech.com ~all)',
  dkimStatus: 'Verified (2048-bit RSA active)',
  dmarcStatus: 'Verified (p=reject; rua=mailto:dmarc@apextech.com)'
};

// Global App State Wrapper
class AppState {
  constructor() {
    this.sender = this.load(STORAGE_KEYS.SENDER, DEFAULT_SENDER);
    this.companies = this.load(STORAGE_KEYS.COMPANIES, DEFAULT_COMPANIES);
    this.template = this.load(STORAGE_KEYS.TEMPLATE, DEFAULT_TEMPLATE);
    this.aiConfig = this.load(STORAGE_KEYS.AI_CONFIG, DEFAULT_AI_CONFIG);
    this.sentLogs = this.load(STORAGE_KEYS.SENT_LOGS, DEFAULT_SENT_LOGS);
    this.ownerSettings = this.load(STORAGE_KEYS.OWNER_SETTINGS, DEFAULT_OWNER_SETTINGS);
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
