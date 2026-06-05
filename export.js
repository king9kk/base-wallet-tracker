// Export Data Module
function exportToCSV(transactions, filename = 'transactions.csv') {
  if (!transactions || transactions.length === 0) {
    showError('No transactions to export!');
    return;
  }

  const headers = ['Hash', 'From', 'To', 'Value (ETH)', 'Date', 'Status'];
  const rows = transactions.map(tx => [
    tx.hash,
    tx.from,
    tx.to,
    (parseInt(tx.value) / 1e18).toFixed(6),
    new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString(),
    tx.isError === '0' ? 'Success' : 'Failed'
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  downloadFile(csvContent, filename, 'text/csv');
  showSuccess('Transactions exported successfully!');
}

function exportToJSON(data, filename = 'wallet-data.json') {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
  showSuccess('Data exported as JSON!');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function initExport() {
  const csvBtn = document.querySelector('#export-csv');
  const jsonBtn = document.querySelector('#export-json');
  if (csvBtn) csvBtn.addEventListener('click', () => exportToCSV(window.currentTxs));
  if (jsonBtn) jsonBtn.addEventListener('click', () => exportToJSON(window.portfolioData));
}

document.addEventListener('DOMContentLoaded', initExport);