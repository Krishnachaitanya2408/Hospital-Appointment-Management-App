import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Login from "./Login";
import {
    FaCalendarPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaCheckCircle,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import styled from 'styled-components';
import axios from "axios";

const Appointments = () => {
    const { isLoggedIn, user } = useContext(LoginContext);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [newAppointment, setNewAppointment] = useState({
        patientName: "",
        doctorId: "",
        appointmentDate: new Date(),
        notes: "",
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDoctorId = queryParams.get("doctorId");

useEffect(() => {
   async function getDoctors() {
     try {
          const response = await fetch("http://localhost:5000/api/doctors/get-doctors");
               if (response.ok) {
                    const data = await response.json();
                   setDoctors(data?.data);
                } else {
                  console.error("Failed to fetch doctors");
                }
      }catch (e) {
                 console.error("Failed to fetch doctors");
            }
   }
  getDoctors();
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
  getAppointments()


if (selectedDoctorId) {
        setNewAppointment((prev) => ({ ...prev, doctorId: selectedDoctorId }));
        setShowForm(true);
    }
}, [selectedDoctorId]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
};

const handleDateChange = (date) => {
    setNewAppointment((prev) => ({ ...prev, appointmentDate: date }));
};

const validateName = (name) => {
    const namePattern = /^[A-Za-z][A-Za-z\s]{3,}$/;
    return namePattern.test(name);
};

const validateDate = (date) => {
    return date > new Date();
};

    const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validateName(newAppointment.patientName)) {
          alert(
              "Patient name must start with a letter and be at least 4 characters long."
          );
        return;
    }
     if (!validateDate(newAppointment.appointmentDate)) {
        alert("Appointment date must be in the future.");
        return;
      }
    try {
      const response = await fetch('http://localhost:5000/api/appointments/create-appointment', {
             method: "POST",
             headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({
              ...newAppointment,
               patientId: user.patientId,
                 status: "Scheduled",
             }),
       });
       const data = await response.json();
       if(response.ok){
         alert("Appointment Created SuccessFully");
          setNewAppointment({
                patientName: "",
                doctorId: "",
                appointmentDate: new Date(),
                notes: "",
          });
             setShowForm(false);
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
         }else{
            alert(data.message || "Failed to create Appointment");
          }
     } catch(error){
       console.error("Appointment creation error:", error);
         alert("Failed to create Appointment");
    }

 };


const deleteAppointment = (id) => {
    setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
    );
};

const completeAppointment = async (id) => {
   try {
    const response = await fetch('http://localhost:5000/api/appointments/complete-appointment', {
      method: 'PUT', // Changed from POST to PUT or PATCH
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
      }else{
           const data = await response.json();
          alert(data.message || "Failed to complete appointment")
      }
    } catch (e) {
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
const filteredAppointmentsForPatient = appointments.filter(appointment => appointment.patientId === user?.patientId)

const filteredAppointmentsForDoctor = appointments.filter(appointment => doctors.find((d) => d.id === appointment.doctorId)?.name === user?.name)

return (
    <>
        {isLoggedIn ? (
            <AppointmentsContainer>
                <AppointmentsHeading>
                    Appointment Management
                </AppointmentsHeading>

                <ControlPanel>
                    {user?.userType !=="admin" && ( <NewAppointmentButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowForm(!showForm)}
                    >
                        <FaCalendarPlus className="mr-2" />
                        {showForm ? "Cancel" : "New Appointment"}
                    </NewAppointmentButton>)}
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
                 {user?.userType !== "admin" && showForm && (
                    <FormContainer
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                    >
                        <FormGrid>
                            <FormInput
                                type="text"
                                name="patientName"
                                placeholder="Patient Name"
                                value={newAppointment.patientName}
                                onChange={handleInputChange}
                                required
                            />
                            <FormSelect
                                name="doctorId"
                                value={newAppointment.doctorId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.doctorId} value={doctor.doctorId}>
                                        {doctor.name} - {doctor.specialty}
                                    </option>
                                ))}
                            </FormSelect>
                            <StyledDatePicker
                                selected={newAppointment.appointmentDate}
                                onChange={handleDateChange}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                            <FormTextarea
                                name="notes"
                                placeholder="Notes"
                                value={newAppointment.notes}
                                onChange={handleInputChange}
                            />
                        </FormGrid>
                        <SubmitButton type="submit">
                            Schedule Appointment
                        </SubmitButton>
                    </FormContainer>
                )}

                <AppointmentsGrid>
                     {user?.userType === "patient" && filteredAppointmentsForPatient.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AppointmentTitle>
                              Patient: {appointment.patientName}
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
                                      <ActionButton
                                        onClick={() => deleteAppointment(appointment.id)}
                                        title="Delete"
                                    >
                                        <FaTrash />
                                      </ActionButton>
                                    {appointment.status !== "Completed" && (
                                        <ActionButton
                                            onClick={() => completeAppointment(appointment.id)}
                                            title="Mark as Completed"
                                        >
                                            <FaCheckCircle />
                                        </ActionButton>
                                    )}
                                </ActionButtons>
                            </AppointmentActions>
                        </AppointmentCard>
                     ))}
                     {user?.userType === "doctor" && filteredAppointmentsForDoctor.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AppointmentTitle>
                              Patient: {appointment.patientName}
                            </AppointmentTitle>
                            <AppointmentInfo>
                                Doctor:{" "}
                                {doctors.find((d) => d.id === appointment.doctorId)?.name}
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
                                            onClick={() => completeAppointment(appointment.id)}
                                            title="Mark as Completed"
                                        >
                                            <FaCheckCircle />
                                        </ActionButton>
                                    )}
                                </ActionButtons>
                            </AppointmentActions>
                        </AppointmentCard>
                     ))}
                      {user?.userType === "admin" && filteredAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AppointmentTitle>
                                Patient: {appointment.patientName}
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
                                            onClick={() => completeAppointment(appointment.id)}
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
        ) : (
            <Login />
        )}
    </>
);
};

export default Appointments;


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

const NewAppointmentButton = styled(motion.button)`
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  font-weight: 600;
  display: flex;
    align-items: center;
  cursor: pointer;
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


const FormContainer = styled(motion.form)`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
    @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    }
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const StyledDatePicker = styled(DatePicker)`
    padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
    width: 100%;
`;


const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
    font-weight: 600;
    cursor: pointer;
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