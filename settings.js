// Settings Module
const DEFAULT_SETTINGS = {
  theme: 'dark',
  currency: 'USD',
  language: 'en',
  autoRefresh: true,
  refreshInterval: 30,
  showTestnets: false,
  compactView: false
};

function getSettings() {
  try {
    const saved = localStorage.getItem('app_settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSetting(key, value) {
  const settings = getSettings();
  settings[key] = value;
  localStorage.setItem('app_settings', JSON.stringify(settings));
  applySettings(settings);
  showSuccess('Settings saved!');
}

function applySettings(settings) {
  document.body.setAttribute('data-theme', settings.theme);
  document.body.setAttribute('data-compact', settings.compactView);
}

function renderSettings() {
  const container = document.querySelector('#settings-section');
  if (!container) return;
  const settings = getSettings();

  container.innerHTML = `
    <div class="settings-card card">
      <h3>⚙️ Settings</h3>
      <div class="setting-row">
        <label>Theme</label>
        <select onchange="saveSetting('theme', this.value)">
          <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
          <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Light</option>
        </select>
      </div>
      <div class="setting-row">
        <label>Currency</label>
        <select onchange="saveSetting('currency', this.value)">
          <option value="USD" ${settings.currency === 'USD' ? 'selected' : ''}>USD</option>
          <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>EUR</option>
          <option value="BDT" ${settings.currency === 'BDT' ? 'selected' : ''}>BDT</option>
        </select>
      </div>
      <div class="setting-row">
        <label>Auto Refresh</label>
        <input type="checkbox" ${settings.autoRefresh ? 'checked' : ''}
          onchange="saveSetting('autoRefresh', this.checked)">
      </div>
      <div class="setting-row">
        <label>Compact View</label>
        <input type="checkbox" ${settings.compactView ? 'checked' : ''}
          onchange="saveSetting('compactView', this.checked)">
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  applySettings(getSettings());
  renderSettings();
});