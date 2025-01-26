import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHospital, FaUserMd, FaCalendarCheck, FaHeartbeat, FaAmbulance, FaLaptopMedical } from 'react-icons/fa';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const Home = () => {
    const features = [
        { icon: FaHospital, title: 'State-of-the-art Facilities', description: 'Experience healthcare in our modern, well-equipped facilities.' },
        { icon: FaUserMd, title: 'Expert Medical Staff', description: 'Our team of experienced doctors and nurses provide top-notch care.' },
        { icon: FaCalendarCheck, title: 'Easy Appointments', description: 'Book and manage your appointments with just a few clicks.' },
        { icon: FaHeartbeat, title: "Comprehensive Care", description: "From preventive care to complex treatments, we've got you covered." },
        { icon: FaAmbulance, title: '24/7 Emergency Services', description: 'Round-the-clock emergency care for your peace of mind.' },
        { icon: FaLaptopMedical, title: 'Telemedicine', description: 'Get expert medical advice from the comfort of your home.' },
    ];
    const testimonials = [
      {
          name: "John Doe",
          text: "Health Plus has revolutionized how I manage my healthcare. It's so easy to use!",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
          name: "Jane Smith",
          text: "I love how I can access all my medical information in one place. Great job, Health Plus!",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
          name: "Mike Johnson",
          text: "Booking appointments has never been easier. Health Plus is a game-changer!",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
          name: "Emily Davis",
          text: "The staff is incredibly helpful and caring. I highly recommend Health Plus!",
          image: "https://randomuser.me/api/portraits/women/25.jpg",
      },
      {
          name: "James Wilson",
          text: "The platform is user-friendly and has made my life so much easier!",
          image: "https://randomuser.me/api/portraits/men/15.jpg",
      },
      {
          name: "Mary Brown",
          text: "I appreciate the convenience of managing everything online. Thank you, Health Plus!",
          image: "https://randomuser.me/api/portraits/women/13.jpg",
      },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows:false,
};

const images = [
  {
      src: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Modern Hospital",
  },
  
  {
      src: "https://i.ytimg.com/vi/XCxz9yyEkmg/maxresdefault.jpg",
      alt: "Patient Care",
  },
  {
    src: "https://5.imimg.com/data5/SELLER/Default/2021/10/YI/WX/NZ/30422219/hospitality-interior-design-service-1000x1000.jpg",
    alt: "Patient Care",
},
];



    return (
      <HomeContainer>
        <HeroSection>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to Health Plus
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your Advanced Healthcare Management Solution
            </HeroSubtitle>
            <Link to="/signup">
              <HeroButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </HeroButton>
            </Link>
          </HeroContent>
        </HeroSection>

        <FeaturesSection>
          <Container>
            <FeaturesHeading>
              Our Features
            </FeaturesHeading>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.01 }}
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
          </Container>
        </FeaturesSection>

        <AboutUsSection>
  <Container>
    <AboutUsFlex>
      <AboutUsImageContainer>
        <StyledSlider {...{...sliderSettings, arrows: false}}>
          {images.map((image, index) => (
            <AboutUsImageWrapper key={index}>
              <AboutUsImage
                src={image.src}
                alt={image.alt}
              />
            </AboutUsImageWrapper>
          ))}
        </StyledSlider>
      </AboutUsImageContainer>
      <AboutUsContent>
        <AboutUsHeading>
          About Health Plus
        </AboutUsHeading>
        <AboutUsText>
          Health Plus is a cutting-edge healthcare management system
          designed to streamline medical processes and enhance patient
          care. Our platform integrates advanced technology with medical
          expertise to provide a seamless experience for both healthcare
          providers and patients.
        </AboutUsText>
        <AboutUsText>
          With Health Plus, you can easily manage appointments, access
          medical records, and communicate with your healthcare team.
          We're committed to improving healthcare accessibility and
          efficiency, ensuring that you receive the best possible care.
        </AboutUsText>
        <Link to="/about-us">
          <AboutUsButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </AboutUsButton>
        </Link>
      </AboutUsContent>
    </AboutUsFlex>
  </Container>
</AboutUsSection>

        <TestimonialsSection>
          <Container>
            <TestimonialsHeading>
                What Our Patients Say
            </TestimonialsHeading>
            <StyledSlider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgb(255 203 116)" }}
                    >
                        <TestimonialImage
                            src={testimonial.image}
                            alt={testimonial.name}
                        />
                        <TestimonialText>
                            "{testimonial.text}"
                        </TestimonialText>
                        <TestimonialName>
                            - {testimonial.name}
                        </TestimonialName>
                    </TestimonialCard>
                ))}
            </StyledSlider>
        </Container>
    </TestimonialsSection>


        <CallToActionSection>
          <Container>
            <CallToActionContent>
                <CallToActionHeading>Ready to Get Started?</CallToActionHeading>
                <CallToActionText>
                    Join Health Plus today and experience the future of healthcare
                    management.
                </CallToActionText>
                <Link to="/signup">
                  <CallToActionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up Now
                  </CallToActionButton>
                </Link>
            </CallToActionContent>
          </Container>
        </CallToActionSection>
      </HomeContainer>
    );
};

export default Home;


const HomeContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const HeroSection = styled.section`
    background-color: #007bff;
  color: #f8f9fa;
    padding: 3rem 1rem;
     border-radius: 1.5rem;
    margin: 1rem;
    @media (min-width: 640px) {
    padding: 5rem 1rem;
    margin: 1rem 2rem;
  }
`;

const HeroContent = styled.div`
    max-width: 80rem;
    margin: 0 auto;
      text-align: center;
`;

const HeroTitle = styled(motion.h1)`
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1rem;
      @media (min-width: 640px) {
    font-size: 2.25rem;
    }
        @media (min-width: 768px) {
    font-size: 3rem;
    }
        @media (min-width: 1024px) {
    font-size: 3.75rem;
    }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1rem;
    margin-bottom: 2rem;
  @media (min-width: 640px) {
        font-size: 1.125rem;
    }
  
`;

const HeroButton = styled(motion.button)`
  background-color: #ffc107;
  color: #007bff;
    font-weight: bold;
  padding: 0.75rem 1.5rem;
    border-radius: 1.5rem;
        transition: background-color 0.3s ease-in-out;
    &:hover {
         background-color: #f7d05b;
     }
`;

const FeaturesSection = styled.section`
  padding: 3rem 1rem;
  @media (min-width: 640px) {
   padding: 5rem 1rem;
  }
`;

const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
     @media (min-width: 640px) {
         padding: 0;
    }
`;

const FeaturesHeading = styled.h2`
  font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #007bff;
    @media (min-width: 640px) {
    font-size: 2.25rem;
    }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }
     @media (min-width: 1024px) {
       grid-template-columns: repeat(3, 1fr);
    }
`;

const FeatureCard = styled(motion.div)`
  background-color: #fff;
    padding: 1.5rem;
  border-radius: 1.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      text-align: center;
       transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-0.625rem);
    }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
    color: #ffc107;
    margin-bottom: 1rem;
        display: block;
      margin-left: auto;
      margin-right: auto;
`;

const FeatureTitle = styled.h3`
  font-size: 1rem;
    font-weight: 600;
    color: #007bff;
     margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const AboutUsSection = styled.section`
  background-color: #fff;
    padding: 5rem 0;
`;

const AboutUsFlex = styled.div`
    display: flex;
    flex-direction: column;
      @media (min-width: 768px) {
       flex-direction: row;
    }
   align-items: stretch;
`;

const AboutUsImageContainer = styled.div`
    margin-bottom: 2rem;
    @media (min-width: 768px) {
    margin-bottom: 0;
       width: 50%;
    }
`;

const StyledSlider = styled(Slider)`
     .slick-dots {
     bottom: 0px;
     li button:before {
    color: black;
    font-size: 0.75rem;
     }
    li.slick-active button:before {
       color: black;
    }
 }
`;

const AboutUsImageWrapper = styled.div`
     border-radius: 1.5rem;
    overflow: hidden;
`;

const AboutUsImage = styled.img`
    width: 100%;
    height: 25rem;
      object-fit: cover;
`;

const AboutUsContent = styled.div`
      @media (min-width: 768px) {
     padding-left: 2rem;
       width: 50%;
           display: flex;
         flex-direction: column;
          justify-content: space-between;
    }
`;

const AboutUsHeading = styled.h2`
  font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #007bff;
      @media (min-width: 768px) {
       text-align: left;
    }
`;

const AboutUsText = styled.p`
  color: #6b7280;
    margin-bottom: 1rem;
    font-size: 1.1rem;
      font-family: 'Montserrat', sans-serif;
`;

const AboutUsButton = styled(motion.button)`
    background-color: #ffc107;
  color: #007bff;
    font-weight: bold;
  padding: 0.75rem 1.5rem;
    border-radius: 1.5rem;
        transition: background-color 0.3s ease-in-out;
    &:hover {
         background-color: #f7d05b;
     }
`;

const TestimonialsSection = styled.section`
  background-color: #f0f0f0;
  padding: 5rem 0;
`;

const TestimonialsHeading = styled.h2`
  font-size: 1.875rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
    color: #007bff;
`;

const TestimonialCard = styled(motion.div)`
  background-color: #fff;
    padding: 1.5rem;
    border-radius: 1rem;
    height: 20rem;
    width: 15rem;
    margin: 0 0.5rem;
     cursor: pointer;
     transition: all 0.3s ease-out;
`;

const TestimonialImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
      margin: 0 auto 1rem;
      display: block;
`;

const TestimonialText = styled.p`
  color: #6b7280;
    margin-bottom: 1rem;
        text-align: center;
          font-size: 0.875rem;
`;

const TestimonialName = styled.p`
  font-weight: 600;
    color: #007bff;
        text-align: center;
`;

const CallToActionSection = styled.section`
  background-color: #007bff;
  color: #f8f9fa;
   padding: 5rem 1rem;
  border-radius: 1.5rem;
    margin: 1rem;
      @media (min-width: 640px) {
         margin: 1rem 2rem;
    }
`;

const CallToActionContent = styled.div`
    max-width: 80rem;
    margin: 0 auto;
      text-align: center;
`;

const CallToActionHeading = styled.h2`
 font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 1rem;
     @media (min-width: 640px) {
         font-size: 2.25rem;
    }
`;

const CallToActionText = styled.p`
    margin-bottom: 2rem;
`;

const CallToActionButton = styled(motion.button)`
    background-color: #ffc107;
  color: #007bff;
    font-weight: bold;
  padding: 0.75rem 1.5rem;
    border-radius: 1.5rem;
        transition: background-color 0.3s ease-in-out;
    &:hover {
         background-color: #f7d05b;
     }
`;