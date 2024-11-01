import React from 'react';

const CircularProgress = ({ value, size, className }) => {
    const radius = 16; 
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg
            className={`relative ${className}`}
            width={size}
            height={size}
        >
            <circle
                stroke="#e0e0e0"
                fill="transparent"
                strokeWidth="3"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                stroke={value === 100 ? '#4CAF50' : '#FF5903'}
                fill="transparent"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transition: 'stroke-dashoffset 0.35s ease-in-out' }}
            />
        </svg>
    );
};

export default CircularProgress;
