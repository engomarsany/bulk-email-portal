/* ==========================================================================
   OWNER / ADMIN MASTER CONTROL PANEL
   ========================================================================== */

class OwnerPanelController {
  constructor() {
    this.chartInstance = null;
  }

  init() {
    this.renderAll();
    this.bindEvents();
  }

  renderAll() {
    this.renderMetrics();
    this.renderSentLogsTable();
    this.renderChart();
    this.renderDomainHealth();
  }

  renderMetrics() {
    const logs = window.appState.sentLogs || [];
    const totalSent = logs.length;
    const aiCount = logs.filter(l => l.aiOptimized).length;
    const deliveredCount = logs.filter(l => l.status === 'Delivered').length;
    const deliveryRate = totalSent > 0 ? Math.round((deliveredCount / totalSent) * 100) : 100;

    const elTotal = document.getElementById('ownerMetricTotalSent');
    const elDelivery = document.getElementById('ownerMetricDeliveryRate');
    const elAiCount = document.getElementById('ownerMetricAiCount');
    const elSpamRate = document.getElementById('ownerMetricSpamRate');

    if (elTotal) elTotal.textContent = totalSent;
    if (elDelivery) elDelivery.textContent = `${deliveryRate}%`;
    if (elAiCount) elAiCount.textContent = aiCount;
    if (elSpamRate) elSpamRate.textContent = '0.2% (Excellent)';
  }

  renderSentLogsTable(filterText = '') {
    const tableBody = document.getElementById('ownerLogsTableBody');
    if (!tableBody) return;

    let logs = window.appState.sentLogs || [];

    if (filterText) {
      const q = filterText.toLowerCase();
      logs = logs.filter(l => 
        l.recipientCompany.toLowerCase().includes(q) ||
        l.recipientEmail.toLowerCase().includes(q) ||
        l.subject.toLowerCase().includes(q) ||
        l.senderEmail.toLowerCase().includes(q)
      );
    }

    if (logs.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; color: var(--text-muted); padding: 2rem;">
            No sent email logs matching filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = logs.map(l => `
      <tr>
        <td><code>${l.id}</code></td>
        <td><span style="font-size:0.8rem; color:var(--text-muted);">${l.timestamp}</span></td>
        <td><strong>${l.recipientCompany}</strong><br><span style="font-size:0.75rem; color:var(--text-subtle);">${l.recipientEmail}</span></td>
        <td>${l.subject.substring(0, 45)}${l.subject.length > 45 ? '...' : ''}</td>
        <td>
          ${l.aiOptimized ? '<span class="badge badge-purple">✨ AI Tailored</span>' : '<span class="badge badge-info">Standard</span>'}
        </td>
        <td><span class="badge badge-success">${l.status}</span></td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" onclick="window.ownerPanelController.inspectEmailLog('${l.id}')">
            <i data-lucide="eye" style="width:14px;height:14px;"></i> Inspect
          </button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  inspectEmailLog(logId) {
    const logs = window.appState.sentLogs || [];
    const log = logs.find(l => l.id === logId);
    if (!log) return;

    const modal = document.getElementById('inspectEmailModal');
    if (!modal) return;

    document.getElementById('inspectLogId').textContent = log.id;
    document.getElementById('inspectSender').textContent = log.senderEmail;
    document.getElementById('inspectRecipient').textContent = `${log.recipientCompany} (${log.recipientEmail})`;
    document.getElementById('inspectTime').textContent = log.timestamp;
    document.getElementById('inspectSubject').textContent = log.subject;
    document.getElementById('inspectSpamScore').textContent = log.spamScore || '96% Inbox';
    document.getElementById('inspectAiBadge').style.display = log.aiOptimized ? 'inline-block' : 'none';
    document.getElementById('inspectBodyText').textContent = log.body;

    const attachList = document.getElementById('inspectAttachmentsList');
    if (attachList) {
      if (log.attachments && log.attachments.length > 0) {
        attachList.innerHTML = log.attachments.map(a => `<span class="file-tag"><i data-lucide="paperclip" style="width:12px;height:12px;"></i> ${a}</span>`).join('');
      } else {
        attachList.innerHTML = `<span style="font-size:0.8rem; color:var(--text-subtle);">No attached files</span>`;
      }
    }

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  closeInspectModal() {
    const modal = document.getElementById('inspectEmailModal');
    if (modal) modal.classList.remove('active');
  }

  renderChart() {
    const canvas = document.getElementById('ownerAnalyticsChart');
    if (!canvas || !window.Chart) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    this.chartInstance = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'],
        datasets: [
          {
            label: 'Emails Sent (Inbox)',
            data: [120, 310, 450, 680, 890, 1020, 1250],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'AI Optimized dispatches',
            data: [80, 240, 380, 520, 710, 940, 1100],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8' }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  renderDomainHealth() {
    const settings = window.appState.ownerSettings;
    const spfEl = document.getElementById('ownerSpfStatus');
    const dkimEl = document.getElementById('ownerDkimStatus');
    const dmarcEl = document.getElementById('ownerDmarcStatus');

    if (spfEl) spfEl.textContent = settings.spfStatus;
    if (dkimEl) dkimEl.textContent = settings.dkimStatus;
    if (dmarcEl) dmarcEl.textContent = settings.dmarcStatus;
  }

  bindEvents() {
    const searchInput = document.getElementById('ownerSearchLogInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.renderSentLogsTable(e.target.value));
    }
  }
}

window.ownerPanelController = new OwnerPanelController();
