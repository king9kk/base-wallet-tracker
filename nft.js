// NFT Display Module
async function getNFTs(address) {
  try {
    const response = await fetch(
      `https://api.basescan.org/api?module=account&action=tokennfttx&address=${address}&sort=desc`
    );
    const data = await response.json();
    return data.result || [];
  } catch {
    return [];
  }
}

function renderNFTs(nfts) {
  const container = document.querySelector('#nft-container');
  if (!container) return;

  if (nfts.length === 0) {
    container.innerHTML = '<p class="no-nft">No NFTs found</p>';
    return;
  }

  const unique = [...new Map(nfts.map(n => 
    [n.contractAddress, n])).values()];

  container.innerHTML = `
    <div class="nft-card card">
      <h3>🖼️ NFT Collections</h3>
      <div class="nft-grid">
        ${unique.slice(0, 6).map(nft => `
          <div class="nft-item">
            <div class="nft-placeholder">🎨</div>
            <div class="nft-name">${nft.tokenName || 'Unknown'}</div>
            <div class="nft-symbol">${nft.tokenSymbol || '?'}</div>
            <a href="https://basescan.org/token/${nft.contractAddress}" 
              target="_blank" class="nft-link">View</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

async function loadNFTs(address) {
  const nfts = await getNFTs(address);
  renderNFTs(nfts);
}