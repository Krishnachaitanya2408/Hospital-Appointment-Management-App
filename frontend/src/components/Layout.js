// --- START OF FILE Layout.js ---
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
      <LayoutContainer>
          <Navbar />
          <MainContent>
              {children}
          </MainContent>
          <Footer />
      </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
`;