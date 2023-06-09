import { Router } from 'express';
import teamRouter from './team.router';
import loginRouter from './login.router';
import matchRouter from './match.router';
import leaderboardRouter from './leaderboard.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
