const express = require('express');
const app = express();

app.use(express.json());   // keep whatever middleware you already have (json parser, cors, ...)

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/health', require('./routes/health'));

module.exports = app;