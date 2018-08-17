import { ObjectID } from 'mongodb';
import * as db from '../db/';

export const getAll = (callback) => {
  db.get().collection('authors').find().toArray(callback);
};

export const create = (data, callback) => {
  db.get().collection('authors').insertOne(data, callback);
};

export const deleteByID = (id, callback) => {
  db.get().collection('authors').deleteOne({ _id: ObjectID(id) }, callback);
};