// --- START OF FILE Services.js ---
import React from 'react';
import styled from 'styled-components';

const Services = () => {
  return (
    <ServicesContainer>
      <ServicesHeading>Our Services</ServicesHeading>
      <ServicesList>
        <ServicesListItem>Patient Management</ServicesListItem>
        <ServicesListItem>Appointment Scheduling</ServicesListItem>
        <ServicesListItem>Electronic Health Records (EHR)</ServicesListItem>
        <ServicesListItem>Billing and Invoicing</ServicesListItem>
        <ServicesListItem>Inventory Management</ServicesListItem>
        <ServicesListItem>Staff Management</ServicesListItem>
        <ServicesListItem>Reporting and Analytics</ServicesListItem>
        <ServicesListItem>Telemedicine Integration</ServicesListItem>
      </ServicesList>
    </ServicesContainer>
  );
};

export default Services;

const ServicesContainer = styled.div`
    max-width: 80rem;
    margin: 0 auto;
       padding: 2rem 1rem;
      @media (min-width: 640px) {
          padding: 2rem;
      }
`;

const ServicesHeading = styled.h1`
     font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1rem;
      @media (min-width: 640px) {
          font-size: 2.25rem;
    }
`;


const ServicesList = styled.ul`
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    color: #4a5568;
`;


const ServicesListItem = styled.li`
    margin-bottom: 0.5rem;
`;