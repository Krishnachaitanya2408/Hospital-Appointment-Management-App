// --- START OF FILE NotFound.js ---
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundSection>
      <NotFoundContent>
        <ErrorCode>
          404
        </ErrorCode>
        <ErrorMessage>
          {"Something's missing."}
        </ErrorMessage>
        <ErrorDescription>
          {
            " Sorry, we can't find that page. You'll find lots to explore on the home page."
          }
        </ErrorDescription>
        <HomeButton to={"/"}>
          Back to Homepage
        </HomeButton>
      </NotFoundContent>
    </NotFoundSection>
  );
};

export default NotFound;

const NotFoundSection = styled.section`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const NotFoundContent = styled.div`
    padding: 2rem 1rem;
    max-width: 40rem;
    text-align: center;
    margin: 0 auto;
`;

const ErrorCode = styled.h1`
    font-size: 4rem;
    font-weight: bold;
    color: #28a745;
      @media (min-width: 640px) {
        font-size: 6rem;
    }
`;

const ErrorMessage = styled.p`
    font-size: 1.875rem;
    font-weight: bold;
    color: #374151;
        margin-bottom: 1rem;
       @media (min-width: 640px) {
        font-size: 2.25rem;
    }
`;

const ErrorDescription = styled.p`
    font-size: 1rem;
    font-weight: 300;
    color: #4b5563;
    margin-bottom: 1rem;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #28a745, #218838);
    color: #fff;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
     font-size: 0.875rem;
     font-weight: 500;
      transition: background-color 0.3s ease-in-out;
`;