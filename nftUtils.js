// NFT Utility Functions
const NFT_STANDARDS = {
  ERC721: "ERC-721",
  ERC1155: "ERC-1155",
};

function formatNFTName(collection, tokenId) {
  if (!collection) return `#${tokenId}`;
  return `${collection} #${tokenId}`;
}

function getNFTImageUrl(metadata) {
  if (!metadata) return null;
  const url = metadata.image || metadata.image_url || null;
  if (!url) return null;
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

function parseNFTAttributes(attributes) {
  if (!Array.isArray(attributes)) return [];
  return attributes.map((attr) => ({
    trait: attr.trait_type || attr.trait || "Unknown",
    value: attr.value ?? "N/A",
    rarity: attr.rarity || null,
  }));
}

function calcRarityScore(attributes) {
  if (!attributes || attributes.length === 0) return 0;
  const total = attributes.reduce((sum, attr) => {
    const rarity = parseFloat(attr.rarity || 50);
    return sum + (100 - rarity);
  }, 0);
  return (total / attributes.length).toFixed(2);
}

function groupNFTsByCollection(nfts) {
  return nfts.reduce((groups, nft) => {
    const key = nft.collection || "Unknown";
    if (!groups[key]) groups[key] = [];
    groups[key].push(nft);
    return groups;
  }, {});
}

function sortNFTsByRarity(nfts, order = "desc") {
  return [...nfts].sort((a, b) => {
    const aScore = parseFloat(a.rarityScore || 0);
    const bScore = parseFloat(b.rarityScore || 0);
    return order === "desc" ? bScore - aScore : aScore - bScore;
  });
}

function isValidNFTContract(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function getNFTMarketplaceUrl(network, contract, tokenId) {
  if (network === "ethereum") {
    return `https://opensea.io/assets/ethereum/${contract}/${tokenId}`;
  }
  if (network === "polygon") {
    return `https://opensea.io/assets/matic/${contract}/${tokenId}`;
  }
  return "#";
}

export {
  NFT_STANDARDS,
  formatNFTName,
  getNFTImageUrl,
  parseNFTAttributes,
  calcRarityScore,
  groupNFTsByCollection,
  sortNFTsByRarity,
  isValidNFTContract,
  getNFTMarketplaceUrl,
};