import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.findAll);
router.get('/:id', teamController.findByPk);

export default router;
