import { useStocks } from './context/StockContext';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import './App.css';

function App() {
  const { stocks } = useStocks();

  const totalPortfolioValue = stocks.reduce((acc, stock) => {
    const priceToUse = stock.currentPrice !== null && stock.currentPrice !== undefined ? stock.currentPrice : stock.price;
    return acc + (stock.quantity * priceToUse);
  }, 0);

  const totalUnrealizedPL = stocks.reduce((acc, stock) => {
    if (stock.currentPrice === null || stock.currentPrice === undefined) return acc;
    const profitLoss = (stock.currentPrice - stock.price) * stock.quantity;
    return acc + profitLoss;
  }, 0);

  const isPLPositive = totalUnrealizedPL >= 0;

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header animate-fade-in">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo-text">Stock <span>Tracker</span></h1>
            <p className="tagline">Real-time Portfolio Intelligence</p>
          </div>
          <div className="header-widgets">
            <div className="portfolio-summary glass-card">
              <span className="summary-label">Total Value</span>
              <span className="summary-value">${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="portfolio-summary glass-card">
              <span className="summary-label">Total P&L</span>
              <span className={`summary-value ${isPLPositive ? 'positive' : 'negative'}`}>
                {isPLPositive ? '+' : ''}${Math.abs(totalUnrealizedPL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="form-section">
          <StockForm />
        </section>

        <section className="list-section">
          <StockList />
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2024 Stock Tracker Dashboard. Built for premium portfolio tracking.</p>
      </footer>
    </div>
  );
}

export default App;

