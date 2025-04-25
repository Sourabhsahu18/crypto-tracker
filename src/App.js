import React from 'react';
import CryptoTable from './components/cryptoTable';
import { Provider } from 'react-redux';
import { store } from './store/cryptoSlice';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Real-Time Crypto Price Tracker</h1>
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;