// Search & Filter Module
function searchWallet(query) {
  if (!query || query.length < 10) {
    showError('Please enter a valid wallet address');
    return;
  }
  const address = query.trim().toLowerCase();
  loadWalletData(address);
}

function filterTransactions(transactions, filter) {
  switch (filter) {
    case 'sent':
      return transactions.filter(tx => 
        tx.from.toLowerCase() === connectedAddress?.toLowerCase()
      );
    case 'received':
      return transactions.filter(tx => 
        tx.to.toLowerCase() === connectedAddress?.toLowerCase()
      );
    case 'failed':
      return transactions.filter(tx => tx.isError === '1');
    default:
      return transactions;
  }
}

function sortTransactions(transactions, sortBy) {
  switch (sortBy) {
    case 'value':
      return [...transactions].sort((a, b) => 
        parseInt(b.value) - parseInt(a.value)
      );
    case 'date':
      return [...transactions].sort((a, b) => 
        parseInt(b.timeStamp) - parseInt(a.timeStamp)
      );
    default:
      return transactions;
  }
}

function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchWallet(searchInput?.value);
    });
  }
}

document.addEventListener('DOMContentLoaded', initSearch);