import express from 'express';
import bodyParser from 'body-parser';
import * as db from './db/';
import * as SongsController from './controllers/songs';

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

app.get('/api/songs', SongsController.getAll);

app.get('/api/songs/:id', SongsController.getByID);

app.post('/api/songs/create', SongsController.create);

app.put('/api/songs/update/', SongsController.update);

app.delete('/api/songs/delete/:id', SongsController.deleteByID);

db.connect('mongodb://localhost:27017', 'setlist_api', (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  app.listen(4000, () => console.log('API started on localhost:4000'));
});