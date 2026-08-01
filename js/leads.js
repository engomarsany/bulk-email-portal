/* ==========================================================================
   TARGET COMPANY & FILE ATTACHMENTS MANAGER
   ========================================================================== */

class LeadsController {
  init() {
    this.renderCompanyTable();
    this.renderAttachmentsList();
    this.bindEvents();
  }

  renderCompanyTable() {
    const tableBody = document.getElementById('companyTableBody');
    const companyCountBadge = document.getElementById('targetCompanyCount');
    if (!tableBody) return;

    const companies = window.appState.companies;

    if (companyCountBadge) {
      companyCountBadge.textContent = `${companies.length} Companies Attached`;
    }

    if (companies.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">
            No target companies attached yet. Click "Add Company" or import a CSV list.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = companies.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td><span class="badge badge-purple">${c.industry || 'General'}</span></td>
        <td><code>${c.contactEmail}</code></td>
        <td>${c.contactPerson || 'N/A'}</td>
        <td><span class="badge ${c.status === 'Sent' ? 'badge-success' : 'badge-info'}">${c.status || 'Pending'}</span></td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="window.leadsController.deleteCompany(${c.id})" title="Remove Company">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: var(--accent-rose);"></i>
          </button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderAttachmentsList() {
    const container = document.getElementById('attachedFilesContainer');
    if (!container) return;

    const attachments = window.appState.template.attachments || [];

    if (attachments.length === 0) {
      container.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-subtle);">No collateral files attached.</span>`;
      return;
    }

    container.innerHTML = attachments.map((f, idx) => `
      <div class="file-tag">
        <i data-lucide="paperclip" style="width: 13px; height: 13px;"></i>
        <span>${f.name} (${f.size || '1.2 MB'})</span>
        <span class="remove" onclick="window.leadsController.removeAttachment(${idx})">×</span>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  deleteCompany(id) {
    window.appState.removeCompany(id);
    this.renderCompanyTable();
    if (window.showToast) window.showToast('Company removed from dispatch list', 'info');
  }

  removeAttachment(idx) {
    const attachments = window.appState.template.attachments || [];
    attachments.splice(idx, 1);
    window.appState.updateTemplate({ attachments });
    this.renderAttachmentsList();
    if (window.spamAuditorController) window.spamAuditorController.updateAudit();
  }

  openAddCompanyModal() {
    const modal = document.getElementById('addCompanyModal');
    if (modal) modal.classList.add('active');
  }

  closeAddCompanyModal() {
    const modal = document.getElementById('addCompanyModal');
    if (modal) modal.classList.remove('active');
  }

  handleAddCompanySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('newCompanyName').value.trim();
    const industry = document.getElementById('newCompanyIndustry').value;
    const contactEmail = document.getElementById('newCompanyEmail').value.trim();
    const contactPerson = document.getElementById('newCompanyPerson').value.trim();

    if (!name || !contactEmail) {
      alert('Company Name and Contact Email are required.');
      return;
    }

    window.appState.addCompany({
      name,
      industry,
      contactEmail,
      contactPerson,
      status: 'Pending'
    });

    this.renderCompanyTable();
    this.closeAddCompanyModal();
    
    // Clear form inputs
    document.getElementById('addCompanyForm').reset();
    if (window.showToast) window.showToast(`Added ${name} to target outreach list`, 'success');
  }

  handleFileUpload(files) {
    if (!files || files.length === 0) return;

    const currentAttachments = window.appState.template.attachments || [];
    Array.from(files).forEach(file => {
      const formattedSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      currentAttachments.push({
        name: file.name,
        size: formattedSize
      });
    });

    window.appState.updateTemplate({ attachments: currentAttachments });
    this.renderAttachmentsList();
    if (window.spamAuditorController) window.spamAuditorController.updateAudit();
    if (window.showToast) window.showToast(`Attached ${files.length} file(s) to campaign`, 'success');
  }

  handleCsvImport(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split(/\r\n|\n/);
      let addedCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length >= 3) {
          const name = parts[0].replace(/"/g, '').trim();
          const industry = parts[1].replace(/"/g, '').trim() || 'General';
          const email = parts[2].replace(/"/g, '').trim();
          const person = parts[3] ? parts[3].replace(/"/g, '').trim() : '';

          if (email && email.includes('@')) {
            window.appState.addCompany({
              name: name || 'Target Corp',
              industry,
              contactEmail: email,
              contactPerson: person,
              status: 'Pending'
            });
            addedCount++;
          }
        }
      }

      this.renderCompanyTable();
      if (window.showToast) window.showToast(`Successfully imported ${addedCount} companies from CSV`, 'success');
    };
    reader.readAsText(file);
  }

  bindEvents() {
    const btnAdd = document.getElementById('btnAddCompany');
    if (btnAdd) btnAdd.addEventListener('click', () => this.openAddCompanyModal());

    const formAdd = document.getElementById('addCompanyForm');
    if (formAdd) formAdd.addEventListener('submit', (e) => this.handleAddCompanySubmit(e));

    const btnClear = document.getElementById('btnClearCompanies');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        if (confirm('Clear all attached target companies?')) {
          window.appState.clearCompanies();
          this.renderCompanyTable();
        }
      });
    }

    // Drag and drop attachment uploader
    const dropzone = document.getElementById('fileDropzone');
    const fileInput = document.getElementById('fileAttachmentInput');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleFileUpload(e.target.files));

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--accent-primary)';
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(99, 102, 241, 0.4)';
        if (e.dataTransfer.files) this.handleFileUpload(e.dataTransfer.files);
      });
    }

    // CSV Importer Input
    const csvInput = document.getElementById('csvFileInput');
    if (csvInput) {
      csvInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleCsvImport(e.target.files[0]);
        }
      });
    }
  }
}

window.leadsController = new LeadsController();
