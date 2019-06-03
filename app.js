const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const diaryRoutes = require('./api/routes/travelDiaries');
const summeryRoutes = require('./api/routes/summery');
const weatherInfoRoutes = require('./api/routes/weather');

mongoose.connect('mongodb+srv://admin:admin@travelbuddydatabase-z58wo.mongodb.net/test?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//fixing CORS errors. 
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*'); //* means any webpage can access this API
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/diaries', diaryRoutes);
app.use('/summaries', summeryRoutes);
app.use('/weather', weatherInfoRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
