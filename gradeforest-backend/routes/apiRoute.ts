var express = require('express');
var router = express.Router();

import { statusRouter } from './statusRoute';
import { userRouter } from './userRoute';
import { listRouter } from './listRoute';

router.use('/status', statusRouter);
router.use('/user', userRouter);
router.use('/list', listRouter);
export const apiRouter = router;
