import { Doctor } from "../models/Doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const registerDoctor = async (req, res) => {
    try {
        const { name, email, specialty, experience, qualifications, image, bio, password } = req.body;

        const existingDoctor = await Doctor.findOne({ name });
        if (existingDoctor) {
            return res.status(400).json({success: false, message: "Doctor already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDoctor = await Doctor.create({
            name,
            email,
            specialty,
            experience,
            qualifications,
            image,
            bio,
            password: hashedPassword,
            doctorId: uuidv4(),
        });

        res.status(201).json({
            success: true,
            message: "Doctor registered successfully",
            doctor: newDoctor,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const loginDoctor = async (req, res) => {
    try {
        const { name, password, email } = req.body; // extracted email

        let doctor;

        if(name){
           doctor = await Doctor.findOne({ name });
        }
       else if(email){
         doctor = await Doctor.findOne({ email });
        }
        
        if (!doctor) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign(
            { id: doctor._id, userType: 'doctor' }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({ 
            success: true, 
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                specialty: doctor.specialty,
                email: doctor.email,
                userType: 'doctor'
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        return res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.error("Error fetching all doctors:", error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};