import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
`;

const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border: 3.5px solid rgba(255, 107, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--orange, #ff6b00);
  animation: ${spin} 0.8s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
`;

const PageLoader: React.FC = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);

export default PageLoader;
