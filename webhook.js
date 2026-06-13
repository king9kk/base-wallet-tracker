// Webhook & Integration Module
const WEBHOOK_KEY = 'webhooks';

function getWebhooks() {
  try {
    return JSON.parse(localStorage.getItem(WEBHOOK_KEY)) || [];
  } catch {
    return [];
  }
}

function addWebhook(url, events) {
  const webhooks = getWebhooks();
  webhooks.push({
    id: Date.now(),
    url,
    events,
    active: true,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(WEBHOOK_KEY, JSON.stringify(webhooks));
  showSuccess('Webhook added!');
  renderWebhooks();
}

function removeWebhook(id) {
  let webhooks = getWebhooks();
  webhooks = webhooks.filter(w => w.id !== id);
  localStorage.setItem(WEBHOOK_KEY, JSON.stringify(webhooks));
  renderWebhooks();
}

async function triggerWebhook(event, data) {
  const webhooks = getWebhooks()
    .filter(w => w.active && w.events.includes(event));

  for (const webhook of webhooks) {
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          data,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Webhook failed:', error);
    }
  }
}

const WEBHOOK_EVENTS = [
  'wallet_connected',
  'balance_changed',
  'new_transaction',
  'alert_triggered'
];

function renderWebhooks() {
  const container = document.querySelector('#webhook-container');
  if (!container) return;

  const webhooks = getWebhooks();

  container.innerHTML = `
    <div class="card">
      <h3>🔗 Webhooks</h3>
      <p style="color:#888;font-size:13px;margin:8px 0 16px">
        Get notified when events happen in your wallet
      </p>
      ${webhooks.length === 0
        ? '<p style="color:#888">No webhooks configured</p>'
        : webhooks.map(w => `
          <div style="display:flex;justify-content:space-between;
            align-items:center;padding:10px 0;
            border-bottom:1px solid var(--border)">
            <div>
              <div style="font-size:13px">${w.url}</div>
              <div style="color:#888;font-size:11px">
                Events: ${w.events.join(', ')}
              </div>
            </div>
            <button onclick="removeWebhook(${w.id})"
              style="background:#ff3d00;color:white;border:none;
              padding:4px 10px;border-radius:6px;cursor:pointer;
              font-size:12px">Remove</button>
          </div>
        `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderWebhooks);