// Leaderboard Module
const LEADERBOARD_KEY = 'wallet_leaderboard';

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
  } catch {
    return [];
  }
}

function addToLeaderboard(address, balance, txCount) {
  let board = getLeaderboard();
  const existing = board.findIndex(w => w.address === address);
  const entry = {
    address,
    balance: parseFloat(balance),
    txCount: parseInt(txCount),
    score: parseFloat(balance) * 100 + parseInt(txCount),
    updatedAt: new Date().toISOString()
  };

  if (existing >= 0) {
    board[existing] = entry;
  } else {
    board.push(entry);
  }

  board.sort((a, b) => b.score - a.score);
  board = board.slice(0, 10);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board));
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.querySelector('#leaderboard-container');
  if (!container) return;

  const board = getLeaderboard();
  const medals = ['🥇', '🥈', '🥉'];

  container.innerHTML = `
    <div class="leaderboard-card card">
      <h3>🏆 Top Wallets</h3>
      ${board.length === 0
        ? '<p class="no-data">No wallets tracked yet</p>'
        : board.map((entry, i) => `
          <div class="leaderboard-item ${entry.address === connectedAddress ? 'active' : ''}">
            <span class="rank">${medals[i] || `#${i + 1}`}</span>
            <span class="lb-address">${shortenAddress(entry.address)}</span>
            <span class="lb-balance">${entry.balance.toFixed(4)} ETH</span>
            <span class="lb-txcount">${entry.txCount} txs</span>
          </div>
        `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderLeaderboard);