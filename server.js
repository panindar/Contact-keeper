const express = require('express');
const connectDB = require('./config/db');
const path = require('path');


const app = express();
//connecting to mongodb
connectDB();

//Init middleware
app.use(express.json({extended:false}));

//Defining Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve Static assets in production

if(process.env.NODE_ENV === 'production' ) {
    //static folder

    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.Port || 5000;

app.listen(PORT, () => console.log(`server connected on ${PORT}`));