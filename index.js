require('dotenv').config();
console.log('Starting the ai_and_ml_ application...');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const metaApiRoutes = require('./routes/metaApiRoutes');
const grafRoutes = require('./routes/grafRoutes');
const app = express();
const port = process.env.PORT || 3001;
const logger = require('./utils/logger');

mongoose.connect('mongodb://localhost/ai_and_ml_');

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/metaapi', metaApiRoutes);
app.use('/api/graf', grafRoutes);
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/api/feedback', feedbackRoutes);

const tradingOrchestratorRoutes = require('./routes/tradingOrchestratorRoutes');
app.use('/api/trading', tradingOrchestratorRoutes);

const homeRoutes = require('./routes/homeRoutes');
app.use(express.static('public'));
app.use('/', homeRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/api/port', (req, res) => {
  res.json({ port: port });
});

console.log('Attempting to listen on port ' + port + '...');
app.use((err, req, res, next) => {
  logger.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
}).on('error', (err) => {
  if(err.code === 'EADDRINUSE') {
    logger.error(`Error: Port ${port} is already in use`);
  } else {
    logger.error(`Server failed to start: ${err.message}`);
  }
});
