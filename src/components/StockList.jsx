import React, { useEffect } from 'react';
import { useStocks } from '../context/StockContext';
import './StockList.css';

const StockList = () => {
    const { stocks, updateAllPrices } = useStocks();

    useEffect(() => {
        updateAllPrices();
    }, []);

    return (
        <div className="stock-list-container glass-card">
            <h2 className="section-title">Your Portfolio</h2>
            {stocks.length === 0 ? (
                <p className="empty-state">No stocks added yet. Use the form above to start your portfolio.</p>
            ) : (
                <div className="stocks-grid">
                    {stocks.map((stock) => {
                        const currentVal = stock.currentPrice || stock.price;
                        const profitLoss = (currentVal - stock.price) * stock.quantity;
                        const isPositive = profitLoss >= 0;

                        return (
                            <div key={stock.id} className="stock-card">
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
                                        <span className="detail-value highlight">${currentVal.toFixed(2)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Profit/Loss</span>
                                        <span className={`detail-value ${isPositive ? 'positive' : 'negative'}`}>
                                            {isPositive ? '+' : ''}${profitLoss.toFixed(2)}
                                        </span>
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
