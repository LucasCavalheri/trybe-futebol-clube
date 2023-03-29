import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.findAll);
router.patch('/:id/finish', matchController.finishMatch);

export default router;
