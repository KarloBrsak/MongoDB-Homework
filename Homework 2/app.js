const express = require('express');
const actorsController = require('./controller/actorsController');
const moviesController = require('./controller/moviesController');
const singersController = require('./controller/singersController');
const actorsView = require('./controller/actorsView');
const singersView = require('./controller/singersView');
const moviesView = require('./controller/moviesView');

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

//View - Актери
app.get('/actors', actorsView.getActors);
app.get('/actors/:id', actorsView.getSingleActor);
app.post('/actors', actorsView.addNewActor);
app.get('/actors/delete/:id', actorsView.deleteActor);

//View - Пејачи
app.get('/singers', singersView.getSingers);
app.get('/singers/:id', singersView.getSingleSinger);
app.post('/singers', singersView.addNewSinger);
app.get('/singers/delete/:id', singersView.deleteSinger);

//View - Филмови
app.get('/movies', moviesView.getMovies);
app.get('/movies/:id', moviesView.getSingleMovie);
app.post('/movies', moviesView.addNewMovie);
app.get('/movies/delete/:id', moviesView.deleteMovie);

const port = 10000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
