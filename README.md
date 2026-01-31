# Stock Tracker - Digital Portfolio Dashboard

A premium React-based dashboard for tracking stock investments with real-time price updates and portfolio analytics. Built with Vite, React Context API, and AlphaVantage.

## 🚀 Recent Updates
- **Auto-Refresh Toggle**: Added a user-controlled toggle to enable/disable the 5-minute background refresh to preserve API credits.
- **Manual Data Sync**: Added a "Refresh Now" button for instant, on-demand portfolio updates.
- **Portfolio Management**: Added the ability to remove stocks from your portfolio with a single click.
- **Strict Validation**: Enhanced the stock adding process to strictly ignore invalid symbols while providing clear feedback for rate limits.

## ✨ Core Features
- **Real-time Price Sync**: Automatically (or manually) fetches the latest prices for your individual stock holdings.
- **Advanced Portfolio Summary**: Real-time widgets in the header calculate your **Total Portfolio Value** and **Total Unrealized P&L** across all holdings.
- **Dynamic Profit/Loss**: Instantly see your gains and losses with color-coded indicators (Green for profit, Red for loss).
- **Intelligent Validation**: Prevents adding invalid tickers by verifying them against the AlphaVantage API before they enter your portfolio.
- **Premium UI/UX**: A state-of-the-art dark mode design featuring glassmorphism, smooth animations, and a fully responsive layout.
- **State Management**: Scalable architecture using React Context API (`useContext`) for global synchronization of portfolio data.

## 🛠 Tech Stack & Hooks
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Custom properties, Flex/Grid, Animations)
- **API**: AlphaVantage GLOBAL_QUOTE
- **React Hooks**:
  - `useState`: For managing portfolio data, form inputs, loading states, and refresh preferences.
  - `useEffect`: For lifecycle-based API calls and managing the auto-refresh interval.
  - `useCallback`: For memoizing complex fetch logic and optimizing performance.
  - `useContext`: For global state distribution via a custom `useStocks` hook.

## 📋 Requirements Checklist
- [x] **Requirement 1 (Stock Form)**: Form with Symbol, Quantity, and Price. Validates and ignores invalid symbols.
- [x] **Requirement 2 (Stock List)**: Displays holdings with real-time prices and P&L.
- [x] **Requirement 3 (Styling)**: Visually appealing, responsive glassmorphism design.
- [x] **Requirement 4 (API Integration)**: AlphaVantage fetch integration with mount-time updates.
- [x] **Requirement 5 (State Management)**: `StockContext` and `StockProvider` implementation.
- [x] **Requirement 6 (Conditional Rendering)**: Handles empty states and "Awaiting Data" placeholders gracefully.
- [x] **Requirement 7 (Hooks Usage)**: Deep integration of `useState`, `useEffect`, `useCallback`, and `useContext`.

## ⚙️ How to Run Locally

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
   - Create a `.env` file in the root directory.
   - Add your [AlphaVantage](https://www.alphavantage.co/) key:
     ```env
     VITE_ALPHAVANTAGE_API_KEY=your_api_key_here
     ```
   - *Note: If no key is provided, the app defaults to the `demo` key which only supports symbol "IBM".*

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🧠 Challenges & Solutions
- **Strict API Rate Limits**: Solved by implementing a 5-minute refresh interval and a **User Control Toggle**, ensuring users don't burn through their daily 25-request limit unintentionally.
- **Invalid Symbol Handling**: Implemented a "Pre-add Validation" check that attempts a small API call to verify a symbol's existence before adding it to the UI.
- **Data Consistency**: Used memoized callbacks to ensure that manual refreshes and automatic timers don't conflict or cause race conditions.

---
*Built for the Finance & React Capstone Project.*
