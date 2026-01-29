import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);
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
                setError('Rate limit reached. Please wait a minute.');
                return null;
            }

            if (data['Error Message']) {
                console.error('AlphaVantage API Error:', data['Error Message']);
                return null;
            }

            if (data['Information']) {
                console.info('AlphaVantage Information:', data['Information']);
                return null;
            }

            if (data['Global Quote'] && data['Global Quote']['05. price']) {
                return parseFloat(data['Global Quote']['05. price']);
            }

            console.warn(`No price data found for ${symbol}`);
            return null;
        } catch (err) {
            console.error(`Network or Parsing error fetching price for ${symbol}:`, err);
            return null;
        }
    }, [API_KEY, BASE_URL]);

    const validateAndAddStock = async (newStock) => {
        setLoading(true);
        setError(null);

        try {
            // Verify if stock is valid by trying to fetch its price
            const currentPrice = await fetchCurrentPrice(newStock.symbol);

            if (currentPrice !== null) {
                const stockWithPrice = {
                    ...newStock,
                    currentPrice: currentPrice,
                    lastUpdated: new Date().toISOString()
                };
                setStocks(prev => [...prev, stockWithPrice]);
                setLoading(false);
                return true;
            } else {
                // FALLBACK: If API is blocked (25 req/day limit), allow adding anyway for testing
                console.info('API unavailable or limit reached. Falling back to Demo Mode for:', newStock.symbol);

                const stockWithPrice = {
                    ...newStock,
                    currentPrice: newStock.price, // Use purchase price as current price for demo
                    lastUpdated: new Date().toISOString(),
                    isDemoData: true
                };

                setStocks(prev => [...prev, stockWithPrice]);
                setLoading(false);
                // Still show a non-intrusive warning
                setError('API limit reached. Added stock in "Demo Mode" using purchase price.');
                return true;
            }
        } catch (err) {
            console.error('Error in validateAndAddStock:', err);
            setError('Failed to add stock. Please check your connection and try again.');
            setLoading(false);
            return false;
        }
    };

    const updateAllPrices = useCallback(async () => {
        if (stocks.length === 0) return;

        const updatedStocks = await Promise.all(stocks.map(async (stock) => {
            const price = await fetchCurrentPrice(stock.symbol);
            if (price !== null) {
                return { ...stock, currentPrice: price, lastUpdated: new Date().toISOString() };
            }
            return stock;
        }));

        setStocks(updatedStocks);
    }, [stocks, fetchCurrentPrice]);

    // Update prices when component mounts and on interval (optional, but requested for list update)
    useEffect(() => {
        const interval = setInterval(() => {
            updateAllPrices();
        }, 300000); // Update every 5 minutes to stay within free tier limits (5 calls/min)

        return () => clearInterval(interval);
    }, [updateAllPrices]);

    return (
        <StockContext.Provider value={{
            stocks,
            addStock: validateAndAddStock,
            loading,
            error,
            updateAllPrices
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
