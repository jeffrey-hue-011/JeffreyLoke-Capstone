import React from 'react';

/**
 * StockCard - A reusable component that displays a single stock's information.
 * Demonstrates component composition via props (parent passes stock data down).
 *
 * Props:
 *   - stock: { id, symbol, quantity, price, currentPrice } — the stock object
 *   - onRemove: (id) => void — callback to remove this stock
 */
const StockCard = ({ stock, onRemove }) => {
    const hasCurrentPrice = stock.currentPrice !== null && stock.currentPrice !== undefined;
    const currentVal = hasCurrentPrice ? stock.currentPrice : null;
    const profitLoss = hasCurrentPrice ? (currentVal - stock.price) * stock.quantity : null;
    const isPositive = profitLoss !== null ? profitLoss >= 0 : null;

    return (
        <div className="stock-card animate-slide-in">
            <button
                className="delete-btn"
                onClick={() => onRemove(stock.id)}
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
};

export default StockCard;
