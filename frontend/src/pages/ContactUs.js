// --- START OF FILE ContactUs.js ---
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import styled from 'styled-components';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending data to an API
    console.log(formData);
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <ContactUsContainer>
      <Container>
        <ContactUsHeading
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </ContactUsHeading>

        <ContactUsGrid>
          {/* Contact Information */}
          <ContactInfoContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactInfoHeader>Get in Touch</ContactInfoHeader>
            <ContactInfo>
              <ContactIcon as={FaEnvelope} />
              <ContactText>support@healthplus.com</ContactText>
            </ContactInfo>
             <ContactInfo>
              <ContactIcon as={FaPhone} />
              <ContactText>+1 (555) 123-4567</ContactText>
            </ContactInfo>
              <ContactInfo>
              <ContactIcon as={FaMapMarkerAlt} />
              <ContactText>123 Healthcare Street, Medical City, HC 12345</ContactText>
            </ContactInfo>
          </ContactInfoContainer>

          {/* Contact Form */}
           <ContactFormContainer
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ContactFormHeader>Send Us a Message</ContactFormHeader>
            <ContactForm onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </InputGroup>
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </SubmitButton>
            </ContactForm>
          </ContactFormContainer>
        </ContactUsGrid>
      </Container>
    </ContactUsContainer>
  );
};

export default ContactUs;

const ContactUsContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 2rem 1rem;
      @media (min-width: 640px) {
     padding: 2rem;
    }
`;

const Container = styled.div`
    max-width: 80rem;
    margin: 0 auto;
      padding: 0 1rem;
`;

const ContactUsHeading = styled(motion.h1)`
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
    text-align: center;
    margin-bottom: 3rem;
      @media (min-width: 640px) {
        font-size: 2.5rem;
    }
`;

const ContactUsGrid = styled.div`
    display: grid;
     grid-template-columns: 1fr;
     gap: 3rem;
        @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const ContactInfoContainer = styled(motion.div)`
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
     box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const ContactInfoHeader = styled.h2`
   font-size: 1.5rem;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
    align-items: center;
  gap: 1rem;
      margin-bottom: 1rem;
`;

const ContactIcon = styled.div`
   font-size: 1.25rem;
    color: #ffc107;
`;

const ContactText = styled.p``;


const ContactFormContainer = styled(motion.div)`
     background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
     box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const ContactFormHeader = styled.h2`
   font-size: 1.5rem;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 1.5rem;
`;

const ContactForm = styled.form`
    display: flex;
     flex-direction: column;
    gap: 1rem;
`;


const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
    width: 100%;
      &:focus {
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      border-color: #007bff;
      }
`;


const TextArea = styled.textarea`
   padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
     width: 100%;
        &:focus {
       box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      border-color: #007bff;
    }
`;

const SubmitButton = styled(motion.button)`
    background-color: #007bff;
    color: #fff;
     font-weight: 600;
  padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
     cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;