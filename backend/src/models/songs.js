import { ObjectID } from 'mongodb';
import * as db from '../db/';

export const getAll = (callback) => {
  db.get().collection('songs').find().toArray(callback);
};

export const getByID = (id, callback) => {
  db.get().collection('songs').findOne({ _id: ObjectID(id) }, callback);
};

export const create = (data, callback) => {
  db.get().collection('songs').insertOne(data, callback);
};

export const update = (data, callback) => {
  const { _id, ...dataToUpdate } = data;

  db.get().collection('songs').updateOne({ _id: ObjectID(data._id) }, { $set: dataToUpdate }, callback);
}

export const updateMultiple = (data, callback) => {
  const ids = Object.keys(data);

  ids.forEach((id) => {
    db.get().collection('songs').updateOne({ _id: ObjectID(id)}, { $set: data[id] }, callback);
  });
}

export const deleteByID = (id, callback) => {
  db.get().collection('songs').deleteOne({ _id: ObjectID(id) }, callback);
}