import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import LoginContext from "../context/LoginContext";
import Input from "./Input";
import {FaLock} from "react-icons/fa";
import { motion } from 'framer-motion'; // Import motion


const Profile = () => {
  const { user, isLoggedIn } = useContext(LoginContext); // use isLoggedIn from context
     const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });
        const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleChangePassword = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/patients/change-password', {
                 method: "PUT",
                 headers: {
                   'Content-Type': 'application/json',
                 },
                body: JSON.stringify({
                    ...formData,
                    _id: user._id
                })
            });
            const data = await response.json();
             if(response.ok) {
                 setMessage(data.message);
             } else {
                setMessage(data.message || "Failed to change password");
             }

          } catch(e) {
                console.error("Error changing password: ", e);
                 setMessage("An error occurred while changing password.");
            }
    }

    return (
         <ProfileContainer>
            <ProfileHeading>Your Profile</ProfileHeading>
            <ProfileInfo>
                <Label>Name:</Label>
                 <Value>{user?.name}</Value>
            </ProfileInfo>
             <ProfileInfo>
                <Label>Email:</Label>
                <Value>{user?.email}</Value>
             </ProfileInfo>
              <ProfileInfo>
                <Label>Phone Number:</Label>
                 <Value>{user?.mobile}</Value>
            </ProfileInfo>
            <ProfileInfo>
                 <Label>User Type:</Label>
                   <Value>{user?.userType}</Value>
              </ProfileInfo>
              {isLoggedIn && user?.userType !== 'admin' && (
                  <ChangePasswordContainer
                      initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                      <FormHeading>
                       Change Password
                    </FormHeading>
                     <Form onSubmit={handleChangePassword}>
                          <InputGroup>
                             <Label htmlFor="oldPassword">Old Password</Label>
                              <Input
                                type="password"
                                 id="oldPassword"
                                  name="oldPassword"
                                   placeholder="••••••••"
                                  value={formData.oldPassword}
                                onChange={handleInputChange}
                             required
                             icon={<FaLock />}
                               />
                           </InputGroup>
                             <InputGroup>
                                <Label htmlFor="newPassword">New Password</Label>
                                 <Input
                                type="password"
                                 id="newPassword"
                                name="newPassword"
                                  placeholder="••••••••"
                                    value={formData.newPassword}
                                  onChange={handleInputChange}
                                required
                                icon={<FaLock />}
                            />
                           </InputGroup>
                         <ChangePasswordButton
                           whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                             type="submit">
                             Change Password
                          </ChangePasswordButton>
                           {message && <Message>{message}</Message>}
                      </Form>
                     </ChangePasswordContainer>
              )}
         </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 2rem;
     max-width: 80rem;
    margin: 0 auto;
`;


const ProfileHeading = styled.h1`
  font-size: 2rem;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 2rem;
`;

const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const Label = styled.p`
  font-weight: bold;
   color: #374151;
   margin-right: 0.5rem;
`;

const Value = styled.p`
  color: #4a5568;
`;

const ChangePasswordContainer = styled(motion.div)`
 background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
   box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
`;


const FormHeading = styled.h2`
  font-size: 1.5rem;
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

const ChangePasswordButton = styled(motion.button)`
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
const Message = styled.div`
  text-align: center;
  margin-top: 10px;
  color: red;
`;