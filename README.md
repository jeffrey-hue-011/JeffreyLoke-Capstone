# Stock Tracker - Digital Portfolio Dashboard

A React-based dashboard for tracking stock investments with real-time price updates from AlphaVantage.

## Features
- **Real-time Price Sync**: automatically fetches the latest prices for your stocks.
- **Dynamic Profit/Loss**: Instantly see your gains and losses with color-coded indicators (Green for profit, Red for loss).
- **Symbol Validation**: Prevents adding invalid tickers by verifying them against the AlphaVantage API.
- **State Management**: Uses React Context API (`useContext`) for global state management.
- **Custom React Hooks**: Implements `useState`, `useEffect`, and `useCallback` for optimized performance and clean code.
- **UI**: Dark mode design with glassmorphism and light green accents.

## Requirements Checklist
- [x] Stock Form for entering Symbol, Quantity, and Price.
- [x] Symbol validation (ignores invalid symbols).
- [x] Stock List with real-time Current Price and Profit/Loss.
- [x] Visual styling with intuitive layout.
- [x] AlphaVantage API integration.
- [x] React Hooks: `useState`, `useEffect`, `useCallback`, `useContext`.
- [x] Conditional rendering for empty state and data availability.

## How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd JeffreyLoke-Capstone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set Up API Key**:
   - Create a `.env` file in the `JeffreyLoke-Capstone/` subfolder.
   - Add your [AlphaVantage](https://www.alphavantage.co/) key:
     ```env
     VITE_ALPHAVANTAGE_API_KEY=your_api_key_here
     ```
   - (Optional) If no key is provided, the app defaults to the `demo` key (tracked symbols limited to IBM).

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Challenges Encountered
- **API Rate Limits**: Handled by using memoized fetch calls and providing the `demo` fallback.
- **Validation**: Implemented an async check during stock addition to ensure data integrity.

## Improvements Beyond Baseline
- **Auto-Refresh**: Prices update automatically every minute.
- **Glassmorphism Design**: Enhanced visual aesthetics with backdrop filters and custom neon accents.
- **Global Provider**: Clean architecture using Context Provider for shared state.
- **Total Portfolio Value Widget**: Top-right widget showing the aggregated value of all holdings.
- **Total Unrealized P&L Widget**: Dynamic header widget showing overall portfolio performance (gain/loss) with color coding.
