import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import styled from 'styled-components';
import Input from "./Input";


const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        file: null,
         userType: "patient"
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/patients/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    gender: "patient",
                    mobile: formData.phoneNumber,
                    age: 20,
                    userType: formData.userType
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => {
                     navigate("/login")
                }, 1000);
            } else {
                setMessage(data.message || 'Failed to create account!');
            }
        } catch (error) {
             console.error("Signup error:", error);
            setMessage('An error occurred while signing up.');
        }

    };

    return (
        <SignupContainer>
            <FormWrapper
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FormHeading>Sign Up for HealthPlus</FormHeading>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                icon={<FaUser />}
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
                           placeholder="johndoe@example.com"
                           required
                           icon={<FaEnvelope />}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="password">Password</Label>
                           <Input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                icon={<FaLock />}
                               />
                            <PasswordStrengthBar password={formData.password} />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                       <Input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                                required
                                icon={<FaPhoneAlt />}
                           />
                    </InputGroup>
                     <InputGroup>
                            <Label htmlFor="userType">User Type</Label>
                            <InputWrapper>
                                <Select
                                    id="userType"
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                >
                                  <option value="patient">Patient</option>
                                  {/* <option value="doctor">Doctor</option> */}
                                    {/* <option value="admin">Admin</option> */}
                                </Select>
                            </InputWrapper>
                        </InputGroup>
                    <SignupButton type="submit">
                        Sign Up
                    </SignupButton>
                    {message && <Message>{message}</Message>}
                </Form>
                <LoginText>
                    Already have an account?{' '}
                    <LoginLink to="/login">
                        Log in
                    </LoginLink>
                </LoginText>
            </FormWrapper>
        </SignupContainer>
    );
};

export default SignUp;


const SignupContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

const FormWrapper = styled(motion.div)`
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    max-width: 35rem;
    width: 100%;
`;

const FormHeading = styled.h2`
    font-size: 1.875rem;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const Form = styled.form`
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

const InputWrapper = styled.div`
  position: relative;
    display: flex;
    align-items: center;
`;


const SignupButton = styled.button`
    width: 100%;
    background-color: #007bff;
    color: #fff;
     font-weight: 600;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
         transition: background-color 0.3s ease-in-out;
      &:hover {
    background-color: #0056b3;
  }
`;

const LoginText = styled.p`
  text-align: center;
    color: #4a5568;
    margin-top: 1rem;
    font-size: 0.875rem;
`;

const LoginLink = styled(Link)`
    color: #007bff;
    text-decoration: underline;
      &:hover {
    color: #0056b3;
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
`;
const FileInput = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
        width: 100%;
        outline: none;
`;

const Select = styled.select`
   padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        outline: none;
        width: 100%;
    `;