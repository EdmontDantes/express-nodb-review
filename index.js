const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

// const logger = require('./middlewares/logger.js')

const userRouter = require('./routes/userRoutes')
const port = process.env.PORT || 8080;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', userRouter); //parent route

//this hooks up use of static routes
// app.use(express.static(path.join(__dirname, 'public')));



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});