const express = require('express');
const errorHandler = require('./utils/error_handler');
require('dotenv').config();
const cors = require('cors');
const app = express();
const databaseConn = require('./config/database');

databaseConn();

app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization','X-Total-Count','X-Page'],
  exposedHeaders :['Content-Type','X-Total-Count','X-Page', 'Authorization']
};
app.use(cors(corsOptions));


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