import { Appointment } from "../models/Appointment.js";
import { v4 as uuidv4 } from "uuid";

export const createAppointment = async (req, res) => {
    try {
        const { 
            patientId, 
            doctorId, 
            appointmentDate, 
            reason 
        } = req.body;

        const newAppointment = await Appointment.create({
            patientId,
            doctorId,
            appointmentDate,
            reason
        });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ success: false, message: "Error booking appointment", error: error.message });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        return res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error("Error fetching all appointments:", error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const updateAppointmentStatus = async (req, res) => {
  try{
        const { appointmentId } = req.body;
         const appointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          { status: 'Completed' },
         { new: true }
         );
      if (!appointment) {
          return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

        return res.status(200).json({
         success: true,
         message: 'Appointment status updated successfully.',
         appointment
        });

  } catch(error) {
       console.error("Error completing the appointment:", error);
       res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};