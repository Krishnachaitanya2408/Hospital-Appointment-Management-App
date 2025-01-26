import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import LoginContext from "../context/LoginContext";
import styled from 'styled-components';
import Input from "./Input";

const Login = () => {
    const { setIsLoggedIn, setUser } = useContext(LoginContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "patient"
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         try {
          let response;
            if (formData.userType === 'patient') {
                response = await fetch("http://localhost:5000/api/patients/login", {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: { "Content-Type": "application/json" },
                });
            } else if (formData.userType === 'doctor') {
              response = await fetch("http://localhost:5000/api/doctors/login", {
                  method: "POST",
                  body: JSON.stringify({ name: formData.email, password: formData.password }),
                  headers: { "Content-Type": "application/json" },
                });
            }
               else if (formData.userType === 'admin') {
              response = await fetch("http://localhost:5000/api/admins/login", {
                  method: "POST",
                  body: JSON.stringify(formData),
                  headers: { "Content-Type": "application/json" },
                });
            }
          const data = await response.json();

           if(response.ok){
               setIsLoggedIn(true);
                setUser(data[formData.userType]);
                 document.cookie = `token=${data.token}; path=/; secure; httponly`;
                 setMessage(data.message);
                 setTimeout(() => {
                   navigate("/")
                }, 1000);
            } else {
               setMessage(data.message || 'Failed to login!');
             }

        } catch (error) {
            console.error("Login error:", error);
            setMessage('An error occurred while loggin in.');
        }

         setFormData({
             email: "",
             password: "",
             userType: "patient"
         });

    };

    return (
        <LoginContainer>
            <FormWrapper
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FormHeading>
                    Login to HealthPlus
                </FormHeading>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="email">
                            Email/Username
                        </Label>
                         <Input
                                 type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="youremail@example.com / Username"
                                required
                             icon={<FaEnvelope />}
                               />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="password">
                            Password
                        </Label>
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
                                   <option value="doctor">Doctor</option>
                                    <option value="admin">Admin</option>
                                </Select>
                            </InputWrapper>
                        </InputGroup>
                    <LoginButton type="submit">
                        <FaSignInAlt className="mr-2" />
                        Login
                    </LoginButton>
                    {message && <Message>{message}</Message>}
                </Form>
                <SignupText>
                    Don't have an account?{" "}
                    <SignupLink to="/signup">
                        Sign up
                    </SignupLink>
                </SignupText>
            </FormWrapper>
        </LoginContainer>
    );
};

export default Login;

const LoginContainer = styled.div`
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


const Select = styled.select`
   padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        outline: none;
        width: 100%;
    `;

const LoginButton = styled.button`
  width: 100%;
    background-color: #007bff;
    color: #fff;
  font-weight: 600;
  padding: 0.75rem 1rem;
    border-radius: 0.375rem;
  cursor: pointer;
      display: flex;
    justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0056b3;
  }
`;

const SignupText = styled.p`
  text-align: center;
  color: #4a5568;
    margin-top: 1rem;
     font-size: 0.875rem;
`;

const SignupLink = styled(Link)`
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