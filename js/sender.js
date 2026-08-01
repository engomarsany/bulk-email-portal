/* ==========================================================================
   SENDER IDENTITY & SMTP SETUP CONTROLLER
   ========================================================================== */

class SenderController {
  init() {
    this.renderSenderPill();
    this.bindEvents();
  }

  renderSenderPill() {
    const pill = document.getElementById('senderPillInfo');
    if (!pill) return;

    const sender = window.appState.sender;
    if (sender && sender.email) {
      pill.innerHTML = `
        <span class="status-dot"></span>
        <span>${sender.name || sender.email}</span>
        <i data-lucide="settings" style="width: 14px; height: 14px; margin-left: 4px;"></i>
      `;
    } else {
      pill.innerHTML = `
        <span class="status-dot" style="background: var(--accent-rose);"></span>
        <span>Not Logged In (Setup Sender)</span>
      `;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  openLoginModal() {
    const modal = document.getElementById('senderLoginModal');
    const sender = window.appState.sender;

    if (modal) {
      document.getElementById('inputSenderEmail').value = sender.email || '';
      document.getElementById('inputSenderName').value = sender.name || '';
      document.getElementById('inputSmtpHost').value = sender.smtpHost || 'smtp.gmail.com';
      document.getElementById('inputSmtpPort').value = sender.smtpPort || 587;
      document.getElementById('inputAppPassword').value = sender.appPassword || '';
      document.getElementById('inputSenderSignature').value = sender.signature || '';

      modal.classList.add('active');
    }
  }

  closeLoginModal() {
    const modal = document.getElementById('senderLoginModal');
    if (modal) modal.classList.remove('active');
  }

  saveSenderCredentials(e) {
    if (e) e.preventDefault();

    const email = document.getElementById('inputSenderEmail').value.trim();
    const name = document.getElementById('inputSenderName').value.trim();
    const smtpHost = document.getElementById('inputSmtpHost').value.trim();
    const smtpPort = parseInt(document.getElementById('inputSmtpPort').value) || 587;
    const appPassword = document.getElementById('inputAppPassword').value.trim();
    const signature = document.getElementById('inputSenderSignature').value.trim();

    if (!email) {
      alert('Please enter a valid Sender Email Address.');
      return;
    }

    window.appState.updateSender({
      email,
      name,
      smtpHost,
      smtpPort,
      appPassword,
      signature,
      isLoggedIn: true
    });

    this.renderSenderPill();
    this.closeLoginModal();

    if (window.showToast) {
      window.showToast(`Logged in successfully as ${email}`, 'success');
    }
  }

  bindEvents() {
    const pill = document.getElementById('senderPillInfo');
    if (pill) {
      pill.addEventListener('click', () => this.openLoginModal());
    }

    const form = document.getElementById('senderLoginForm');
    if (form) {
      form.addEventListener('submit', (e) => this.saveSenderCredentials(e));
    }
  }
}

window.senderController = new SenderController();
