// Input Validation Module
function validateAddress(address) {
  if (!address) {
    return { valid: false, error: 'Address is required' };
  }
  if (!address.startsWith('0x')) {
    return { valid: false, error: 'Address must start with 0x' };
  }
  if (address.length !== 42) {
    return { valid: false, error: 'Address must be 42 characters long' };
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, error: 'Address contains invalid characters' };
  }
  return { valid: true, error: null };
}

function validateAmount(amount) {
  if (!amount || isNaN(amount)) {
    return { valid: false, error: 'Invalid amount' };
  }
  if (parseFloat(amount) <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  if (parseFloat(amount) > 1000000) {
    return { valid: false, error: 'Amount too large' };
  }
  return { valid: true, error: null };
}

function validateAndSearch(input) {
  const address = input?.trim();
  const result = validateAddress(address);

  const errorEl = document.querySelector('.search-error');
  if (!result.valid) {
    if (errorEl) {
      errorEl.textContent = result.error;
      errorEl.style.display = 'block';
    }
    showError(result.error);
    return false;
  }

  if (errorEl) errorEl.style.display = 'none';
  return true;
}

function initValidation() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce(() => {
    const value = searchInput.value.trim();
    if (value.length > 0) {
      validateAndSearch(value);
    }
  }, 500));
}

document.addEventListener('DOMContentLoaded', initValidation);