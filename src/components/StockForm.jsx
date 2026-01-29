import React, { useState } from 'react';
import { useStocks } from '../context/StockContext';
import './StockForm.css';

const StockForm = () => {
    const { addStock, loading, error } = useStocks();
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symbol || !quantity || !price) return;

        const success = await addStock({
            symbol: symbol.toUpperCase(),
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            id: Date.now()
        });

        if (success) {
            // Reset form
            setSymbol('');
            setQuantity('');
            setPrice('');
        }
    };

    return (
        <div className="stock-form-container glass-card">
            <h2 className="form-title">Add New Stock</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="stock-form">
                <div className="form-group">
                    <label className="label">Stock Symbol</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. AAPL"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="label">Quantity</label>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="0"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="0"
                            step="any"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Purchase Price</label>
                        <input
                            type="number"
                            className="input-field"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            disabled={loading}
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={loading}>
                    {loading ? 'Validating...' : 'Add Stock to Dashboard'}
                </button>
            </form>
        </div>
    );
};

export default StockForm;
