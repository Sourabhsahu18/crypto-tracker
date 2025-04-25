

# Real-Time Crypto Price Tracker

A real-time cryptocurrency price tracker built with React and Redux Toolkit. This application simulates WebSocket updates and displays real-time cryptocurrency prices, changes, volume, and other details in a responsive table.

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, CSS
- **Backend**: (Mocked real-time data via Redux, no backend in this project)
- **State Management**: Redux Toolkit (`createSlice`, `configureStore`)
- **Styling**: Plain CSS (no external libraries)
- **Charting**: Static 7-day chart images (SVG format)
- **Utilities**: `setInterval` for simulating real-time data updates

## Features

- **Real-time Data Updates**: Simulates WebSocket updates for cryptocurrency data every 1-2 seconds (price, percentage change, volume).
- **Responsive Table**: Displays asset details like price, 1h, 24h, and 7d percentage changes, market cap, volume, circulating supply, and a 7-day chart.
- **Color-Coded Changes**: Green for positive percentage changes, red for negative changes.
- **Redux State Management**: All data is managed in Redux with optimized re-renders using `useSelector`.

## Architecture

The application follows a **React-Redux** architecture where:

1. **Components**: The core UI of the app is built using React functional components.
   - `CryptoTable`: Displays a table of all cryptocurrencies.
   - `CryptoRow`: Represents each cryptocurrency row in the table with details like price, change percentages, and volume.
2. **State Management (Redux)**: 
   - **Actions**: The `updateAsset` action updates the state with new values received via the simulated WebSocket.
   - **Reducers**: The data for all assets is stored in the Redux store under `crypto.assets`.
   - **Store**: The Redux store is configured with the crypto slice reducer.
3. **Helper Utilities**: Functions to generate random changes for price, percentage change, and volume, simulating real-time updates.

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or higher) and **npm**  installed.

### Installation

1. Clone the repository:

   ```bash
   
    https://github.com/Sourabhsahu18/crypto-tracker.git
  


## Navigate into the project directory:

cd crypto-price-tracker

## Install the dependencies:

npm install

## To run the app locally:

npm start





### My Local Video

<video width="640" height="360" controls>
  <source src="src/assets/Demo_Gif.gif" type="gif/mp4">

</video>