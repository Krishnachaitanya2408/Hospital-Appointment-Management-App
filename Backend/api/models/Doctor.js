// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    qualifications: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    doctorId: { type: String, required: true },
}, { timestamps: true });

export const Doctor = mongoose.model('Doctor', doctorSchema);