//? Да се креира целосен систем со логирање и регистрирање на огласи
//? Само регистрирани лица да можат да креираат, прегледуваат и ажурираат огласи

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');

const db = require('./pkg/db/index');
const auth = require('./handlers/authHandler');
const app = express();
const ads = require('./pkg/ads/adController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.use(
  jwt
    .expressjwt({
      algorithms: ['HS256'],
      secret: process.env.JWT_SECRET,
      getToken: req => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
          return req.headers.authorization.split(' ')[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ['/api/v1/signup', '/api/v1/login'],
    })
);

app.post('/api/v1/signup', auth.signup);
app.post('/api/v1/login', auth.login);

app.get('/ads/:id', ads.getAd);
app.get('/ads', ads.getAllAds);
app.post('/api/v1/ads', ads.createAd);
app.get('/api/v1/ads/delete/:id', ads.deleteAd);
app.patch('/api/v1/ads/update/:id', ads.updateAd);

const port = 10000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
