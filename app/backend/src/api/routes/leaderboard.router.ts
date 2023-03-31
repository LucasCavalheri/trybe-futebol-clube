import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.homeLeaderboard);
router.get('/away', leaderboardController.homeLeaderboard);
router.get('/', leaderboardController.homeLeaderboard);

export default router;
