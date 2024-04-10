const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const databaseConn = require('./config/database');

databaseConn();

app.use(express.json());


// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const taskRoutes = require('./routes/taskRoutes');

// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
// app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});