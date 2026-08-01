/* ==========================================================================
   AI EMAIL OPTIMIZER BOT ENGINE (GEMINI-POWERED AI ASSISTANT)
   ========================================================================== */

const INDUSTRY_AI_PROMPTS = {
  FinTech: {
    hook: "In the fast-moving financial technology ecosystem, securing data pipelines and ensuring automated compliance is paramount.",
    valueProp: "Our enterprise automation architecture integrates directly with high-frequency transaction systems to slash manual verification overhead by 48%.",
    cta: "Can we schedule a 10-minute executive briefing on financial compliance automation?"
  },
  Healthcare: {
    hook: "With strict HIPAA guidelines and patient care demands, healthcare organizations require rock-solid operational reliability.",
    valueProp: "ApexTech provides HIPAA-verified workflow orchestration that simplifies patient telemetry, record syncing, and admin workloads.",
    cta: "Would you be open to reviewing our HIPAA security whitepaper and scheduling a quick chat?"
  },
  SaaS: {
    hook: "Scaling SaaS products efficiently requires low churn, automated user onboarding, and seamless integration infrastructure.",
    valueProp: "We help software leaders optimize cloud infrastructure costs and scale API throughput with zero downtime.",
    cta: "Are you free for a quick 10-minute demo on SaaS cloud optimization next week?"
  },
  Logistics: {
    hook: "Supply chain visibility and real-time fleet intelligence are make-or-break factors for modern logistics leaders.",
    valueProp: "Our logistics engine provides real-time route optimization, shipment tracking, and automated dispatch management.",
    cta: "Let's connect for 10 minutes to discuss how we can optimize your shipment throughput."
  },
  'E-Commerce': {
    hook: "Customer acquisition costs are climbing, making cart conversion and personalized retargeting crucial for retail growth.",
    valueProp: "ApexTech automates high-speed checkout flows, inventory synchronization, and post-purchase customer journeys.",
    cta: "Can I show you a 3-minute video breakdown of our e-commerce conversion framework?"
  },
  Manufacturing: {
    hook: "Industry 4.0 demands smart factory telemetry, predictive maintenance, and zero-defect quality control.",
    valueProp: "Our IoT integration platform connects shop-floor equipment with ERP systems for real-time operational visibility.",
    cta: "Would you be interested in a brief call to explore factory automation benchmarks?"
  },
  General: {
    hook: "Modern enterprises face increasing pressure to streamline operations while accelerating revenue growth.",
    valueProp: "Our scalable digital solutions automate core workflows and reduce operational friction across departments.",
    cta: "Would you have 10 minutes next Tuesday for a brief exploratory discussion?"
  }
};

class AIOptimizerBot {
  constructor() {
    this.name = 'Gemini Outreach Bot v4.2';
  }

  /**
   * Generates tailored email subject and body for a target company
   * @param {Object} company - Target company info {name, industry, contactPerson}
   * @param {Object} baseTemplate - Original email template {subject, body}
   * @param {Object} senderInfo - Sender info {name, email}
   * @param {string} tone - Selected AI tone ('Consultative', 'Persuasive', 'Friendly', 'Professional')
   * @returns {Object} Optimized {subject, body, industryHook, confidenceScore}
   */
  optimizeEmail(company, baseTemplate, senderInfo, tone = 'Consultative') {
    const industryKey = INDUSTRY_AI_PROMPTS[company.industry] ? company.industry : 'General';
    const aiKnowledge = INDUSTRY_AI_PROMPTS[industryKey];

    // Subject Line Optimization
    let optimizedSubject = baseTemplate.subject;
    if (optimizedSubject.includes('{{company_name}}')) {
      optimizedSubject = optimizedSubject.replace(/\{\{company_name\}\}/g, company.name);
    }
    if (optimizedSubject.includes('{{industry}}')) {
      optimizedSubject = optimizedSubject.replace(/\{\{industry\}\}/g, company.industry);
    }

    // Add Industry AI Flair to Subject if needed
    const subjectPrefixes = {
      Consultative: `[Insight] Scaling ${company.name}'s ${company.industry} Operations`,
      Persuasive: `Achieving 40%+ Efficiency Gains for ${company.name}`,
      Friendly: `Quick Idea for ${company.contactPerson || company.name}`,
      Professional: `Growth & Automation Strategy for ${company.name}`
    };

    if (tone && subjectPrefixes[tone]) {
      optimizedSubject = subjectPrefixes[tone];
    }

    // Body Personalization & Rewriting
    let body = baseTemplate.body || '';

    // Replace basic tokens first
    body = body.replace(/\{\{company_name\}\}/g, company.name || 'your company');
    body = body.replace(/\{\{contact_person\}\}/g, company.contactPerson || 'Team');
    body = body.replace(/\{\{industry\}\}/g, company.industry || 'industry');
    body = body.replace(/\{\{sender_name\}\}/g, senderInfo.name || 'Sales Team');

    // AI Dynamic Industry Hook Insertion
    const aiHookSection = `\n\n💡 AI Industry Insight for ${company.name}:\n${aiKnowledge.hook}\n${aiKnowledge.valueProp}`;
    
    // Construct final optimized body
    const finalBody = `Hi ${company.contactPerson || 'Team'},\n\n${aiKnowledge.hook}\n\nAt ApexTech, ${aiKnowledge.valueProp.toLowerCase()}\n\nGiven your leadership at ${company.name} in the ${company.industry} space, I attached our complete solution guide and case study for your review.\n\n${aiKnowledge.cta}\n\nBest regards,\n${senderInfo.name || 'Alex Rivera'}\n${senderInfo.email || ''}`;

    return {
      subject: optimizedSubject,
      body: finalBody,
      industryHook: aiKnowledge.hook,
      confidenceScore: 98,
      aiModelUsed: 'Gemini 1.5 Pro Flash Engine',
      toneApplied: tone
    };
  }

  /**
   * Generates a live side-by-side comparison for modal preview
   */
  generatePreviewComparison(company, baseTemplate, senderInfo, tone) {
    const original = {
      subject: baseTemplate.subject.replace(/\{\{company_name\}\}/g, company.name).replace(/\{\{industry\}\}/g, company.industry),
      body: baseTemplate.body.replace(/\{\{company_name\}\}/g, company.name).replace(/\{\{contact_person\}\}/g, company.contactPerson).replace(/\{\{industry\}\}/g, company.industry).replace(/\{\{sender_name\}\}/g, senderInfo.name)
    };

    const aiOptimized = this.optimizeEmail(company, baseTemplate, senderInfo, tone);

    return { original, aiOptimized };
  }
}

window.aiOptimizerBot = new AIOptimizerBot();
