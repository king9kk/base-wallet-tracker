// Portfolio Analytics
function calcPortfolioChange(current, previous) {
  if (!previous || previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(2);
}

function getTopAssets(tokens, limit = 5) {
  return [...tokens]
    .sort((a, b) => parseFloat(b.balanceUSD) - parseFloat(a.balanceUSD))
    .slice(0, limit);
}

function calcAssetAllocation(tokens) {
  const total = tokens.reduce(
    (sum, t) => sum + parseFloat(t.balanceUSD || 0),
    0
  );
  if (total === 0) return [];

  return tokens.map((t) => ({
    symbol: t.symbol,
    allocation: (((parseFloat(t.balanceUSD) / total) * 100).toFixed(1)),
    balanceUSD: t.balanceUSD,
  }));
}

function calcDiversificationScore(tokens) {
  const allocation = calcAssetAllocation(tokens);
  if (allocation.length === 0) return 0;

  const maxAllocation = Math.max(
    ...allocation.map((a) => parseFloat(a.allocation))
  );

  if (maxAllocation >= 80) return 1;
  if (maxAllocation >= 60) return 2;
  if (maxAllocation >= 40) return 3;
  if (maxAllocation >= 20) return 4;
  return 5;
}

function getPortfolioSummary(tokens) {
  const total = tokens.reduce(
    (sum, t) => sum + parseFloat(t.balanceUSD || 0),
    0
  );
  const top = getTopAssets(tokens, 1)[0];
  const score = calcDiversificationScore(tokens);

  return {
    totalValue: total.toFixed(2),
    topAsset: top?.symbol || "N/A",
    assetCount: tokens.length,
    diversificationScore: score,
  };
}

function filterByNetwork(tokens, network) {
  if (!network || network === "all") return tokens;
  return tokens.filter(
    (t) => t.network?.toLowerCase() === network.toLowerCase()
  );
}

export {
  calcPortfolioChange,
  getTopAssets,
  calcAssetAllocation,
  calcDiversificationScore,
  getPortfolioSummary,
  filterByNetwork,
};