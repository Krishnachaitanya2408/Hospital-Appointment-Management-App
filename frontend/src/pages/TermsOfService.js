// --- START OF FILE TermsOfService.js ---
import React from 'react';
import styled from 'styled-components';

const TermsOfService = () => {
  return (
      <TermsOfServiceContainer>
        <TermsOfServiceHeading>Terms of Service</TermsOfServiceHeading>
        <TermsOfServiceText>
          By using the Hospital Management System, you agree to comply with and be bound by the following terms and conditions of use.
        </TermsOfServiceText>
         <TermsOfServiceText>
          Please review these terms carefully. If you do not agree to these terms, you should not use this service.
         </TermsOfServiceText>
        {/* Add more detailed terms of service information here */}
     </TermsOfServiceContainer>
  );
};

export default TermsOfService;

const TermsOfServiceContainer = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem 1rem;
       @media (min-width: 640px) {
        padding: 2rem;
    }
`;

const TermsOfServiceHeading = styled.h1`
  font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1rem;
       @media (min-width: 640px) {
        font-size: 2.25rem;
    }
`;

const TermsOfServiceText = styled.p`
    margin-bottom: 1rem;
     color: #4a5568;
`;