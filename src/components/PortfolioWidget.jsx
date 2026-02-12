import React from 'react';

/**
 * PortfolioWidget - A reusable summary widget for the dashboard header.
 * Demonstrates component composition via props (parent passes label and value).
 *
 * Props:
 *   - label: string — the widget label (e.g. "Total Value", "Total P&L")
 *   - value: string — the formatted display value
 *   - valueClassName: string (optional) — additional CSS class for the value
 */
const PortfolioWidget = ({ label, value, valueClassName = '' }) => {
    return (
        <div className="portfolio-summary glass-card">
            <span className="summary-label">{label}</span>
            <span className={`summary-value ${valueClassName}`}>{value}</span>
        </div>
    );
};

export default PortfolioWidget;
