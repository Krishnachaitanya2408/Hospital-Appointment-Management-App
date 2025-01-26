import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignInAlt, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Logo from '../assets/logo.svg';
import styled from "styled-components";
import LoginContext from "../context/LoginContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { isLoggedIn, handleLogout, user } = useContext(LoginContext);

     const [activeItem, setActiveItem] = useState('/');

    useEffect(() => {
       setActiveItem(location.pathname);
    }, [location]);

    const navItems = [
        { title: 'Home', path: '/' },
        { title: 'Appointments', path: '/appointments' },
        { title: 'Doctors', path: '/doctors' },
        { title: 'About', path: '/about-us' },
        { title: 'Contact', path: '/contact-us' },
    ];

    return (
        <HeaderContainer>
            <NavContainer>
                <LogoLink to="/">
                    <LogoImage src={Logo} alt="HealthPlus Logo" />
                    <LogoText>HealthPlus</LogoText>
                </LogoLink>

                <NavLinks className="hidden md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            active={activeItem === item.path ? "true" : undefined}
                        >
                            {item.title}
                            {activeItem === item.path && <Underline layoutId="underline" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                        </NavLink>
                    ))}
                </NavLinks>


                    <AuthLinks className="hidden md:flex">
                         {isLoggedIn ? (
                            <>
                            <ProfileLink to="/profile">
                                <FaUserCircle className="inline-block mr-1"/> Profile
                                </ProfileLink>
                                  <LogoutButton onClick={handleLogout}>
                                <FaSignOutAlt className="inline-block mr-1" /> Log Out
                                    </LogoutButton>
                            </>
                        ) : (
                            <>
                             <SignUpLink to="/signup">
                                <FaUser className="inline-block mr-1" />Sign Up
                             </SignUpLink>
                             <LoginLink to="/login">
                                <FaSignInAlt className="inline-block mr-1" />Log In
                            </LoginLink>
                             </>
                        )}
                    </AuthLinks>

                    <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </MenuButton>
            </NavContainer>
            <AnimatePresence>
                    {isMenuOpen && (
                        <MobileNav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navItems.map((item) => (
                                <MobileNavLink
                                    key={item.path}
                                    to={item.path}
                                      active={activeItem === item.path ? "true" : undefined}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.title}
                                </MobileNavLink>
                            ))}
                             {isLoggedIn ? (
                            <>
                             <MobileAuthLink to="/profile"  onClick={() => setIsMenuOpen(false)}>
                                 <FaUserCircle className="inline-block mr-1"/> Profile
                                </MobileAuthLink>
                                <MobileAuthLink onClick={handleLogout}>
                                 <FaSignOutAlt className="inline-block mr-1"/> Log Out
                                    </MobileAuthLink>
                                </>
                            ) : (
                                <>
                             <MobileAuthLink
                                to="/signup"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaUser className="inline-block mr-1" />Sign Up
                            </MobileAuthLink>
                            <MobileAuthLink
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FaSignInAlt className="inline-block mr-1" />Log In
                            </MobileAuthLink>
                                </>
                            )}
                        </MobileNav>
                    )}
                </AnimatePresence>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    background: linear-gradient(to right, #007bff, #28a745);
    padding: 0.75rem 1rem;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 80rem;
    margin: 0 auto;
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LogoImage = styled.img`
    height: 2.5rem;
    width: auto;
`;

const LogoText = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffc107;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 0.5rem;
    @media (min-width: 768px) {
    gap: 1rem;
    }
`;

const NavLink = styled(Link)`
    position: relative;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 500;
    color: #f8f9fa;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #ffc107;
    }
      ${props =>
    props.active &&
        `
        color: #ffc107;
      `
    }
`;

const Underline = styled(motion.div)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.125rem;
    background-color: #ffc107;
`;

const AuthLinks = styled.div`
    display: flex;
    gap: 0.75rem;
`;

const SignUpLink = styled(Link)`
    background-color: #ffc107;
    color: #007bff;
    padding: 0.375rem 1rem;
    border-radius: 1.5rem;
     font-size: 0.875rem;
      font-weight: 500;
    transition: background-color 0.3s ease-in-out;
    &:hover {
        background-color: #f7d05b;
    }
`;


const LoginLink = styled(Link)`
    background-color: #f8f9fa;
    color: #007bff;
      padding: 0.375rem 1rem;
    border-radius: 1.5rem;
     font-size: 0.875rem;
      font-weight: 500;
    transition: background-color 0.3s ease-in-out;
    &:hover {
        background-color: #eee;
    }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
    color: #fff;
    padding: 0.375rem 1rem;
    border-radius: 1.5rem;
     font-size: 0.875rem;
      font-weight: 500;
    transition: background-color 0.3s ease-in-out;
    &:hover {
        background-color: #c82333;
    }
     cursor: pointer;
`;
const ProfileLink = styled(Link)`
     background-color: #fff;
    color: #007bff;
      padding: 0.375rem 1rem;
    border-radius: 1.5rem;
     font-size: 0.875rem;
      font-weight: 500;
    transition: background-color 0.3s ease-in-out;
    &:hover {
        background-color: #eee;
    }
`;

const MenuButton = styled.button`
    color: #f8f9fa;
    outline: none;
    cursor: pointer;
     display: block;
    @media (min-width: 768px) {
     display: none;
    }
`;

const MobileNav = styled(motion.div)`
  margin-top: 0.75rem;
`;

const MobileNavLink = styled(Link)`
    display: block;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 500;
    color: #f8f9fa;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #ffc107;
    }
     ${props =>
    props.active &&
    `
    color: #ffc107;
  `
    }
`;

const MobileAuthLink = styled(Link)`
    display: block;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 500;
    color: #f8f9fa;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #ffc107;
    }
    cursor: pointer;
`;