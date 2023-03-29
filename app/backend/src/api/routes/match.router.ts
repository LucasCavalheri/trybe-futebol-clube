import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import AuthMiddleware from '../middlewares/Auth';

const router = Router();

const matchController = new MatchController();

router.post('/', AuthMiddleware, matchController.create);
router.get('/', AuthMiddleware, matchController.findAll);
router.patch('/:id', AuthMiddleware, matchController.finishInProgressMatch);
router.patch('/:id/finish', AuthMiddleware, matchController.finishMatch);

export default router;
