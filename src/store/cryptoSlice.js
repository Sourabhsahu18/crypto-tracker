import { createSlice, configureStore } from "@reduxjs/toolkit";
// Initial static data for multiple cryptocurrencies
const initialCryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 63759.48,
    change1h: 0.43,
    change24h: 0.93,
    change7d: 11.11,
    marketCap: 1881618902186,
    volume24h: 43874350047,
    circulatingSupply: 19.85,
    maxSupply: 21,
    sparkline7d: [62000, 62500, 63000, 63500, 63200, 63800, 63700], // Static sample
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 1802.46,
    change1h: 0.6,
    change24h: 3.21,
    change7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23347469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    sparkline7d: [3100, 3120, 3150, 3130, 3160, 3170, 3180], // Static sample
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    price: 1.0,
    change1h: -0.0,
    change24h: -0.0,
    change7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    sparkline7d: [0.998, 0.999, 1.001, 1.0, 1.002, 1.0, 1.0], // Static sample
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    price: 0.52,
    change1h: 0.46,
    change24h: 0.54,
    change7d: 6.18,
    marketCap: 130073914966,
    volume24h: 5731481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    sparkline7d: [0.5, 0.51, 0.515, 0.52, 0.518, 0.522, 0.52], // Static sample
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    price: 306.65,
    change1h: 0.09,
    change24h: 1.2,
    change7d: 3.73,
    marketCap: 85471256847,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: null,
    sparkline7d: [300, 302, 305, 303, 307, 306, 306.5], // Static sample
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 142.5,
    change1h: 0.45,
    change24h: -2.3,
    change7d: 8.75,
    marketCap: 63500000000,
    volume24h: 2500000000,
    circulatingSupply: 445000000,
    maxSupply: null,
    sparkline7d: [135, 138, 140, 143, 142, 141, 142.5], // Static sample
  },
];

// Create a Redux slice for crypto data
const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    assets: initialCryptoData, // Store all crypto assets
  },
  reducers: {
    // Action to update asset values (used by WebSocket simulator)
    updateAsset: (state, action) => {
      const index = state.assets.findIndex(
        (asset) => asset.id === action.payload.id
      );
      if (index !== -1) {
        // Merge new values into the matched asset
        state.assets[index] = { ...state.assets[index], ...action.payload };
      }
    },
  },
});

// Export the updateAsset action for dispatching updates
export const { updateAsset } = cryptoSlice.actions;
// Selector to access all crypto assets from state
export const selectAllAssets = (state) => state.crypto.assets;
// Create and export the Redux store with the crypto reducer
export const store = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});
