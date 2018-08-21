import { ObjectID } from 'mongodb';
import * as db from '../db/';

export const getAll = (callback) => {
  db.get().collection('history').find().toArray(callback);
};

export const create = (data, callback) => {
  db.get().collection('history').insertOne(data, callback);
};

export const deleteFromHistory = (id, callback) => {
  // db.get().collection('history').find({ list: { $all: [id] }}).toArray((err, docs) => {
  //   const operations = docs.map((doc) => {
  //     if (doc.list.length > 1) {
  //       return { updateOne: { filter: { list: { $elemMatch: id } }, update: { $set: { list: doc.list.filter(songID => songID !== id) } } } };
  //     }

  //     return { deleteOne: { filter: { list: { $elemMatch: id } }, update: { $set: { list: doc.list.filter(songID => songID !== id) } } } };
  //   });

  //   db.get().collection('history').bulkWrite(operations, callback);
  // });
    // .forEach((doc) => {
    //   console.log(doc);
    //   doc.list.filter(songID => songID !== id)

    //   db.get().collection('history').save(doc);
    // });
  // db.get().collection('history').updateMany({ list: { $all: [id] }}, { $set: [] }, { multi: true }, callback);
};

export const deleteByID = (id, callback) => {
  db.get().collection('history').deleteOne({ _id: ObjectID(id) }, callback);
};