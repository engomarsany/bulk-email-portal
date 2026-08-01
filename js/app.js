/* ==========================================================================
   MAIN APPLICATION CONTROLLER & ROUTER
   ========================================================================== */

class App {
  init() {
    console.log('🚀 Initializing Enterprise Bulk Email Portal...');

    // Initialize Sub-Controllers
    if (window.senderController) window.senderController.init();
    if (window.leadsController) window.leadsController.init();
    if (window.composerController) window.composerController.init();
    if (window.spamAuditorController) window.spamAuditorController.init();
    if (window.dispatcherController) window.dispatcherController.init();
    if (window.ownerPanelController) window.ownerPanelController.init();

    this.bindViewSwitcher();
    this.bindGlobalModals();

    if (window.lucide) window.lucide.createIcons();
  }

  bindViewSwitcher() {
    const btnSenderView = document.getElementById('btnSwitchSenderView');
    const btnOwnerView = document.getElementById('btnSwitchOwnerView');

    const panelSender = document.getElementById('senderPanelContainer');
    const panelOwner = document.getElementById('ownerPanelContainer');

    if (btnSenderView && btnOwnerView && panelSender && panelOwner) {
      btnSenderView.addEventListener('click', () => {
        btnSenderView.classList.add('active');
        btnOwnerView.classList.remove('active');
        panelSender.classList.add('active');
        panelOwner.classList.remove('active');
      });

      btnOwnerView.addEventListener('click', () => {
        btnOwnerView.classList.add('active');
        btnSenderView.classList.remove('active');
        panelOwner.classList.add('active');
        panelSender.classList.remove('active');

        // Re-render Owner Charts & Tables
        if (window.ownerPanelController) {
          window.ownerPanelController.renderAll();
        }
      });
    }
  }

  bindGlobalModals() {
    // Close modal handlers for overlay background & close buttons
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    const closeBtns = document.querySelectorAll('.close-modal-trigger');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });
  }
}

// Toast notification helper
window.showToast = function(message, type = 'info') {
  let toastContainer = document.getElementById('globalToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'globalToastContainer';
    toastContainer.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:2000; display:flex; flex-direction:column; gap:8px;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgMap = {
    success: 'linear-gradient(135deg, #10b981, #059669)',
    purple: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    info: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    danger: 'linear-gradient(135deg, #f43f5e, #e11d48)'
  };

  toast.style.cssText = `
    background: ${bgMap[type] || bgMap.info};
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    animation: toastIn 0.3s ease-out;
  `;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.app.init();
});
