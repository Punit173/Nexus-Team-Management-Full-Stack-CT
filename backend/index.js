const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Member = require('./models/Member');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/team-members')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes

// 1. POST /api/members
app.post('/api/members', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newMember = new Member({
      name,
      role,
      email,
      image: req.file.filename
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 2. GET /api/members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 3. GET /api/members/:id
app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (err) {
    console.error('Error fetching member details:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
