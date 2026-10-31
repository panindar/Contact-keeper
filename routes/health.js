const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const config = require('config');

// const db = process.env.MONGO_URI || config.get('mongoURI');



router.get('/', (req, res) => {
//   console.log('health api in the route')
  const dbUp = mongoose.connection.readyState === 1; // 1 = connected
  res.status(dbUp ? 200 : 503).json({
    status: dbUp ? 'ok' : 'unavailable',
    db: dbUp ? 'up' : 'down',
    uptime: Math.round(process.uptime()),
  });
});

module.exports = router