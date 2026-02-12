import React, { useEffect } from 'react';
import { useStocks } from '../context/StockContext';
import StockCard from './StockCard';
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
                    {/* Component Composition: StockCard receives data via props */}
                    {stocks.map((stock) => (
                        <StockCard
                            key={stock.id}
                            stock={stock}
                            onRemove={removeStock}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StockList;
