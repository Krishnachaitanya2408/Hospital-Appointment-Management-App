import React, { useState } from 'react';
import { useNavigate,  useParams,  } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarPlus, FaInfoCircle } from 'react-icons/fa';
import styled from 'styled-components';


const Doctors = ({ doctors }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams();
  
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <DoctorsContainer>
            <DoctorsHeading>Our Doctors</DoctorsHeading>
            
            <SearchContainer>
                <SearchIcon />
                <SearchInput
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>

            <DoctorsGrid>
                {filteredDoctors.map((doctor) => (
                    <DoctorCard
                        key={doctor.doctorId}
                        onClick={() => navigate(`/doctors/${doctor.doctorId}`)}
                    >
                        <DoctorImage src={doctor.image} alt={doctor.name} />
                        <DoctorName>{doctor.name}</DoctorName>
                        <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                        <DoctorMeta>
                            <span>Patients: {doctor.patients}</span>
                            <span>Experience: {doctor.experience} years</span>
                        </DoctorMeta>

                        <BookAppointmentButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the card click event
                                navigate(`/appointments?doctorId=${doctor.doctorId}`);
                            }}
                        >
                            <FaCalendarPlus className="mr-2" />
                            Book Appointment
                        </BookAppointmentButton>

                        <InfoButton
                             whileHover={{ scale: 1.1 }}
                             whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                 e.stopPropagation(); // Prevent triggering the card click event
                                navigate(`/doctors/${doctor.doctorId}`);
                             }}
                        >
                            <FaInfoCircle />
                         </InfoButton>
                    </DoctorCard>
                ))}
            </DoctorsGrid>
        </DoctorsContainer>
    );
};

export default Doctors;


const DoctorsContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 1rem;
     @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const DoctorsHeading = styled.h1`
    font-size: 1.875rem;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 1.5rem;
    @media (min-width: 640px) {
    font-size: 2.25rem;
    margin-bottom: 2rem;
    }
`;


const SearchContainer = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: flex-end;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const SearchInput = styled.input`
  width: 100%;
    max-width: 16rem;
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 1.5rem;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    border-color: #007bff;
  }
`;

const DoctorsGrid = styled.div`
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

const DoctorCard = styled(motion.div)`
    background-color: #fff;
    padding: 1rem;
     border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    position: relative;
     cursor: pointer;
    &:hover {
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);
    }
`;

const DoctorImage = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 1rem;
      display: block;
`;

const DoctorName = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: #007bff;
    text-align: center;
    margin-bottom: 0.5rem;
`;

const DoctorSpecialty = styled.p`
    color: #6b7280;
    text-align: center;
    margin-bottom: 0.5rem;
`;

const DoctorMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #4a5568;
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

const BookAppointmentButton = styled(motion.button)`
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 auto;
    &:hover {
         background-color: #0056b3;
     }
`;

const InfoButton = styled(motion.button)`
   position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: #ffc107;
  color: black;
    padding: 0.25rem;
    border-radius: 50%;
     display: flex;
  align-items: center;
    justify-content: center;
  cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
`;