const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('client').populate('worker');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a job
router.post('/', async (req, res) => {
  const { title, description, category, client, budget, deadline } = req.body;
  const newJob = new Job({ title, description, category, client, budget, deadline });
  try {
    const job = await newJob.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Apply for a job
router.post('/:jobId/apply', async (req, res) => {
  const { workerId } = req.body;
  try {
    const job = await Job.findById(req.params.jobId);
    job.worker = workerId;
    job.status = 'in progress';
    await job.save();
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
