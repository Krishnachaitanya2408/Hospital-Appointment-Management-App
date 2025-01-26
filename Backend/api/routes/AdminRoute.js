// routes/adminRoutes.js
import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/AdminController.js';

const router = express.Router();

// Route for registering a new admin
router.post('/register', registerAdmin);

// Route for logging in an admin
router.post('/login', loginAdmin);

export default router;