import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import AuthMiddleware from '../middlewares/Auth';

const router = Router();

const matchController = new MatchController();

router.post('/', AuthMiddleware, matchController.create);
router.get('/', matchController.findAll);
router.patch('/:id/finish', AuthMiddleware, matchController.finishMatch);
router.patch('/:id', AuthMiddleware, matchController.finishInProgressMatch);

export default router;
