import React, { useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// Apply fadeInOut animation to LoadingText
const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #E8EAF3 10%, #A0B7E1 40%, #4A79D1 90%);
`;

const LoadingText = styled.h1`
  font-size: 60px;
  color: #333;
  margin-bottom: 30px;
  animation: ${fadeInOut} 2s infinite; // Apply fadeInOut animation
`;

const Spinner = styled.div.attrs(() => ({ 'data-testid': 'spinner' }))`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #6c63ff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize scores and log it
  const scores = useMemo(() => {
    const computedScores = location.state?.scores || {};
    console.log("Scores:", computedScores); // Log scores to confirm its value
    return computedScores;
  }, [location.state?.scores]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result", { state: { scores } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, scores]);

  return (
    <Page>
      <LoadingText>What type will it be? 🤔</LoadingText>
      <Spinner />
    </Page>
  );
}

export default LoadingPage;
