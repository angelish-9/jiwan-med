import express from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

import {verifyToken, isDoctor} from '../middleware/authMiddleware.js'
import adminAuth from '../middleware/adminAuth.js';

const appointmentRouter = express.Router();


// GET list of all doctors
appointmentRouter.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to get doctors" });
  }
});


// Doctor's Dashboard: Get all appointments for a specific doctor
appointmentRouter.get("/doctor/:doctorId", verifyToken, isDoctor, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate("patient", "username email")
      .populate("doctor", "username email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Update appointment (Doctor can reschedule or update)
appointmentRouter.put("/update/:appointmentId", verifyToken, isDoctor, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only update your own appointments" });
    }

    // Update appointment details
    const { date, time, reason } = req.body;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.reason = reason || appointment.reason;

    await appointment.save();
    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel appointment (Doctor can cancel)
appointmentRouter.delete("/cancel/:appointmentId", verifyToken, isDoctor, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only cancel your own appointments" });
    }

    await appointment.deleteOne();
    res.json({ success: true, message: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/appointments/:id
appointmentRouter.put("/:appointmentId", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});


// Create Appointment
appointmentRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = req.user._id; 
    
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      reason
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all appointments (optional filter by user)
appointmentRouter.get("/", adminAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "username")
      .populate("doctor", "username");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get past appointments for the authenticated user
appointmentRouter.get("/past", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "username")
      .sort({ date: -1 }); // Sort by most recent first
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch past appointments" });
  }
});

export default appointmentRouter;
