import React from 'react';

const CircularProgress = ({ progress }: { progress: number }) => {
    const size = 20
    const radius =8
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg
            className={`w-full h-full`}
            viewBox={`0 0 24 24`}
            fill="none"
        >
            <circle
                className={`stroke-primary text-primary`}
                strokeWidth={2}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
        </svg>
    );
};

export default CircularProgress;