// API Service Module
const API_BASE = 'https://api.basescan.org/api';
const API_KEY = '';

async function apiRequest(params) {
  try {
    const query = new URLSearchParams({
      ...params,
      apikey: API_KEY
    }).toString();

    const response = await fetch(`${API_BASE}?${query}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (data.status === '0' && data.message === 'NOTOK') {
      throw new Error(data.result);
    }
    return data.result;
  } catch (error) {
    handleError(error, ERROR_TYPES.API);
    return null;
  }
}

async function getAccountBalance(address) {
  return apiRequest({
    module: 'account',
    action: 'balance',
    address,
    tag: 'latest'
  });
}

async function getAccountTransactions(address, page = 1, offset = 10) {
  return apiRequest({
    module: 'account',
    action: 'txlist',
    address,
    startblock: 0,
    endblock: 99999999,
    page,
    offset,
    sort: 'desc'
  });
}

async function getTokenTransfers(address) {
  return apiRequest({
    module: 'account',
    action: 'tokentx',
    address,
    sort: 'desc'
  });
}

async function getContractABI(contractAddress) {
  return apiRequest({
    module: 'contract',
    action: 'getabi',
    address: contractAddress
  });
}

async function getBlockNumber() {
  return apiRequest({
    module: 'proxy',
    action: 'eth_blockNumber'
  });
}