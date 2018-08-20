import express from 'express';
import bodyParser from 'body-parser';
import * as db from './db/';
import * as SongsController from './controllers/songs';
import * as AuthorsController from './controllers/authors';
import * as HistoryController from './controllers/history';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('API');
});

// Songs //

app.get('/api/songs', SongsController.getAll);

app.get('/api/songs/:id', SongsController.getByID);

app.post('/api/songs/create/', SongsController.create);

app.post('/api/songs/update/', SongsController.update);

app.post('/api/songs/update_multiple/', SongsController.updateMultiple);

app.post('/api/songs/delete/:id', SongsController.deleteByID);

// Authors //

app.get('/api/authors', AuthorsController.getAll);

app.post('/api/authors/create/', AuthorsController.create);

app.post('/api/authors/delete/:id', AuthorsController.deleteByID);

// History //

app.get('/api/history', HistoryController.getAll);

app.post('/api/history/create/', HistoryController.create);

app.post('/api/history/delete/:id', HistoryController.deleteByID);

// Connection //

db.connect('mongodb://localhost:27017', 'setlist_api', (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  app.listen(4000, () => console.log('API started on localhost:4000'));
});