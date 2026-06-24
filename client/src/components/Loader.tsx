import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  onFinished: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onFinished }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [theme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Start fading out after 1.8 seconds
    const fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    // Call onFinished after fadeout completes (0.5s)
    const finishTimeout = setTimeout(() => {
      onFinished();
    }, 2300);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinished]);

  return (
    <StyledWrapper className={isFadingOut ? 'fade-out' : ''} $theme={theme}>
      <div className="loader">
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
        <div className="bar4" />
        <div className="bar5" />
        <div className="bar6" />
        <div className="bar7" />
        <div className="bar8" />
        <div className="bar9" />
        <div className="bar10" />
        <div className="bar11" />
        <div className="bar12" />
      </div>
    </StyledWrapper>
  );
};

const fade458 = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
`;

const fadeOutAnim = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const StyledWrapper = styled.div<{ $theme: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* Set background dynamically depending on theme: white for light theme, dark for dark theme */
  background-color: ${props => props.$theme === 'light' ? '#ffffff' : '#0c0c0e'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  transition: background-color 0.3s ease;
  
  &.fade-out {
    animation: ${fadeOutAnim} 0.5s forwards ease-in-out;
  }

  .loader {
    position: relative;
    width: 54px;
    height: 54px;
    border-radius: 10px;
  }

  .loader div {
    width: 8%;
    height: 24%;
    /* Vibrant brand orange, perfectly visible on both white and dark backgrounds */
    background: var(--orange);
    position: absolute;
    left: 50%;
    top: 30%;
    opacity: 0;
    border-radius: 50px;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
    animation: ${fade458} 1s linear infinite;
  }

  .loader .bar1 {
    transform: rotate(0deg) translate(0, -130%);
    animation-delay: 0s;
  }

  .loader .bar2 {
    transform: rotate(30deg) translate(0, -130%);
    animation-delay: -1.1s;
  }

  .loader .bar3 {
    transform: rotate(60deg) translate(0, -130%);
    animation-delay: -1s;
  }

  .loader .bar4 {
    transform: rotate(90deg) translate(0, -130%);
    animation-delay: -0.9s;
  }

  .loader .bar5 {
    transform: rotate(120deg) translate(0, -130%);
    animation-delay: -0.8s;
  }

  .loader .bar6 {
    transform: rotate(150deg) translate(0, -130%);
    animation-delay: -0.7s;
  }

  .loader .bar7 {
    transform: rotate(180deg) translate(0, -130%);
    animation-delay: -0.6s;
  }

  .loader .bar8 {
    transform: rotate(210deg) translate(0, -130%);
    animation-delay: -0.5s;
  }

  .loader .bar9 {
    transform: rotate(240deg) translate(0, -130%);
    animation-delay: -0.4s;
  }

  .loader .bar10 {
    transform: rotate(270deg) translate(0, -130%);
    animation-delay: -0.3s;
  }

  .loader .bar11 {
    transform: rotate(300deg) translate(0, -130%);
    animation-delay: -0.2s;
  }

  .loader .bar12 {
    transform: rotate(330deg) translate(0, -130%);
    animation-delay: -0.1s;
  }
`;

export default Loader;
