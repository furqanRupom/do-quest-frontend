import * as React from 'react';

interface LogoIconProps {
    width?: number; 
    height?: number;

}
const LogoIcon: React.FunctionComponent<LogoIconProps> = ({ width = 60, height = 60 }) => {
    return <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Main coin bag body */}
        <path
            d="M12 18C12 15 14 13 17 13H23C26 13 28 15 28 18V28C28 32 25 35 20 35C15 35 12 32 12 28V18Z"
            fill="oklch(0.7357 0.1641 34.7091)"
        />

        {/* Drawstring top */}
        <ellipse
            cx="20"
            cy="13"
            rx="6"
            ry="2"
            fill="oklch(0.6357 0.1641 34.7091)"
        />

        {/* Drawstring details */}
        <path
            d="M14 13C14 11.5 16.5 11 20 11C23.5 11 26 11.5 26 13"
            stroke="oklch(0.5357 0.1641 34.7091)"
            strokeWidth="1"
            fill="none"
        />

        {/* Left drawstring */}
        <path
            d="M16 13C16 12 15.5 11.5 15 12C14.5 12.5 14.5 13.5 15 14C15.5 14.5 16 14 16 13Z"
            fill="oklch(0.5357 0.1641 34.7091)"
        />

        {/* Right drawstring */}
        <path
            d="M24 13C24 12 24.5 11.5 25 12C25.5 12.5 25.5 13.5 25 14C24.5 14.5 24 14 24 13Z"
            fill="oklch(0.5357 0.1641 34.7091)"
        />

        {/* Dollar sign - classic money bag style */}
        <path
            d="M20 17L20 15.5M20 28.5L20 27M22.5 19.5C22.5 18.1 21.4 17 20 17C18.6 17 17.5 18.1 17.5 19.5C17.5 20.9 18.6 22 20 22C21.4 22 22.5 23.1 22.5 24.5C22.5 25.9 21.4 27 20 27C18.6 27 17.5 25.9 17.5 24.5"
            stroke="oklch(0.9856 0.0084 56.3169)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
        />

        {/* Bag highlights/shading for dimension */}
        <ellipse
            cx="18"
            cy="20"
            rx="2"
            ry="6"
            fill="oklch(0.8357 0.1241 34.7091)"
            opacity="0.3"
        />

        {/* Bottom curve detail */}
        <path
            d="M16 30C17.5 31.5 18.5 32 20 32C21.5 32 22.5 31.5 24 30"
            stroke="oklch(0.6357 0.1641 34.7091)"
            strokeWidth="0.5"
            fill="none"
        />
    </svg>;
};

export default LogoIcon;