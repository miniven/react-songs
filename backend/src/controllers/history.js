import * as History from '../models/history';


export const getAll = (req, res) => {
  History.getAll((err, docs) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      res.send(docs);
  });
};

export const create = (req, res) => {
  History.create(req.body, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      res.send(req.body);
  });
};

export const deleteFromHistory = (req, res) => {
  History.deleteFromHistory(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};

export const deleteByID = (req, res) => {
  History.deleteByID(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};