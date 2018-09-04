import { ObjectID } from 'mongodb';
import * as db from '../db/';

export const getAll = (callback) => {
  db.get().collection('history').find().toArray(callback);
};

export const create = (data, callback) => {
  db.get().collection('history').insertOne(data, callback);
};

export const deleteFromHistory = (id, callback) => {
  db.get().collection('history').find({ list: { $all: [id] }}).toArray((err, docs) => {
    const operations = docs.map((doc) => {
      if (doc.list.length > 1) {
        return {
          updateOne: {
            filter: {
              list: { $in: [id] }
            },
            update: {
              $set: { list: doc.list.filter(songID => songID !== id) }
            }
          }
        };
      }

      return {
        deleteOne: {
          filter: {
            list: { $in: [id] }
          }
        }
      };
    });

    db.get().collection('history').bulkWrite(operations, callback);
  });
};

export const deleteByID = (id, callback) => {
  db.get().collection('history').deleteOne({ _id: ObjectID(id) }, callback);
};