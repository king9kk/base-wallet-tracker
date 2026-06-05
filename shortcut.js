// Keyboard Shortcuts Module
const SHORTCUTS = {
  's': () => document.querySelector('.search-input')?.focus(),
  'c': () => document.querySelector('.connect-btn')?.click(),
  't': () => toggleTheme(),
  'Escape': () => {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.click();
  },
  '1': () => navigateTo('dashboard'),
  '2': () => navigateTo('portfolio'),
  '3': () => navigateTo('transactions'),
  '4': () => navigateTo('tokens'),
  '5': () => navigateTo('nfts'),
  '6': () => navigateTo('analytics')
};

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA') return;
    
    const handler = SHORTCUTS[e.key];
    if (handler) {
      e.preventDefault();
      handler();
    }
  });
}

function renderShortcutsHelp() {
  const shortcuts = [
    { key: 'S', action: 'Focus search' },
    { key: 'C', action: 'Connect wallet' },
    { key: 'T', action: 'Toggle theme' },
    { key: '1-6', action: 'Navigate pages' },
    { key: 'Esc', action: 'Close modal' }
  ];

  const content = shortcuts.map(s => `
    <div class="shortcut-row">
      <kbd>${s.key}</kbd>
      <span>${s.action}</span>
    </div>
  `).join('');

  return content;
}

function showShortcutsModal() {
  createModal('shortcuts-modal', '⌨️ Keyboard Shortcuts', renderShortcutsHelp());
}

document.addEventListener('DOMContentLoaded', () => {
  initKeyboardShortcuts();
  const helpBtn = document.querySelector('#shortcuts-help');
  if (helpBtn) helpBtn.addEventListener('click', showShortcutsModal);
});