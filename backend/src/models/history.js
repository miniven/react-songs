import { ObjectID } from 'mongodb';
import * as db from '../db/';

export const getAll = (callback) => {
  db.get().collection('history').find().toArray(callback);
};

export const create = (data, callback) => {
  db.get().collection('history').insertOne(data, callback);
};

export const deleteByID = (id, callback) => {
  db.get().collection('history').deleteOne({ _id: ObjectID(id) }, callback);
};