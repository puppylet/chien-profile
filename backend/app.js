const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const cors = require('cors');
const logger = require('morgan');
const requireDir = require('require-dir');
const fs = require('fs');
const http = require('http');
const https = require('https');

require('dotenv').config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/chien-profile';
mongoose.Promise = require('bluebird');
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

requireDir('./src/models');

app.get('/', function (req, res) {res.status(200).send('OK!')});

const publicRoutes = ['/auth/login', '/auth/sign-up', '/profile']

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    requestProperty: 'auth',
    getToken: req => req.headers.authorization
  }).unless({method: 'OPTIONS', path: publicRoutes})
);

app.use('/user', require('./src/routes/user'));
app.use('/auth', require('./src/routes/auth'));
app.use('/tech', require('./src/routes/tech'));
app.use('/client', require('./src/routes/client'));
app.use('/project', require('./src/routes/project'));
app.use('/experience', require('./src/routes/experience'));
app.use('/profile', require('./src/routes/profile'));
app.use((req, res, next) => {const err = new Error('Not Found');  err.status = 404;  next(err)});
app.use((err, req, res, next) => res.status(err.status || 500).end());

const domainName = process.env.BACKEND_DOMAINNAME || 'localhost'
let http_port = process.env.HTTP_PORT || 80;
let https_port = process.env.HTTPs_PORT || 443;
if (domainName === 'localhost') {
  http.createServer(app).listen(http_port);
  console.log('Server listening on ' + http_port);
} else {
  const options = {
    key: fs.readFileSync(`/etc/letsencrypt/live/${domainName}/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${domainName}/fullchain.pem`)
  }
  http.createServer(app).listen(http_port);
  https.createServer(options, app).listen(https_port);
}

module.exports = app;
