require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.APP_PORT || 3000;

const connectDB = require('./databases/db');
connectDB();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/admin', adminRoutes);
apiRoutes.use('/store', storeRoutes);
apiRoutes.use('/product', productRoutes);
apiRoutes.use('/order', orderRoutes);

app.listen(port, () => {
    console.log(`Server Run at Port ${port}`);
});