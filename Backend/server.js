import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Patient } from './api/models/Patient.js';
import { Admin } from './api/models/Admin.js';

import patientRoutes from './api/routes/PatientRoute.js';
import doctorRoutes from './api/routes/DoctorRoute.js';
import adminRoutes from './api/routes/AdminRoute.js';
import appointmentRoutes from "./api/routes/AppointmentRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Changed to React's default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to the Healthcare API');
});

I 

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/appointments', appointmentRoutes);

// Auth middleware routes
app.get('/api/auth/check-token', async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        let user;
        if (decoded.userType === 'patient') {
            user = await Patient.findById(decoded.id).select('-password');
        } else if (decoded.userType === 'admin') {
            user = await Admin.findById(decoded.id).select('-password');
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({success: true, message: "Logged out successfully."});
});

// Database connection
mongoose
    .connect(mongoDBUrl)
    .then(() => {
        console.log('App connected to database');
        // Start server after successful DB connection
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            });
        }
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

export default app;