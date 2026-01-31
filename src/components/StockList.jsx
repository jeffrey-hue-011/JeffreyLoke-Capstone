import React, { useEffect } from 'react';
import { useStocks } from '../context/StockContext';
import './StockList.css';

const StockList = () => {
    const { stocks, updateAllPrices, removeStock, loading, autoRefresh, toggleAutoRefresh } = useStocks();

    useEffect(() => {
        updateAllPrices();
    }, []);

    const handleRefresh = () => {
        updateAllPrices();
    };

    return (
        <div className="stock-list-container glass-card">
            <div className="section-header">
                <div className="title-group">
                    <h2 className="section-title">Your Portfolio</h2>
                    <div className="refresh-controls">
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={autoRefresh}
                                onChange={toggleAutoRefresh}
                            />
                            <span className="slider round"></span>
                            <span className="toggle-label">Auto-Refresh (5m)</span>
                        </label>
                    </div>
                </div>
                <button
                    onClick={handleRefresh}
                    className="refresh-btn"
                    disabled={loading || stocks.length === 0}
                >
                    {loading ? 'Updating...' : 'Refresh Now'}
                </button>
            </div>
            {stocks.length === 0 ? (
                <div className="empty-state-container">
                    <p className="empty-state">No stocks added yet.</p>
                    <p className="empty-subtitle">Use the form to start tracking your investments.</p>
                </div>
            ) : (
                <div className="stocks-grid">
                    {stocks.map((stock) => {
                        const hasCurrentPrice = stock.currentPrice !== null && stock.currentPrice !== undefined;
                        const currentVal = hasCurrentPrice ? stock.currentPrice : null;
                        const profitLoss = hasCurrentPrice ? (currentVal - stock.price) * stock.quantity : null;
                        const isPositive = profitLoss !== null ? profitLoss >= 0 : null;

                        return (
                            <div key={stock.id} className="stock-card animate-slide-in">
                                <button
                                    className="delete-btn"
                                    onClick={() => removeStock(stock.id)}
                                    title="Remove Stock"
                                >
                                    &times;
                                </button>
                                <div className="stock-header">
                                    <span className="stock-symbol">{stock.symbol}</span>
                                    <span className="stock-shares">{stock.quantity} Shares</span>
                                </div>
                                <div className="stock-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Buy Price</span>
                                        <span className="detail-value">${stock.price.toFixed(2)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Current Price</span>
                                        <span className="detail-value highlight">
                                            {hasCurrentPrice ? `$${currentVal.toFixed(2)}` : 'Awaiting Data'}
                                        </span>
                                    </div>
                                    <div className="detail-item portal-item">
                                        <span className="detail-label">Profit/Loss</span>
                                        {hasCurrentPrice ? (
                                            <span className={`detail-value ${isPositive ? 'positive' : 'negative'}`}>
                                                {isPositive ? '+' : ''}${profitLoss.toFixed(2)}
                                            </span>
                                        ) : (
                                            <span className="detail-value muted">---</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StockList;
