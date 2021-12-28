import { model } from 'mongoose';
import { List } from '../../interfaces/list';
import { ListSchema } from '../schema/listSchema';

var express = require('express');
var router = express.Router();

const ListModel = model<List>('List', ListSchema);

router.get('/lists/:userId', function (req, res) {
  ListModel.find({ user_id: req.params.userId }, async (err, docs) => {
    if (!err && docs) {
      res.status(200).json(docs);
    } else {
      res.status(200).json(undefined);
    }
  });
});

router.get('/list/:listId', function (req, res) {
  ListModel.findById(req.params.listId, async (err, docs) => {
    if (!err && docs) {
      res.status(200).json(docs);
    } else {
      res.status(200).json(undefined);
    }
  });
});

router.post('/', async function ({ body: list }: { body: List }, res) {
  const newDoc = new ListModel(list);
  await newDoc.save();

  res.status(200).json(list);
});

router.put('/', function (req, res) {
  ListModel.findByIdAndUpdate(req.body._id, req.body, {
    returnNewDocument: true,
  }).then((updatedList) => {
    res.status(200).json(updatedList);
  });
});

router.delete('/:id', function (req, res) {
  ListModel.findByIdAndDelete(req.params.id).then((deletedList) => {
    res.status(200).json(deletedList);
  });
});
export const listRouter = router;
