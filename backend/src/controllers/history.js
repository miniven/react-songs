import * as History from '../models/history';


export const getAll = (req, res) => {
  console.log(History);
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

export const deleteByID = (req, res) => {
  History.deleteByID(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};