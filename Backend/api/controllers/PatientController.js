import { Patient } from "../models/Patient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const registerPatient = async (req, res) => {
    try {
        const { name, email, gender, mobile, age, password, userType } = req.body;

        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ success:false, message: "Patient already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = await Patient.create({
            name,
            email,
            gender,
            mobile,
            age,
            password: hashedPassword,
            userType,
            patientId: uuidv4(),
        });

        res.status(201).json({ 
            success: true, 
            message: "Patient registered successfully", 
            patient: newPatient 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const loginPatient = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        let user = await Patient.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        if (user.userType !== userType) {
            return res.status(400).json({
                success: false, 
                message: `Cannot login with ${userType} credentials`
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign(
            { id: user._id, userType: user.userType }, 
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
            patient: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        return res.status(200).json({ success: true, data: patients });
    } catch (error) {
        console.error("Error fetching all patients:", error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { patientId } = req.body;
        const patient = await Patient.deleteOne({ _id: patientId });

        if (patient.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Patient deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting patient:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message
        });
    }
};
export const changePassword = async (req, res) => {
    try {
       const { oldPassword, newPassword, _id, } = req.body;

       const user = await Patient.findOne({ _id: _id });

        if(!user) {
             return res.status(404).json({ success: false, message: "User not found"});
        }
      
        const isMatch = await bcrypt.compare(oldPassword, user.password);

       if(!isMatch) {
           return res.status(400).json({ success: false, message: "Invalid Old Password"});
       }
      
        const hashedPassword = await bcrypt.hash(newPassword, 10);
         user.password = hashedPassword;

         await user.save();


         res.status(200).json({success: true, message: "Password changed successfully."});

     } catch(error){
        console.error("Error changing password: ", error);
        res.status(500).json({success: false, message: "Server Error", error: error.message})
     }
};