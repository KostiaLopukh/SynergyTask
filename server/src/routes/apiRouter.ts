import express from 'express';
import {groupRouter, userRouter} from './';

const router = express();

router.use('/users', userRouter);
router.use('/groups', groupRouter);

export const apiRouter = router;
