/* ==========================================================================
   SPAM AUDITOR UI CONTROLLER
   ========================================================================== */

class SpamAuditorUIController {
  init() {
    this.updateAudit();
    this.bindEvents();
  }

  updateAudit() {
    const template = window.appState.template;
    const attachments = template.attachments || [];
    const report = window.spamAuditor.auditEmail(template.subject, template.body, attachments);

    // Update UI elements
    const scoreVal = document.getElementById('spamScoreVal');
    const scoreBadge = document.getElementById('spamStatusBadge');
    const meterInner = document.getElementById('spamMeterBarInner');
    const warningsList = document.getElementById('spamWarningsList');
    const passesList = document.getElementById('spamPassesList');
    const autoFixBtn = document.getElementById('btnSpamAutoFix');

    if (scoreVal) scoreVal.textContent = `${report.score}/100`;

    if (scoreBadge) {
      scoreBadge.className = `badge ${report.statusClass}`;
      scoreBadge.textContent = report.statusText;
    }

    if (meterInner) {
      meterInner.style.width = `${report.score}%`;
      if (report.score >= 88) {
        meterInner.style.background = 'linear-gradient(90deg, #10b981, #059669)';
      } else if (report.score >= 70) {
        meterInner.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
      } else {
        meterInner.style.background = 'linear-gradient(90deg, #f43f5e, #e11d48)';
      }
    }

    if (warningsList) {
      if (report.warnings.length === 0) {
        warningsList.innerHTML = `<div style="font-size:0.8rem; color:var(--text-subtle); font-style:italic;">No deliverability warnings detected.</div>`;
      } else {
        warningsList.innerHTML = report.warnings.map(w => `
          <div class="check-item warn">
            <i data-lucide="alert-triangle" style="width:14px;height:14px;flex-shrink:0;"></i>
            <span>${w.text}</span>
          </div>
        `).join('');
      }
    }

    if (passesList) {
      passesList.innerHTML = report.passes.map(p => `
        <div class="check-item pass">
          <i data-lucide="check-circle-2" style="width:14px;height:14px;flex-shrink:0;"></i>
          <span>${p}</span>
        </div>
      `).join('');
    }

    if (autoFixBtn) {
      autoFixBtn.style.display = report.warnings.length > 0 ? 'inline-flex' : 'none';
    }

    if (window.lucide) window.lucide.createIcons();
  }

  handleAutoFix() {
    const template = window.appState.template;
    const fixed = window.spamAuditor.autoFixEmail(template.subject, template.body);

    window.appState.updateTemplate({
      subject: fixed.fixedSubject,
      body: fixed.fixedBody
    });

    if (window.composerController) {
      window.composerController.populateComposer();
    }

    this.updateAudit();

    if (window.showToast) {
      window.showToast('1-Click Auto-Fix applied! Cleaned trigger words & added opt-out footer.', 'success');
    }
  }

  bindEvents() {
    const autoFixBtn = document.getElementById('btnSpamAutoFix');
    if (autoFixBtn) {
      autoFixBtn.addEventListener('click', () => this.handleAutoFix());
    }
  }
}

window.spamAuditorController = new SpamAuditorUIController();
