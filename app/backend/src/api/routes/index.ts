import { Router } from 'express';
import teamRouter from './team.router';

const router = Router();

router.use('/teams', teamRouter);

export default router;
