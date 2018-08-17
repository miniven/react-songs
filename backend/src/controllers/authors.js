import * as Authors from '../models/authors';

export const getAll = (req, res) => {
  Authors.getAll((err, docs) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      res.send(docs);
  });
};

export const create = (req, res) => {
  Authors.create(req.body, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      res.send(req.body);
  });
};

export const deleteByID = (req, res) => {
  Authors.deleteByID(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};