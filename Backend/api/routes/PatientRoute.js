// routes/patientRoutes.js
import express from 'express';
import { registerPatient, loginPatient, getAllPatients, deletePatient, changePassword } from '../controllers/PatientController.js';

const router = express.Router();

// Route for registering a new patient
router.post('/register', registerPatient);

// Route for logging in a patient
router.post('/login', loginPatient);

router.get("/get-patients", getAllPatients);

router.post("/delete-patient", deletePatient);
router.put("/change-password", changePassword); // added new route

export default router;