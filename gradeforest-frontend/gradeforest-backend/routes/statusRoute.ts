var express = require('express');
var router = express.Router();

// interface imports
import { Status } from '../../interfaces/status';

class myStatus implements Status {
  status: String;
  constructor(name: String) {
    this.status = name;
  }
}

router.get('/', function (req: any, res: any) {
  let mystatus = new myStatus('UP');
  res.status(200).json(mystatus);
});

router.post('/', function (req, res) {
  res.send('post');
});

router.put('/:id', function (req, res) {
  res.send('update');
});

router.delete('/:id', function (req, res) {
  res.send('delete');
});
export const statusRouter = router;
