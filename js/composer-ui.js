/* ==========================================================================
   EMAIL COMPOSER & AI BOT UI CONTROLLER
   ========================================================================== */

class ComposerController {
  init() {
    this.populateComposer();
    this.bindEvents();
    this.updateAiStateUI();
  }

  populateComposer() {
    const template = window.appState.template;
    const inputSubject = document.getElementById('composerSubject');
    const inputBody = document.getElementById('composerBody');
    const toggleAi = document.getElementById('toggleAiOptimizer');
    const toneSelect = document.getElementById('aiToneSelect');

    if (inputSubject) inputSubject.value = template.subject || '';
    if (inputBody) inputBody.value = template.body || '';
    if (toggleAi) toggleAi.checked = window.appState.aiConfig.enabled;
    if (toneSelect) toneSelect.value = window.appState.aiConfig.tone || 'Consultative';
  }

  updateAiStateUI() {
    const isEnabled = window.appState.aiConfig.enabled;
    const statusBadge = document.getElementById('aiStatusBadge');
    const aiToneGroup = document.getElementById('aiToneGroup');
    const aiPreviewBtn = document.getElementById('btnPreviewAi');

    if (statusBadge) {
      if (isEnabled) {
        statusBadge.className = 'badge badge-purple';
        statusBadge.innerHTML = `<i data-lucide="sparkles" style="width:12px;height:12px;"></i> AI Bot Active (Industry Rewriting ON)`;
      } else {
        statusBadge.className = 'badge badge-info';
        statusBadge.innerHTML = `<i data-lucide="power" style="width:12px;height:12px;"></i> AI Bot Off (Standard Copy Mode)`;
      }
    }

    if (aiToneGroup) {
      aiToneGroup.style.display = isEnabled ? 'block' : 'none';
    }

    if (aiPreviewBtn) {
      aiPreviewBtn.style.display = isEnabled ? 'inline-flex' : 'none';
    }

    if (window.lucide) window.lucide.createIcons();
  }

  insertToken(token) {
    const textarea = document.getElementById('composerBody');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    textarea.value = text.substring(0, start) + token + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + token.length;
    textarea.focus();

    this.onComposerChange();
  }

  onComposerChange() {
    const subject = document.getElementById('composerSubject').value;
    const body = document.getElementById('composerBody').value;

    window.appState.updateTemplate({ subject, body });

    if (window.spamAuditorController) {
      window.spamAuditorController.updateAudit();
    }
  }

  openAiPreviewModal() {
    const companies = window.appState.companies;
    if (companies.length === 0) {
      alert('Please attach at least one target company to preview AI Optimization.');
      return;
    }

    const sampleCompany = companies[0];
    const template = window.appState.template;
    const sender = window.appState.sender;
    const tone = window.appState.aiConfig.tone;

    const comparison = window.aiOptimizerBot.generatePreviewComparison(sampleCompany, template, sender, tone);

    const modal = document.getElementById('aiPreviewModal');
    const targetCompName = document.getElementById('aiPreviewCompName');
    const originalSub = document.getElementById('previewOriginalSubject');
    const originalBody = document.getElementById('previewOriginalBody');
    const aiSub = document.getElementById('previewAiSubject');
    const aiBody = document.getElementById('previewAiBody');

    if (modal) {
      if (targetCompName) targetCompName.textContent = `${sampleCompany.name} (${sampleCompany.industry})`;
      if (originalSub) originalSub.textContent = comparison.original.subject;
      if (originalBody) originalBody.textContent = comparison.original.body;
      if (aiSub) aiSub.textContent = comparison.aiOptimized.subject;
      if (aiBody) aiBody.textContent = comparison.aiOptimized.body;

      modal.classList.add('active');
    }
  }

  closeAiPreviewModal() {
    const modal = document.getElementById('aiPreviewModal');
    if (modal) modal.classList.remove('active');
  }

  bindEvents() {
    const inputSubject = document.getElementById('composerSubject');
    const inputBody = document.getElementById('composerBody');
    const toggleAi = document.getElementById('toggleAiOptimizer');
    const toneSelect = document.getElementById('aiToneSelect');

    if (inputSubject) inputSubject.addEventListener('input', () => this.onComposerChange());
    if (inputBody) inputBody.addEventListener('input', () => this.onComposerChange());

    if (toggleAi) {
      toggleAi.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        window.appState.updateAiConfig({ enabled });
        this.updateAiStateUI();
        if (window.showToast) {
          window.showToast(enabled ? 'AI Email Optimizer Bot Enabled' : 'AI Bot Disabled - Standard Mode Active', enabled ? 'purple' : 'info');
        }
      });
    }

    if (toneSelect) {
      toneSelect.addEventListener('change', (e) => {
        window.appState.updateAiConfig({ tone: e.target.value });
        if (window.showToast) window.showToast(`AI Tone updated to ${e.target.value}`, 'purple');
      });
    }

    // Token insertion buttons
    const tokenBtns = document.querySelectorAll('.btn-token');
    tokenBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const token = btn.getAttribute('data-token');
        if (token) this.insertToken(token);
      });
    });

    const btnPreviewAi = document.getElementById('btnPreviewAi');
    if (btnPreviewAi) btnPreviewAi.addEventListener('click', () => this.openAiPreviewModal());
  }
}

window.composerController = new ComposerController();
