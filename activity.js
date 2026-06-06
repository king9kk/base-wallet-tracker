// Activity Feed Module
const ACTIVITY_KEY = 'recent_activity';
const MAX_ACTIVITY = 20;

function logActivity(type, data) {
  let activities = getActivities();
  activities.unshift({
    id: Date.now(),
    type,
    data,
    timestamp: new Date().toISOString()
  });
  if (activities.length > MAX_ACTIVITY) {
    activities = activities.slice(0, MAX_ACTIVITY);
  }
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities));
  renderActivityFeed();
}

function getActivities() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [];
  } catch {
    return [];
  }
}

function getActivityIcon(type) {
  const icons = {
    wallet_connect: '🔗',
    wallet_disconnect: '🔌',
    search: '🔍',
    export: '📤',
    alert_added: '🔔',
    contact_added: '👤',
    chain_switch: '🌐',
    refresh: '🔄'
  };
  return icons[type] || '📌';
}

function getActivityLabel(type, data) {
  const labels = {
    wallet_connect: `Connected ${shortenAddress(data.address)}`,
    wallet_disconnect: 'Wallet disconnected',
    search: `Searched ${shortenAddress(data.address)}`,
    export: `Exported ${data.format} data`,
    alert_added: `Alert added for ${shortenAddress(data.address)}`,
    contact_added: `Added contact ${data.name}`,
    chain_switch: `Switched to ${data.chain}`,
    refresh: 'Data refreshed'
  };
  return labels[type] || type;
}

function renderActivityFeed() {
  const container = document.querySelector('#activity-feed');
  if (!container) return;

  const activities = getActivities();

  container.innerHTML = `
    <div class="activity-card card">
      <h3>📋 Recent Activity</h3>
      ${activities.length === 0
        ? '<p class="no-activity">No recent activity</p>'
        : activities.map(activity => `
          <div class="activity-item">
            <span class="activity-icon">
              ${getActivityIcon(activity.type)}
            </span>
            <span class="activity-label">
              ${getActivityLabel(activity.type, activity.data)}
            </span>
            <span class="activity-time">
              ${timeAgo(Math.floor(new Date(activity.timestamp).getTime() / 1000))}
            </span>
          </div>
        `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderActivityFeed);