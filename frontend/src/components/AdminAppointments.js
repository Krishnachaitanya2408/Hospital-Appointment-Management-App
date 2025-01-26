import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { motion } from 'framer-motion';  // Import motion here


const AdminAppointments = ({doctors}) => {
     const [appointments, setAppointments] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
   useEffect(() => {
       async function getAppointments() {
      try {
          const response = await fetch("http://localhost:5000/api/appointments/get-appointments");
              if (response.ok) {
                  const data = await response.json();
                 setAppointments(data?.data);
              } else {
                console.error("Failed to fetch appointments");
              }
        }catch(e){
           console.error("Failed to fetch appointments");
        }
      }
     getAppointments();
  }, []);
 const completeAppointment = async (id) => {
      try {
              const response = await fetch('http://localhost:5000/api/appointments/complete-appointment', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ appointmentId: id }),
              });
           if (response.ok) {
                 setAppointments(
                        appointments.map((appointment) =>
                            appointment._id === id
                                ? { ...appointment, status: "Completed" }
                                : appointment
                        )
                    );
                  }
       }catch(e) {
          console.error("Failed to complete appointment", e)
       }
    };
      const filteredAppointments = appointments.filter(
        (appointment) =>
            appointment.patientName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            doctors
                .find((d) => d.doctorId === appointment.doctorId)
                ?.name.toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

  return (
       <AppointmentsContainer>
            <AppointmentsHeading>
                Doctor Appointments
            </AppointmentsHeading>

            <ControlPanel>
                <SearchContainer>
                    <SearchIcon />
                    <SearchInput
                        type="text"
                        placeholder="Search appointments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>
            </ControlPanel>

          <AppointmentsGrid>
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AppointmentTitle>
                  {appointment.patientName}
                </AppointmentTitle>
                <AppointmentInfo>
                  Doctor:{" "}
                  {doctors.find((d) => d.doctorId === appointment.doctorId)?.name}
                </AppointmentInfo>
                <AppointmentInfo>
                  Date: {appointment.appointmentDate.toLocaleString()}
                </AppointmentInfo>
                <AppointmentNotes>Notes: {appointment.notes}</AppointmentNotes>
                <AppointmentActions>
                  <StatusSpan
                    className={
                      appointment.status === "Completed"
                        ? "completed"
                        : "scheduled"
                    }
                  >
                    {appointment.status}
                  </StatusSpan>
                  <ActionButtons>
                    {appointment.status !== "Completed" && (
                      <ActionButton
                        onClick={() => completeAppointment(appointment._id)}
                        title="Mark as Completed"
                      >
                        <FaCheckCircle />
                      </ActionButton>
                    )}
                  </ActionButtons>
                </AppointmentActions>
              </AppointmentCard>
            ))}
          </AppointmentsGrid>
        </AppointmentsContainer>
  );
};

export default AdminAppointments;


const AppointmentsContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 1rem;
   @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const AppointmentsHeading = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 1.5rem;
  @media (min-width: 640px) {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
`;

const ControlPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
     margin-bottom: 1.5rem;
    gap: 1rem;
   @media (min-width: 640px) {
        flex-direction: row;
    }
`;


const SearchContainer = styled.div`
    position: relative;
    width: 100%;
        @media (min-width: 640px) {
        width: auto;
    }
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
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 1.5rem;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    border-color: #007bff;
  }
  @media (min-width: 640px) {
    width: 16rem;
  }
`;

const AppointmentsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
        @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
        @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const AppointmentCard = styled(motion.div)`
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const AppointmentTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const AppointmentInfo = styled.p`
    color: #4a5568;
    margin-bottom: 0.5rem;
`;

const AppointmentNotes = styled.p`
    color: #4a5568;
    margin-bottom: 1rem;
`;

const AppointmentActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const StatusSpan = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
  &.completed {
    background-color: #edf2f7;
    color: #28a745;
  }
  &.scheduled {
    background-color: #fff8e1;
    color: #ffc107;
  }
`;

const ActionButtons = styled.div`
    display: flex;
`;

const ActionButton = styled.button`
    color: #007bff;
    margin-left: 0.5rem;
    cursor: pointer;
`;