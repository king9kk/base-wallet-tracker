// Version & Update Manager
const VERSION_INFO = {
  current: '1.0.0',
  released: '2026-06-05',
  codename: 'Genesis',
  changelog: 'https://github.com/king9kk/base-wallet-tracker/blob/main/CHANGELOG.md'
};

function getVersion() {
  return VERSION_INFO.current;
}

function renderVersionInfo() {
  const container = document.querySelector('#version-info');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align:center;padding:24px;color:#888;font-size:13px">
      <div style="font-size:24px;margin-bottom:8px">⬡</div>
      <div style="color:#fff;font-weight:bold;margin-bottom:4px">
        Base Wallet Tracker
      </div>
      <div>Version ${VERSION_INFO.current} "${VERSION_INFO.codename}"</div>
      <div>Released: ${VERSION_INFO.released}</div>
      <a href="${VERSION_INFO.changelog}" target="_blank"
        style="color:#0052ff;text-decoration:none;display:block;margin-top:8px">
        View Changelog →
      </a>
    </div>
  `;
}

function checkVersion() {
  const lastVersion = localStorage.getItem('last_version');
  if (lastVersion && lastVersion !== VERSION_INFO.current) {
    showSuccess(`Updated to v${VERSION_INFO.current}!`);
  }
  localStorage.setItem('last_version', VERSION_INFO.current);
}

document.addEventListener('DOMContentLoaded', () => {
  renderVersionInfo();
  checkVersion();
  console.log(`Base Wallet Tracker v${VERSION_INFO.current} - ${VERSION_INFO.codename}`);
});