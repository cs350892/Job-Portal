import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Resume required",
      });
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(resume.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file format",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload resume",
      });
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (!name || !email || !coverLetter || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID: {
        user: req.user._id,
        role: "Job Seeker",
      },
      employerID: {
        user: jobDetails.postedBy,
        role: "Employer",
      },
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Application failed",
    });
  }
};

export const employerGetAllApplications = async (req, res) => {
  try {
    if (req.user.role === "Job Seeker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const applications = await Application.find({ "employerID.user": req.user._id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const jobseekerGetAllApplications = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const applications = await Application.find({ "applicantID.user": req.user._id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const jobseekerDeleteApplication = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};
