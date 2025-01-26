// routes/doctorRoutes.js
import express from 'express';
import { registerDoctor, getAllDoctors, loginDoctor } from '../controllers/DoctorController.js';

const router = express.Router();

    // Route for registering a new doctor
router.post('/register', registerDoctor);

// Route for logging in a doctor
router.post('/login', loginDoctor);

router.get("/get-doctors", getAllDoctors);

export default router;