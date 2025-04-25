import { store, updateAsset } from '../store/cryptoSlice';
import { generateRandomChange, generateRandomPercentage, generateRandomVolumeChange } from '../utils';

class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.intervalId = null;
  }
 // Placeholder for onmessage handler, can be used to listen to simulated data updates
  onmessage = () => {};

  connect() {
     // Start simulating real-time updates every 0.5 seconds
    this.intervalId = setInterval(() => {
      const state = store.getState().crypto.assets;
      const randomIndex = Math.floor(Math.random() * state.length);
      const randomAsset = state[randomIndex];

       // Generate updated values for the asset to simulate market changes
      const updatedAsset = {
        id: randomAsset.id,
        price: generateRandomChange(randomAsset.price, 0.005), // Small price changes in fluctuation
        change1h: generateRandomPercentage(randomAsset.change1h), // Small percentage changes in 1h
        change24h: generateRandomPercentage(randomAsset.change24h), // Simulate change % in 24h
        change7d: generateRandomPercentage(randomAsset.change7d), // Simulate change % in 7d
        volume24h: generateRandomVolumeChange(randomAsset.volume24h, 0.02), // Small volume changes
      };
// Dispatch the updated asset to the Redux store
      store.dispatch(updateAsset(updatedAsset));
      
        // Trigger a fake WebSocket message event
      this.onmessage({ data: JSON.stringify(updatedAsset) }); // Simulate message event
    }, 1000); // Interval for simulating live data updates
  }

  disconnect() {
     // Stop the interval to halt fake updates
    clearInterval(this.intervalId);
  }
}
// Create and export a singleton instance
const mockWebSocket = new MockWebSocket('ws://fake-crypto-socket.com');

export default mockWebSocket;