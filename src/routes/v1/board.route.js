import express from 'express';
import { BoardController } from '*/controllers/board.controller';
import { BoardValidation } from '*/validations/board.validation';

const router = express.Router();

router.route('/')
    // List board
    .post(BoardValidation.createNew, BoardController.createNew);

router.route('/:id')
    .get(BoardController.getFullBoard)
    .put(BoardValidation.update, BoardController.update)

export const boardRoutes = router;