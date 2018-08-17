import { MongoClient } from 'mongodb';

const state = {
  db: null,
};

export const connect = (url, dbName, done) => {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, (err, client) => {
    if (err) {
      return done(err);
    }

    state.db = client.db(dbName);
    done();
  });
};

export const get = () => state.db;