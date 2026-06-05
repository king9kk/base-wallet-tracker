// Pagination Module
let currentPage = 1;
const ITEMS_PER_PAGE = 10;
let allTransactions = [];

function paginate(items, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
}

function getTotalPages(items, perPage) {
  return Math.ceil(items.length / perPage);
}

function renderPagination(totalPages) {
  const container = document.querySelector('#pagination');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(`
      <button 
        class="page-btn ${i === currentPage ? 'active' : ''}" 
        onclick="goToPage(${i})"
      >${i}</button>
    `);
  }

  container.innerHTML = `
    <div class="pagination-wrapper">
      <button class="page-btn" onclick="goToPage(${currentPage - 1})"
        ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>
      ${pages.join('')}
      <button class="page-btn" onclick="goToPage(${currentPage + 1})"
        ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>
    </div>
  `;
}

function goToPage(page) {
  const totalPages = getTotalPages(allTransactions, ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  const paginated = paginate(allTransactions, currentPage, ITEMS_PER_PAGE);
  renderTransactions(paginated);
  renderPagination(totalPages);
}

function initPagination(transactions) {
  allTransactions = transactions;
  currentPage = 1;
  goToPage(1);
}