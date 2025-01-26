import express from 'express';
import { createAppointment, getAllAppointments, updateAppointmentStatus } from '../controllers/AppointmentController.js';

const router = express.Router();

// Route for creating a new appointment
router.post('/', createAppointment);

router.get('/get-appointments', getAllAppointments);
router.put('/complete-appointment', updateAppointmentStatus); // Changed from POST to PUT

export default router;