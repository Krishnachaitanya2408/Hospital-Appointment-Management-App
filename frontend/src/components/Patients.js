import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import styled from 'styled-components';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        async function getPatients() {
             try {
                const response = await fetch("http://localhost:5000/api/patients/get-patients");
                 if (response.ok) {
                      const data = await response.json();
                      setPatients(data?.data);
                   } else {
                      console.error("Failed to fetch patients");
                   }
            }catch (e) {
                 console.error("Failed to fetch patients");
            }
        }

        getPatients();
    }, []);

    const filteredPatients =
        patients?.filter((patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || patients;

  const handleDeletePatient = async (patientId) => {
     try {
            const response = await fetch('http://localhost:5000/api/patients/delete-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({patientId})
            });
             if (response.ok) {
                    alert('Patient deleted successfully');
                    setPatients(patients.filter(patient => patient._id !== patientId));
               }else{
                   alert('Failed to delete patient');
               }
         }catch (e) {
            console.error("Failed to delete patient", e)
         }
    };
    return (
        <PatientsContainer>
            <PatientsHeading>
                Patient Management
            </PatientsHeading>

            <ControlPanel>
                 <SearchContainer>
                    <SearchIcon />
                    <SearchInput
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>
            </ControlPanel>

           <PatientsGrid>
                {filteredPatients &&
                filteredPatients.length > 0 &&
                filteredPatients.map((patient, index) => (
                    <PatientCard
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <PatientName>
                            {patient.name}
                        </PatientName>
                        <PatientInfo>Age: {patient.age}</PatientInfo>
                         <PatientInfo>Gender: {patient.gender}</PatientInfo>
                        <PatientInfo>Contact: {patient.mobile}</PatientInfo>
                        <PatientActions>
                             <EditButton>
                                <FaEdit />
                            </EditButton>
                             <DeleteButton onClick={() => handleDeletePatient(patient._id)}>
                                <FaTrash />
                            </DeleteButton>
                        </PatientActions>
                    </PatientCard>
                ))}
            </PatientsGrid>
        </PatientsContainer>
    );
};

export default Patients;


const PatientsContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 1rem;
   @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const PatientsHeading = styled.h1`
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
    flex-direction: row;
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

const PatientsGrid = styled.div`
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

const PatientCard = styled(motion.div)`
    background-color: #fff;
    padding: 1.5rem;
     border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const PatientName = styled.h3`
   font-size: 1.125rem;
    font-weight: 600;
    color: #007bff;
     margin-bottom: 0.5rem;
`;


const PatientInfo = styled.p`
    color: #4a5568;
    margin-bottom: 0.25rem;
`;


const PatientActions = styled.div`
   display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;

const EditButton = styled.button`
  color: #007bff;
   cursor: pointer;
`;


const DeleteButton = styled.button`
   color: #dc3545;
    cursor: pointer;
`;