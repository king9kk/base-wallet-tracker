// Progressive Web App Module
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('SW registered:', reg.scope);
        checkForUpdates(reg);
      })
      .catch(err => console.error('SW failed:', err));
  }
}

function checkForUpdates(registration) {
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' &&
          navigator.serviceWorker.controller) {
        showUpdateBanner();
      }
    });
  });
}

function showUpdateBanner() {
  const banner = document.createElement('div');
  banner.style.cssText = `
    position:fixed;top:0;left:0;right:0;
    background:#0052ff;color:white;
    padding:12px 24px;display:flex;
    justify-content:space-between;align-items:center;
    z-index:9999;font-size:14px;
  `;
  banner.innerHTML = `
    <span>🔄 New version available!</span>
    <button onclick="window.location.reload()"
      style="background:white;color:#0052ff;border:none;
      padding:6px 14px;border-radius:6px;cursor:pointer;
      font-size:13px;font-weight:bold">
      Update
    </button>
  `;
  document.body.prepend(banner);
}

function initInstallPrompt() {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton(deferredPrompt);
  });
}

function showInstallButton(prompt) {
  const btn = document.querySelector('#install-btn');
  if (!btn) return;

  btn.style.display = 'block';
  btn.addEventListener('click', async () => {
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') {
      showSuccess('App installed successfully!');
    }
    btn.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  initInstallPrompt();
});