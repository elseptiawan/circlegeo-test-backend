require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT || 3000;

const connectDB = require('./databases/db');
connectDB();

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server Run at Port ${port}`);
});