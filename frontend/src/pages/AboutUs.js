// --- START OF FILE AboutUs.js ---
import React from 'react';
import { FaHeartbeat, FaCogs, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import motion for animation
// import profilePic from '../assets/profile-pic.jpeg'; // Import the profile picture
import styled from 'styled-components';

const AboutUs = () => {
  const features = [
    {
      icon: FaHeartbeat,
      title: 'Our Mission',
      description: 'To deliver healthcare solutions that ensure better patient care through efficiency and technological advancement.',
    },
    {
      icon: FaCogs,
      title: 'Our Vision',
      description: 'We aim to revolutionize healthcare management by developing tools that healthcare professionals can rely on.',
    },
    {
      icon: FaUsers,
      title: 'Our Values',
      description: 'We are dedicated to providing innovative, reliable, and user-friendly solutions for healthcare providers worldwide.',
    },
  ];

  return (
    <AboutUsContainer>
      {/* Hero Section */}
        <HeroSection>
            <HeroHeading>About Us</HeroHeading>
          <HeroDescription>
            Health Plus- Hospital Management System is a cutting-edge solution designed to streamline healthcare operations and improve patient care.
          </HeroDescription>
           <HeroDescription>
            Our mission is to revolutionize healthcare management through innovative technology solutions that enhance efficiency, reduce errors, and improve patient outcomes.
          </HeroDescription>
        </HeroSection>

      {/* Mission, Vision, Values Section */}
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <FeatureIcon as={feature.icon} />
            <FeatureTitle>
              {feature.title}
            </FeatureTitle>
            <FeatureDescription>
              {feature.description}
            </FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      {/* Team Section
        <TeamSection>
             <TeamHeading>Meet Our Team</TeamHeading>
           <TeamMember
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
           >
                <TeamImage src={profilePic} alt="Team Member" />
              <TeamName>Yazdan Haider</TeamName>
            <TeamRole>Full Stack Developer</TeamRole>
           </TeamMember>
        </TeamSection> */}
    </AboutUsContainer>
  );
};

export default AboutUs;

const AboutUsContainer = styled.div`
    max-width: 80rem;
    margin: 0 auto;
     padding: 2rem 1rem;
    @media (min-width: 640px) {
         padding: 2rem;
    }
`;

const HeroSection = styled.div`
    background-color: #f5f5f5;
    padding: 2rem;
    border-radius: 0.5rem;
     margin-bottom: 2rem;
`;

const HeroHeading = styled.h1`
  font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    color: #007bff;
`;


const HeroDescription = styled.p`
    font-size: 1rem;
        color: #4a5568;
        text-align: center;
         margin-bottom: 1rem;
`;


const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
      margin-bottom: 2rem;
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;


const FeatureCard = styled(motion.div)`
    background-color: #fff;
    padding: 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
     text-align: center;
     transition: transform 0.3s ease-in-out;
     &:hover {
       transform: translateY(-0.625rem);
     }
`;


const FeatureIcon = styled.div`
  font-size: 3rem;
    color: #ffc107;
    margin-bottom: 1rem;
     display: block;
      margin-left: auto;
      margin-right: auto;
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
    font-weight: 600;
        color: #007bff;
    margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
    color: #4a5568;
    font-size: 1rem;
`;

// const TeamSection = styled.div`
//     background-color: #f5f5f5;
//     padding: 2rem;
//     border-radius: 0.5rem;
//     margin-bottom: 2rem;
//       display: flex;
//          flex-direction: column;
//     align-items: center;
// `;

// const TeamHeading = styled.h2`
//    font-size: 1.875rem;
//     font-weight: bold;
//     text-align: center;
//     margin-bottom: 1rem;
//     color: #007bff;
// `;

// const TeamMember = styled(motion.div)`
//    background-color: #fff;
//     padding: 1.5rem;
//     border-radius: 0.5rem;
//     box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
//     text-align: center;
//       border: 1px solid #ffc107;
//        max-width: 28rem;
// `;


// const TeamImage = styled.img`
//     width: 12rem;
//     height: 12rem;
//     border-radius: 50%;
//     object-fit: cover;
//      margin: 0 auto 1rem;
//       display: block;
// `;


// const TeamName = styled.h3`
//  font-size: 1.25rem;
//   font-weight: 600;
//   color: #007bff;
//   margin-bottom: 0.5rem;
// `;


// const TeamRole = styled.p`
//  color: #4a5568;
//   font-size: 1.125rem;
// `;