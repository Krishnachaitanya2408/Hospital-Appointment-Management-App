import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { FaUserShield, FaChartBar, FaUserMd, FaUserInjured, FaCalendarCheck, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../context/LoginContext";
import { useLocation } from "react-router-dom"; // Import useLocation


const Admin = () => {
    const { isLoggedIn, user, handleLogout } = useContext(LoginContext);
    const navigate = useNavigate();
     const location = useLocation(); // use Location here now
    const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);


    useEffect(() => {
        if (user?.userType === 'admin') {
            setIsLoggedInAdmin(true)
        }else{
             setIsLoggedInAdmin(false);
             navigate("/");
        }
    }, [user,navigate]);


    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("HealthPlus - Hospital Report", 20, 20);
        doc.setFontSize(16);
        doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);
        doc.setFontSize(14);
        doc.text("Total Patients: 1000", 20, 50);
        doc.text("Total Doctors: 50", 20, 60);
        doc.text("Total Appointments: 1500", 20, 70);
        doc.text("Revenue: $500,000", 20, 80);
        doc.save("hospital_report.pdf");
    };

    const statsData = [
        { icon: FaUserMd, title: 'Doctors', count: 50, color: 'bg-blue-500' },
        { icon: FaUserInjured, title: 'Patients', count: 1000, color: 'bg-green-500' },
        { icon: FaCalendarCheck, title: 'Appointments', count: 1500, color: 'bg-yellow-500' },
        { icon: FaChartBar, title: 'Revenue', count: '$500,000', color: 'bg-purple-500' },
    ];

    const adminNavItems = [
        { title: 'Doctors', path: '/admin' },
        { title: 'Appointments', path: '/admin/appointments' },
        { title: 'Patients', path: '/admin/patients' }
    ];

    return (
        <AdminContainer>
            <Heading>Admin Dashboard</Heading>
              {isLoggedIn && isLoggedInAdmin ?  (
                   <DashboardContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                     <AdminNav>
                            {adminNavItems.map((item) => (
                                 <AdminNavLink
                                    key={item.path}
                                    to={item.path}
                                   className={location.pathname === item.path ? 'active' : ''}
                                >
                                    {item.title}
                                </AdminNavLink>
                            ))}
                        </AdminNav>
                    <Outlet/>
                    <StatsGrid>
                        {statsData.map((stat, index) => (
                            <StatCard
                                key={index}
                                className={`${stat.color}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <StatIcon as={stat.icon} />
                                <StatTitle>{stat.title}</StatTitle>
                                <StatCount>{stat.count}</StatCount>
                            </StatCard>
                        ))}
                    </StatsGrid>

                    <ButtonContainer>
                        <ActionButton
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={generatePDF}
                        >
                            <FaFilePdf className="mr-2" /> Generate PDF Report
                        </ActionButton>
                         <LogoutButton
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                        >
                            Logout
                        </LogoutButton>
                    </ButtonContainer>
                   </DashboardContainer>
                  ) : (
                  <p> Please Login to access Admin Panel </p>
              )}
        </AdminContainer>
    );
};

export default Admin;


const AdminContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 2rem;
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 2rem;
`;
const DashboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AdminNav = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const AdminNavLink = styled(Link)`
  padding: 0.75rem 1.5rem;
    border-radius: 1.5rem;
    font-weight: 600;
    cursor: pointer;
     color: #4a5568;
    &:hover {
         color: #007bff;
         }
    &.active {
        color: #007bff;
    font-weight: bold;
    }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled(motion.div)`
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: #fff;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StatCount = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  font-weight: 600;
  display: flex;
    align-items: center;
    justify-content: center;
  cursor: pointer;
  &:hover {
        background-color: #0056b3;
    }
`;
const LogoutButton = styled(motion.button)`
  background-color: #dc3545;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #c82333;
    }
`;