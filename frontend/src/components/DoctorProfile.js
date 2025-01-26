import React, { useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const DoctorModal = ({ doctors }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [appointmentDate, setAppointmentDate] = useState('');
    const [reason, setReason] = useState('');

    const doctor = doctors.find(d => d.doctorId === id);
    if(!doctor) return null;

    const handleBookAppointment = async () => {
        try {
            const response = await fetch('http://localhost:5555/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    doctorId: doctor.doctorId,
                    appointmentDate,
                    reason
                })
            });

            const data = await response.json();
            if (data.success) {
                alert('Appointment booked successfully!');
                navigate('/appointments');
            } else {
                alert(data.message || 'Failed to book appointment');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment');
        }
    };

    return (
        <ModalOverlay onClick={() => navigate('/doctors')}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => navigate('/doctors')}>
                    ×
                </CloseButton>
                <DoctorDetails>
                    <DoctorImage src={doctor.image} alt={doctor.name} />
                    <DoctorName>{doctor.name}</DoctorName>
                    <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                    <DoctorInfo>Experience: {doctor.experience} years</DoctorInfo>
                    <DoctorInfo>Patients: {doctor.patients}</DoctorInfo>
                    <DoctorBio>{doctor.bio}</DoctorBio>
                    <AppointmentForm>
                        <Input
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                        <TextArea
                            placeholder="Reason for appointment"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <BookAppointmentButton onClick={handleBookAppointment}>
                            <FaCalendarPlus className="mr-2" />
                            Book Appointment
                        </BookAppointmentButton>
                    </AppointmentForm>
                </DoctorDetails>
            </ModalContent>
        </ModalOverlay>
    );
};

export default DoctorModal;


const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 35rem;
    margin: 0 auto;
    position: relative;
    z-index: 1010;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #6b7280;
    font-size: 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
`;

const DoctorDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DoctorImage = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
`;

const DoctorName = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 0.5rem;
`;

const DoctorSpecialty = styled.p`
    font-size: 1.125rem;
    color: #6b7280;
`;

const DoctorInfo = styled.p`
    color: #4a5568;
    margin-bottom: 0.5rem;
`;


const DoctorBio = styled.p`
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
`;


const BookAppointmentButton = styled.button`
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

const AppointmentForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
`;

const TextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    min-height: 100px;
`;