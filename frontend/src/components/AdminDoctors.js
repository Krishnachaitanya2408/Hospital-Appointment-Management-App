import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const AdminDoctors = ({doctors, setDoctors}) => {
  const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
          name: "",
        specialty: "",
        experience: 0,
        qualifications: "",
        image: "",
          bio: "",
           password: '',
    });

    const handleInputChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
        e.preventDefault();
         try {
            const response = await fetch('http://localhost:5000/api/doctors/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDoctor),
            });
            const data = await response.json();

            if(response.ok) {
                 setDoctors([...doctors, data.newDoctor]);
                   setNewDoctor({
                     name: "",
                       specialty: "",
                       experience: 0,
                       qualifications: "",
                       image: "",
                         bio: "",
                       password: '',
                   });
                    setShowForm(false);
                 }else{
                  alert(data.message || "Failed to add the doctor");
                }
        } catch (e) {
             console.error("Signup error:", e);
        }
  };


    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
        <DoctorsContainer>
          <ControlPanel>
            <NewDoctorButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
            >
              <FaUserPlus className="mr-2" />
              {showForm ? "Cancel" : "Add New Doctor"}
            </NewDoctorButton>
            <SearchContainer>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
          </ControlPanel>
          {showForm && (
            <FormContainer
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
            >
              <FormGrid>
                  <FormInput
                  type="text"
                  name="name"
                  placeholder="Doctor Name"
                  value={newDoctor.name}
                  onChange={handleInputChange}
                  required
                />
                  <FormInput
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  value={newDoctor.specialty}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  type="number"
                  name="experience"
                    placeholder="Experience"
                    value={newDoctor.experience}
                    onChange={handleInputChange}
                    required
                />
                  <FormInput
                  type="text"
                  name="qualifications"
                    placeholder="Qualifications"
                    value={newDoctor.qualifications}
                    onChange={handleInputChange}
                  required
                  />
                  <FormInput
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={newDoctor.image}
                  onChange={handleInputChange}
                  required
                />
                  <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={newDoctor.password}
                        onChange={handleInputChange}
                        required
                  />
                  <FormTextarea
                      name="bio"
                      placeholder="Bio"
                      value={newDoctor.bio}
                    onChange={handleInputChange}
                />
              </FormGrid>
              <SubmitButton type="submit">
                Add Doctor
              </SubmitButton>
            </FormContainer>
          )}
            <DoctorsGrid>
                {filteredDoctors.map((doctor) => (
                    <DoctorCard
                        key={doctor.doctorId}
                    >
                        <DoctorImage src={doctor.image} alt={doctor.name} />
                        <DoctorName>{doctor.name}</DoctorName>
                        <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                        <DoctorMeta>
                            <span>Patients: {doctor.patients}</span>
                            <span>Experience: {doctor.experience} years</span>
                        </DoctorMeta>
                            <DoctorBio>{doctor.bio}</DoctorBio>

                    </DoctorCard>
                ))}
            </DoctorsGrid>
        </DoctorsContainer>
  );
};

export default AdminDoctors;

const DoctorsContainer = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 1rem;
      @media (min-width: 640px) {
    padding: 2rem;
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

const NewDoctorButton = styled(motion.button)`
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

  const FormTextarea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
        resize: vertical;
    min-height: 5rem;
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

const DoctorsGrid = styled.div`
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
const DoctorBio = styled.p`
    color: #4a5568;
    margin-bottom: 1rem;
    text-align: center;
`;