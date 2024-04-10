const mongoose = require('mongoose');
require('dotenv').config();

function databaseConn() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
      db.once('open', () => {
        console.log('Connected to the database');
      });
} 

module.exports = databaseConn;


  