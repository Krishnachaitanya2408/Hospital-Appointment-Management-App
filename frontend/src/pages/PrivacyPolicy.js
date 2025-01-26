// --- START OF FILE PrivacyPolicy.js ---
import React from 'react';
import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
      <PrivacyPolicyContainer>
        <PrivacyPolicyHeading>Privacy Policy</PrivacyPolicyHeading>
          <PrivacyPolicyText>
            At Hospital Management System, we are committed to protecting your privacy and ensuring the security of your personal information.
          </PrivacyPolicyText>
           <PrivacyPolicyText>
              This privacy policy outlines how we collect, use, and safeguard your data when you use our services.
          </PrivacyPolicyText>
        {/* Add more detailed privacy policy information here */}
      </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;

const PrivacyPolicyContainer = styled.div`
     max-width: 80rem;
    margin: 0 auto;
       padding: 2rem 1rem;
     @media (min-width: 640px) {
        padding: 2rem;
    }
`;


const PrivacyPolicyHeading = styled.h1`
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1rem;
         @media (min-width: 640px) {
        font-size: 2.25rem;
    }
`;

const PrivacyPolicyText = styled.p`
  margin-bottom: 1rem;
    color: #4a5568;
`;