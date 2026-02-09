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
During the development of this capstone, several technical hurdles were encountered and resolved:

- **API Rate Limits (AlphaVantage)**: The AlphaVantage free tier permits only 25 requests per day (and 5 per minute). 
  - **Solution**: Implemented an **Auto-Refresh Toggle** (defaulted to off) and a **5-minute interval** to prevent exhausting credits. I also added a manual "Refresh Now" button so users only fetch data when specifically needed.
- **Invalid Symbol Handling**: Baseline requirements often assume valid input, but real-world users enter typos or non-existent tickers.
  - **Solution**: Created a "Pre-add Validation" step in the `StockContext`. Before a stock is committed to the portfolio, the app performs a lightweight API call to verify the symbol. If invalid, the user receives an immediate error message.
- **Data Persistence**: A common issue with basic React apps is losing state on page refresh.
  - **Solution**: Integrated `localStorage` synchronization within a `useEffect` hook, ensuring the user's portfolio remains intact even after closing the browser.
- **Race Conditions & API Delay**: Rapidly adding stocks could cause state updates to overlap or API calls to hang.
  - **Solution**: Used the `useCallback` hook to memoize fetch functions and managed a global `loading` state to disable inputs during active network requests.

## 🚀 Improvements Beyond Baseline
This version of the Stock Tracker goes significantly beyond the core requirements:

- **Total Unrealized P&L Dashboard**: Added a global header widget that aggregates the cost basis vs. current value for every holding, providing a "big picture" view of portfolio performance.
- **Premium Glassmorphism UI**: Eschewed basic styling for a state-of-the-art dark mode design. Utilized CSS backdrops, gradients, and custom animations to create a high-end, responsive professional feel.
- **Advanced State Management**: Implemented a robust `StockContext` that handles not just the list of stocks, but also global error states, loading transitions, and sync preferences.
- **Dynamic Profit/Loss Indicators**: Built a logic-driven styling system where gains and losses aren't just colored text, but dynamic elements that update visually based on real-time price delta.
- **Portfolio Health Feedback**: Instead of simple error alerts, the UI provides nuanced feedback (e.g., "Rate limit reached - adding with pending price") to keep the user informed without breaking the flow.

---
*Built for the Finance & React Capstone Project.*
