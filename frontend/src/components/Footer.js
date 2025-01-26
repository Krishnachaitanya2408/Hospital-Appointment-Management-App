// --- START OF FILE Footer.js ---
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaTwitter, href: 'https://x.com/healthplus', color: 'text-blue-400' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/healthplus/', color: 'text-blue-600' },
    { icon: FaInstagram, href: 'https://www.instagram.com/healthplus/', color: 'text-pink-500' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/healthplus', color: 'text-blue-700' },
  ];

  const footerLinks = [
    { title: 'About Us', to: '/about-us' },
    { title: 'Services', to: '/services' },
    { title: 'Privacy Policy', to: '/privacy-policy' },
    { title: 'Terms of Service', to: '/terms-of-service' },
    { title: 'Contact Us', to: '/contact-us' },
  ];

  return (
    <FooterContainer>
        <ContentWrapper>
          <FooterGrid>
            <AboutSection>
                <Heading>Health Plus</Heading>
                <Description>
                Revolutionizing healthcare management with cutting-edge technology and compassionate care.
                </Description>
                <SocialLinks>
                {socialLinks.map((link, index) => (
                    <SocialLink
                    key={index}
                    href={link.href}
                    target="_blank"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    >
                    <SocialIcon as={link.icon} />
                    </SocialLink>
                ))}
                </SocialLinks>
            </AboutSection>
            <LinksSection>
              <LinksGrid>
                {footerLinks.map((link, index) => (
                  <LinkWrapper key={index} whileHover={{ y: -3 }}>
                    <StyledLink to={link.to}>
                      {link.title}
                    </StyledLink>
                  </LinkWrapper>
                ))}
              </LinksGrid>
            </LinksSection>
          </FooterGrid>
          <CopyrightSection>
            <CopyrightText>
              © {currentYear} Health Plus. All rights reserved.
            </CopyrightText>
            <MadeWithText>
              Made with <FaHeart className="text-accent mx-1" /> by Health Plus Team
            </MadeWithText>
          </CopyrightSection>
        </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
    background-color: #343a40;
    color: #f8f9fa;
    font-family: 'Montserrat', sans-serif;
`;

const ContentWrapper = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem 1rem;
    @media (min-width: 768px) {
        padding: 2rem;
    }
`;

const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    @media (min-width: 768px) {
         grid-template-columns: 1fr 2fr;
    }
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Heading = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    color: #ffc107;
`;

const Description = styled.p`
    font-size: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: #f8f9fa;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #ffc107;
  }
`;

const SocialIcon = styled.div`
    font-size: 1.5rem;
`;

const LinksSection = styled.div`
     display: flex;
    align-items: center;
    margin-left: 2rem;
      @media (max-width: 768px) {
         margin-left: 0;
    }
`;


const LinksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
     gap: 1rem;
     @media (min-width: 640px) {
         grid-template-columns: repeat(3, 1fr);
     }
`;

const LinkWrapper = styled(motion.div)`
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    color: #f8f9fa;
    transition: color 0.3s ease-in-out;
    font-size: 0.95rem;
    &:hover {
        color: #ffc107;
    }
`;

const CopyrightSection = styled.div`
    padding-top: 1.5rem;
    border-top: 1px solid #6c757d;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 2rem;
`;

const CopyrightText = styled.p``;

const MadeWithText = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
`;