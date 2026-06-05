// Dark/Light Mode Toggle Module
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-icon');
  if (!icon) return;
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function applyThemeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    [data-theme="light"] {
      --bg: #f5f5f5;
      --card: #ffffff;
      --text: #000000;
      --muted: #555555;
      --border: #dddddd;
    }
    [data-theme="dark"] {
      --bg: #0a0b0d;
      --card: #1a1b1f;
      --text: #ffffff;
      --muted: #888888;
      --border: #2a2b2f;
    }
  `;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  applyThemeStyles();
  initTheme();
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
});