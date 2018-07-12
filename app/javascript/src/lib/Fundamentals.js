export const defaultFundamentalsData = {
  portfolio: {
    name: "-",
    securities: [...Array(4)].map((_, i) => ({
      name: "...",
      symbol: "...",
      quote: {
        latestPrice: "...",
        changePercent: "...",
        marketCap: "...",
        latestVolume: "...",
        open: "...",
        high: "...",
        low: "...",
        daysGain: "..."
      }
    }))
  }
};
