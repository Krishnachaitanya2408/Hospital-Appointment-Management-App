import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import styled from 'styled-components';

// Import components
import Header from "./components/Header";
import Home from "./components/Home";
import Appointments from "./components/Appointments";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AdminDoctors from "./components/AdminDoctors";
import AdminAppointments from "./components/AdminAppointments";
import DoctorModal from "./components/DoctorProfile";
import Admin from "./components/Admin";


// Context
import LoginContext from "./context/LoginContext";

function App() {
    const [doctors, setDoctors] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkToken = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/check-token', {
                method: "GET",
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUser(data.user);
            } else {
              const errorData = await response.json();
              console.error("Error fetching user:", errorData.message)
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch(e) {
            console.error("Error fetching user:", e);
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    useEffect(() => {
        async function getDoctors() {
            try {
                const response = await fetch("http://localhost:5000/api/doctors/get-doctors");
                if (response.ok) {
                   const data = await response.json();
                   setDoctors(data.data);
                } else {
                  const errorData = await response.json();
                  console.error("Failed to fetch doctors", errorData.message);
                }
            } catch (e) {
             console.error("Failed to fetch doctors", e);
           }
        }
        getDoctors();
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const response = await fetch('http://localhost:5000/api/patients/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUser(data.patient);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed');
            return false;
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.ok) {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch(e) {
            console.error("Failed to logout");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <LoginContext.Provider value={{ 
            isLoggedIn, 
            setIsLoggedIn, 
            user, 
            setUser, 
            handleLogout,
            handleLogin 
        }}>
            <AppContainer>
                <Router>
                    <ScrollToTop />
                    <AppContent>
                        <Header />
                        <MainContent>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/appointments" element={<Appointments />} />
                                <Route path="/patients" element={<Patients />} />
                                <Route path="/doctors" element={<Doctors doctors={doctors} />} />
                                <Route path="/doctors/:id" element={<DoctorModal doctors={doctors} />} />
                                <Route path="/admin" element={<Admin />} >
                                    <Route index element={<AdminDoctors doctors={doctors} setDoctors={setDoctors}/>} />
                                    <Route path="appointments" element={<AdminAppointments doctors={doctors}/>} />
                                </Route>
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/about-us" element={<AboutUs />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/terms-of-service" element={<TermsOfService />} />
                                <Route path="/contact-us" element={<ContactUs />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </MainContent>
                        <ScrollToTopButton />
                        <Footer />
                    </AppContent>
                </Router>
            </AppContainer>
        </LoginContext.Provider>
    );
}

export default App;

const AppContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    font-family: 'Montserrat', sans-serif;
    color: #4a5568;
`;

const AppContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem 1rem;
    @media (min-width: 640px) {
        padding: 2rem;
    }
`;