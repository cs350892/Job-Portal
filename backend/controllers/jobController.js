import { Job } from "../models/jobSchema.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export const postJob = async (req, res) => {
  try {
    if (req.user.role === "Job Seeker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return res.status(400).json({
        success: false,
        message: "Provide salary details",
      });
    }

    if (salaryFrom && salaryTo && fixedSalary) {
      return res.status(400).json({
        success: false,
        message: "Provide either fixed or ranged salary",
      });
    }

    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to post job",
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    if (req.user.role === "Job Seeker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
      success: true,
      myJobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    if (req.user.role === "Job Seeker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { id } = req.params;
    let job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Job updated",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    if (req.user.role === "Job Seeker") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();
    res.status(200).json({
      success: true,
      message: "Job deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};
