/* ==========================================================================
   SPAM AUDITOR & DELIVERABILITY ENGINE - BULK EMAIL PORTAL
   ========================================================================== */

const SPAM_TRIGGER_WORDS = [
  '100% free', 'free money', 'click here', 'act now', 'buy now', 'earn $', 
  'cash bonus', 'risk-free', 'no cost', 'guaranteed income', 'winner', 
  'congratulations', 'urgent action', 'instant cash', 'double your', 
  'special promotion', 'limited time offer', 'cheap', 'unbelievable deal'
];

class SpamAuditor {
  constructor() {
    this.name = 'Deliverability Protection Engine v3.0';
  }

  /**
   * Evaluates an email template and subject for spam risks
   * @param {string} subject - Email subject line
   * @param {string} body - Email body content
   * @param {Array} attachments - Attached files list
   * @returns {Object} Audit report with score, status, warnings, and fixes
   */
  auditEmail(subject = '', body = '', attachments = []) {
    let score = 100;
    const warnings = [];
    const passes = [];

    const lowerSubject = subject.toLowerCase();
    const lowerBody = body.toLowerCase();

    // 1. Check Spam Trigger Words
    const detectedTriggers = [];
    SPAM_TRIGGER_WORDS.forEach(word => {
      if (lowerSubject.includes(word) || lowerBody.includes(word)) {
        detectedTriggers.push(word);
        score -= 15;
      }
    });

    if (detectedTriggers.length > 0) {
      warnings.push({
        id: 'SPAM_WORDS',
        text: `Detected spam trigger phrases: "${detectedTriggers.join(', ')}" (-${detectedTriggers.length * 15} pts)`
      });
    } else {
      passes.push('Clean language: Zero high-risk spam trigger words detected');
    }

    // 2. Check ALL CAPS Subject or Body
    const uppercaseWordsInSubject = subject.split(' ').filter(w => w.length > 3 && w === w.toUpperCase() && /[A-Z]/.test(w));
    if (uppercaseWordsInSubject.length > 1) {
      score -= 12;
      warnings.push({
        id: 'ALL_CAPS',
        text: `Excessive uppercase words in subject line (${uppercaseWordsInSubject.join(', ')}) (-12 pts)`
      });
    } else {
      passes.push('Subject casing: Natural case formatting used');
    }

    // 3. Exclamation Marks
    if ((subject.match(/!/g) || []).length > 1) {
      score -= 10;
      warnings.push({
        id: 'EXCLAMATIONS',
        text: 'Multiple exclamation marks in subject line trigger spam filters (-10 pts)'
      });
    }

    // 4. Personalization Tokens Check
    const hasPersonalization = body.includes('{{company_name}}') || body.includes('{{contact_person}}') || body.includes('{{industry}}');
    if (!hasPersonalization) {
      score -= 20;
      warnings.push({
        id: 'NO_TOKENS',
        text: 'Missing dynamic tags (e.g. {{company_name}}). Identical bulk emails are flagged as spam (-20 pts)'
      });
    } else {
      passes.push('Dynamic Personalization: Tokens active to ensure unique email generation per recipient');
    }

    // 5. Unsubscribe Link Check
    const hasUnsubscribe = lowerBody.includes('unsubscribe') || lowerBody.includes('opt-out') || lowerBody.includes('opt out');
    if (!hasUnsubscribe) {
      score -= 15;
      warnings.push({
        id: 'NO_UNSUB',
        text: 'Missing mandatory CAN-SPAM / GDPR Unsubscribe link in footer (-15 pts)'
      });
    } else {
      passes.push('Opt-Out Compliance: Unsubscribe link included in email footer');
    }

    // 6. Attachment Size Safety
    if (attachments.length > 3) {
      score -= 10;
      warnings.push({
        id: 'TOO_MANY_ATTACHMENTS',
        text: 'More than 3 attachments may trigger mail server spam filters (-10 pts)'
      });
    } else {
      passes.push('Attachment Safety: Optimal file count for inbox delivery');
    }

    // Clamp score 0 - 100
    score = Math.max(0, Math.min(100, score));

    // Health Category & Color
    let statusCategory = 'INBOX_READY';
    let statusText = 'Excellent (Inbox Ready)';
    let statusClass = 'badge-success';

    if (score < 70) {
      statusCategory = 'SPAM_RISK';
      statusText = 'High Spam Risk';
      statusClass = 'badge-danger';
    } else if (score < 88) {
      statusCategory = 'NEEDS_IMPROVEMENT';
      statusText = 'Moderate Risk';
      statusClass = 'badge-warning';
    }

    return {
      score,
      statusCategory,
      statusText,
      statusClass,
      warnings,
      passes,
      detectedTriggers
    };
  }

  /**
   * Automatically cleans subject and body to maximize deliverability
   */
  autoFixEmail(subject, body) {
    let fixedSubject = subject;
    let fixedBody = body;

    // Clean trigger words
    SPAM_TRIGGER_WORDS.forEach(word => {
      const reg = new RegExp(word, 'gi');
      if (word.includes('free')) {
        fixedSubject = fixedSubject.replace(reg, 'complimentary');
        fixedBody = fixedBody.replace(reg, 'complimentary');
      } else if (word.includes('click here')) {
        fixedSubject = fixedSubject.replace(reg, 'view solution');
        fixedBody = fixedBody.replace(reg, 'view solution');
      } else if (word.includes('act now') || word.includes('buy now')) {
        fixedSubject = fixedSubject.replace(reg, 'schedule a review');
        fixedBody = fixedBody.replace(reg, 'schedule a review');
      }
    });

    // Remove excessive exclamation marks
    fixedSubject = fixedSubject.replace(/!{2,}/g, '!');

    // Add Unsubscribe if missing
    if (!fixedBody.toLowerCase().includes('unsubscribe')) {
      fixedBody += `\n\n---\nIf you prefer not to receive future updates, you can [Unsubscribe Here] anytime.`;
    }

    return {
      fixedSubject,
      fixedBody
    };
  }
}

window.spamAuditor = new SpamAuditor();
