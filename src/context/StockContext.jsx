import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState(() => {
        const savedStocks = localStorage.getItem('portfolio_stocks');
        return savedStocks ? JSON.parse(savedStocks) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // AlphaVantage API configuration
    const API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY || 'demo';
    const BASE_URL = 'https://www.alphavantage.co/query';

    console.log('StockProvider: API Key loaded:', API_KEY === 'demo' ? 'DEMO MODE' : 'CUSTOM KEY DETECTED');

    const fetchCurrentPrice = useCallback(async (symbol) => {
        try {
            const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            console.log(`API Response for ${symbol}:`, data);

            if (data['Note']) {
                console.warn('AlphaVantage Rate Limit reached:', data['Note']);
                return { error: 'rate-limit', message: 'Rate limit reached. Please wait a minute.' };
            }

            if (data['Error Message']) {
                console.error('AlphaVantage API Error (Invalid Symbol):', data['Error Message']);
                return { error: 'invalid-symbol', message: 'Invalid stock symbol.' };
            }

            if (data['Information']) {
                console.info('AlphaVantage Information:', data['Information']);
                return { error: 'info', message: data['Information'] };
            }

            if (data['Global Quote'] && data['Global Quote']['05. price']) {
                return { price: parseFloat(data['Global Quote']['05. price']) };
            }

            // If Global Quote exists but is empty, it's likely an invalid symbol
            if (data['Global Quote'] && Object.keys(data['Global Quote']).length === 0) {
                return { error: 'invalid-symbol', message: 'Symbol not found.' };
            }

            console.warn(`No price data found for ${symbol}`);
            return { error: 'unknown', message: 'Could not retrieve price data.' };
        } catch (err) {
            console.error(`Network or Parsing error fetching price for ${symbol}:`, err);
            return { error: 'network', message: 'Network error.' };
        }
    }, [API_KEY, BASE_URL]);

    const validateAndAddStock = async (newStock) => {
        setLoading(true);
        setError(null);

        // Always provide a unique ID if not present
        const stockToAdd = {
            ...newStock,
            id: newStock.id || Date.now(),
            currentPrice: null,
            lastUpdated: null,
            isDemoData: false
        };

        try {
            const result = await fetchCurrentPrice(newStock.symbol);

            if (result.price !== undefined) {
                // Success case
                const stockWithPrice = {
                    ...stockToAdd,
                    currentPrice: result.price,
                    lastUpdated: new Date().toISOString()
                };
                setStocks(prev => [...prev, stockWithPrice]);
                setLoading(false);
                return true;
            } else if (result.error === 'rate-limit') {
                // Rate limit case - still add but show warning
                setError(`API limit reached. ${newStock.symbol} added, but price will update later.`);
                setStocks(prev => [...prev, stockToAdd]);
                setLoading(false);
                return true;
            } else if (result.error === 'invalid-symbol') {
                // Only case where we actually block the add
                setError(`Symbol "${newStock.symbol}" not found. Please check and try again.`);
                setLoading(false);
                return false;
            } else {
                // Any other error (network, etc) - add it anyway so user sees progress
                console.warn('API error during add, using fallback:', result.message);
                setError(`Added ${newStock.symbol}, but couldn't get current price right now.`);
                setStocks(prev => [...prev, stockToAdd]);
                setLoading(false);
                return true;
            }
        } catch (err) {
            console.error('Error in validateAndAddStock:', err);
            setError('Connection issue. Stock added to dashboard but price is pending.');
            setStocks(prev => [...prev, stockToAdd]);
            setLoading(false);
            return true;
        }
    };

    const updateAllPrices = useCallback(async () => {
        if (stocks.length === 0) return;

        const updatedStocks = await Promise.all(stocks.map(async (stock) => {
            const result = await fetchCurrentPrice(stock.symbol);
            if (result.price !== undefined) {
                return { ...stock, currentPrice: result.price, lastUpdated: new Date().toISOString(), isDemoData: false };
            }
            return stock;
        }));

        setStocks(updatedStocks);
    }, [stocks, fetchCurrentPrice]);

    const [autoRefresh, setAutoRefresh] = useState(false); // Default to off to save API calls

    const toggleAutoRefresh = () => {
        setAutoRefresh(prev => !prev);
    };

    // Update prices when component mounts and on interval if enabled
    useEffect(() => {
        if (!autoRefresh) return;

        console.log('Auto-refresh enabled: starting 5-minute interval');
        const interval = setInterval(() => {
            updateAllPrices();
        }, 300000); // 5 minutes

        return () => {
            console.log('Auto-refresh disabled or clearing interval');
            clearInterval(interval);
        };
    }, [updateAllPrices, autoRefresh]);

    const removeStock = (id) => {
        setStocks(prev => prev.filter(stock => stock.id !== id));
    };

    // Keep localStorage in sync with state
    useEffect(() => {
        localStorage.setItem('portfolio_stocks', JSON.stringify(stocks));
    }, [stocks]);

    return (
        <StockContext.Provider value={{
            stocks,
            addStock: validateAndAddStock,
            removeStock,
            loading,
            error,
            updateAllPrices,
            autoRefresh,
            toggleAutoRefresh
        }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStocks = () => {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStocks must be used within a StockProvider');
    }
    return context;
};
