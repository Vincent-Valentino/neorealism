import React from 'react';

const HeroSection = ({text, size}) => {
    return (
        <>
            <style>
                {`
                .hero-title {
                    opacity: 0;
                    transform: scale(0.8);
                    animation: fadeInScaleUp 1.5s ease-out forwards;
                }

                @keyframes fadeInScaleUp {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                `}
            </style>
            <h1 className={`hero-title ${size}`}>{text}</h1>
        </>
    );
};

export default HeroSection;
