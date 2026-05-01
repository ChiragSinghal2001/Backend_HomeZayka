const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(cors({
  origin: "*",
  credentials: true
}));

// 2. Handle the OPTIONS preflight request manually just in case
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/meals', require('./routes/mealRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.get('/', (req, res) => {
  console.log("Request received at root!");
  res.send('Hello World!');
});

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:');
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

const PORT =8080;
app.listen(PORT,() => console.log(`🚀 Server running on port ${PORT}`));