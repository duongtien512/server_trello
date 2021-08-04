import { BoardModel } from '*/models/board.model';

const createNew = async(data) => {
    try {
        const newBoard = await BoardModel.createNew(data);
        const findNewBoard = await BoardModel.findById(newBoard.insertedId.toString());
        return findNewBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullBoard = async(boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId);
        
        // Add card to each column
        board.columns.forEach((column) => {
            column.card = board.cards.filter(c => c.columnId.toString() === column._id.toString())
        });

        // Sort columns by columnOrder, sort cards by cardOrder => frontEnd xy ly, tranh ganh nang cho server

        // Remove cards data from board
        delete board.cards
        return board;
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardService = {
    createNew,
    getFullBoard
}