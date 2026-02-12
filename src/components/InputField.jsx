import React from 'react';

/**
 * InputField - A reusable form input component.
 * Demonstrates component composition via props (parent configures each field).
 *
 * Props:
 *   - label: string — the label text
 *   - type: string — input type (text, number)
 *   - placeholder: string — placeholder text
 *   - value: string — controlled input value
 *   - onChange: (e) => void — change handler
 *   - required: boolean — whether the field is required
 *   - disabled: boolean — whether the field is disabled
 *   - min: string — minimum value (for number inputs)
 *   - step: string — step value (for number inputs)
 */
const InputField = ({ label, type, placeholder, value, onChange, required, disabled, min, step }) => {
    return (
        <div className="form-group">
            <label className="label">{label}</label>
            <input
                type={type}
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                min={min}
                step={step}
            />
        </div>
    );
};

export default InputField;
