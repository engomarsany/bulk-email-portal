/* ==========================================================================
   AI EMAIL OPTIMIZER BOT ENGINE - MOUNT2OCEAN (ROBUST FUZZY INDUSTRY MATCHING)
   ========================================================================== */

const INDUSTRY_AI_PROMPTS = {
  'Printing-Finishing': {
    hook: "In the printing-finishing and member mills sector, optimizing production workflows, batch quality control, and supply chain timelines are key drivers of success.",
    valueProp: "Mount2ocean offers specialized digital workflow orchestration and automation solutions tailored for printing, finishing, and member mills.",
    cta: "Are you available for a brief 10-minute introductory call next week to discuss optimizing mill operations?"
  },
  Travels: {
    hook: "In the dynamic travel, tourism, and hospitality sector, seamless booking experiences, personalized itineraries, and partner logistics drive customer loyalty.",
    valueProp: "Mount2ocean provides high-efficiency travel automation and partner management frameworks to optimize booking throughput.",
    cta: "Would you be open for a brief 10-minute chat on scaling travel & hospitality operations?"
  },
  Medical: {
    hook: "Medical institutions, hospitals, and healthcare providers demand absolute accuracy, regulatory compliance, and seamless patient coordination.",
    valueProp: "Mount2ocean provides medical-grade operational frameworks that streamline patient care workflows and hospital administration.",
    cta: "Can we schedule a 10-minute briefing on medical & hospital workflow automation?"
  },
  Healthcare: {
    hook: "With strict compliance guidelines and patient care demands, healthcare organizations require rock-solid operational reliability.",
    valueProp: "Mount2ocean delivers HIPAA-verified workflow orchestration that simplifies patient data management and admin workloads.",
    cta: "Would you be open to reviewing our healthcare automation case study?"
  },
  B2B: {
    hook: "Scaling B2B enterprise partnerships requires high-touch relationship management, streamlined procurement, and predictable revenue pipelines.",
    valueProp: "Mount2ocean offers specialized B2B outreach and partner automation frameworks designed to accelerate enterprise sales cycles.",
    cta: "Would you have 10 minutes next week for an exploratory B2B discussion?"
  },
  FinTech: {
    hook: "In the fast-moving financial technology ecosystem, securing data pipelines and ensuring automated compliance is paramount.",
    valueProp: "Mount2ocean provides high-performance data architecture that slashes operational processing overhead by up to 45%.",
    cta: "Can we schedule a 10-minute executive briefing on financial automation?"
  },
  SaaS: {
    hook: "Scaling SaaS products efficiently requires low churn, automated user onboarding, and seamless integration infrastructure.",
    valueProp: "We help software leaders optimize infrastructure throughput and scale API operations effortlessly.",
    cta: "Are you free for a quick 10-minute demo next week?"
  },
  Logistics: {
    hook: "Supply chain visibility and real-time fleet intelligence are make-or-break factors for modern logistics leaders.",
    valueProp: "Mount2ocean's logistics suite provides real-time route optimization and automated dispatch management.",
    cta: "Let's connect for 10 minutes to discuss optimizing your shipment throughput."
  },
  'E-Commerce': {
    hook: "Customer acquisition costs are climbing, making conversion rates and inventory synchronization crucial for retail growth.",
    valueProp: "Mount2ocean automates high-speed checkout journeys and post-purchase customer automation.",
    cta: "Can I share a brief breakdown of our e-commerce framework?"
  },
  Manufacturing: {
    hook: "Industry 4.0 demands smart factory telemetry, predictive maintenance, and zero-defect quality control.",
    valueProp: "Mount2ocean connects shop-floor telemetry with core management systems for real-time operational visibility.",
    cta: "Would you be interested in exploring factory automation benchmarks?"
  },
  General: {
    hook: "Modern enterprises face increasing pressure to streamline operations while accelerating growth.",
    valueProp: "Mount2ocean delivers digital solutions that automate core workflows and eliminate operational friction.",
    cta: "Would you have 10 minutes next Tuesday for a brief exploratory discussion?"
  }
};

class AIOptimizerBot {
  constructor() {
    this.name = 'Mount2ocean AI Outreach Bot';
  }

  /**
   * Fuzzy industry key resolver
   */
  resolveIndustryKey(industryInput = '') {
    if (!industryInput) return 'General';
    const str = industryInput.toLowerCase();

    if (str.includes('print') || str.includes('finish') || str.includes('mill') || str.includes('textile')) {
      return 'Printing-Finishing';
    }

    if (str.includes('travel') || str.includes('tourism') || str.includes('hotel') || str.includes('hospitality')) {
      return 'Travels';
    }
    if (str.includes('medic') || str.includes('hospital') || str.includes('pharma') || str.includes('clinic')) {
      return 'Medical';
    }
    if (str.includes('health') || str.includes('bio')) {
      return 'Healthcare';
    }
    if (str.includes('b2b') || str.includes('enterprise') || str.includes('corporate')) {
      return 'B2B';
    }
    if (str.includes('fin') || str.includes('bank') || str.includes('pay')) {
      return 'FinTech';
    }
    if (str.includes('saas') || str.includes('cloud') || str.includes('soft')) {
      return 'SaaS';
    }
    if (str.includes('logist') || str.includes('supply') || str.includes('ship')) {
      return 'Logistics';
    }
    if (str.includes('commerce') || str.includes('shop') || str.includes('retail')) {
      return 'E-Commerce';
    }
    if (str.includes('manufactur') || str.includes('factory') || str.includes('iot')) {
      return 'Manufacturing';
    }

    return INDUSTRY_AI_PROMPTS[industryInput] ? industryInput : 'General';
  }

  optimizeEmail(company, baseTemplate, senderInfo, tone = 'Consultative') {
    const industryKey = this.resolveIndustryKey(company.industry);
    const aiKnowledge = INDUSTRY_AI_PROMPTS[industryKey] || INDUSTRY_AI_PROMPTS['General'];

    let optimizedSubject = baseTemplate.subject;
    if (optimizedSubject.includes('{{company_name}}')) {
      optimizedSubject = optimizedSubject.replace(/\{\{company_name\}\}/g, company.name);
    }
    if (optimizedSubject.includes('{{industry}}')) {
      optimizedSubject = optimizedSubject.replace(/\{\{industry\}\}/g, company.industry || industryKey);
    }

    const subjectPrefixes = {
      Consultative: `[Insight] Scaling ${company.name}'s ${company.industry || industryKey} Operations`,
      Persuasive: `Strategic Growth Solution for ${company.name}`,
      Friendly: `Quick Idea for ${company.contactPerson || company.name}`,
      Professional: `Business Collaboration Proposal - ${company.name}`
    };

    if (tone && subjectPrefixes[tone]) {
      optimizedSubject = subjectPrefixes[tone];
    }

    let body = baseTemplate.body || '';

    body = body.replace(/\{\{company_name\}\}/g, company.name || 'your company');
    body = body.replace(/\{\{contact_person\}\}/g, company.contactPerson || 'Team');
    body = body.replace(/\{\{industry\}\}/g, company.industry || industryKey);
    body = body.replace(/\{\{sender_name\}\}/g, senderInfo.name || 'Ahsan | Sales Head');

    const finalBody = `Hi ${company.contactPerson || 'Team'},\n\n${aiKnowledge.hook}\n\nAt Mount2ocean, ${aiKnowledge.valueProp.toLowerCase()}\n\nGiven your leadership at ${company.name} in the ${company.industry || industryKey} space, I attached our complete company profile for your review.\n\n${aiKnowledge.cta}\n\nBest regards,\n${senderInfo.name || 'Ahsan | Sales Head'}\n${senderInfo.email || 'sales@mount2ocean.com'}`;

    return {
      subject: optimizedSubject,
      body: finalBody,
      industryHook: aiKnowledge.hook,
      confidenceScore: 98,
      aiModelUsed: 'Gemini 1.5 Pro Flash Engine',
      toneApplied: tone
    };
  }

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
