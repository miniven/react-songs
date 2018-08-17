import * as Songs from '../models/songs';

export const getAll = (req, res) => {
  Songs.getAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  });
};

export const getByID = (req, res) => {
  Songs.getByID(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(doc);
  });
};

export const create = (req, res) => {
  Songs.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(req.body);
  });
};

export const update = (req, res) => {
  Songs.update(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};

export const deleteByID = (req, res) => {
  Songs.deleteByID(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};