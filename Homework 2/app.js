//? Актери - Колекција со GET и POST
//? Пејачи - Колекција со GET и POST
//? Филмови - Колекција со GET и POST

//? Домашна 2
//? Да се имплементира VIEW, да има сопствени рути
//? "/blogs" - на GET да се прикажат сите блогови
//? "/blogs" = на POST метода да се креира нов пост
//?

// mongodb+srv://kbrsak:<password>@cluster0.pzncpzh.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const mongoose = require('mongoose');
const actorsController = require('./controller/actorsController');
const moviesController = require('./controller/moviesController');
const singersController = require('./controller/singersController');
const actorsView = require('./controller/actorsView');
const database = require('./database/database');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

database.connectToDatabase();

//Актери
app.get('/api/v1/actors', actorsController.getActors);
app.post('/api/v1/actors', actorsController.createActor);

//Пејачи
app.get('/api/v1/singers', singersController.getSingers);
app.post('/api/v1/singers', singersController.createSinger);

//Филмови
app.get('/api/v1/movies', moviesController.getMovies);
app.post('/api/v1/movies', moviesController.createMovie);

//EJS - Сите актери
app.get('/actors', actorsView.getActors);

const port = 10000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
