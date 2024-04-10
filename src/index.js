const express = require('express');
const errorHandler = require('./utils/error_handler');
require('dotenv').config();
const app = express();
const databaseConn = require('./config/database');

databaseConn();

app.use(express.json());


const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/tasks.routes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});