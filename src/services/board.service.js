import { BoardModel } from '*/models/board.model';
import { cloneDeep } from 'lodash';

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

        if(!board || !board.columns) {
            throw new Error('Board not found!');
        }

        const transformBoard = cloneDeep(board);
        // filter deleted column
        transformBoard.columns = transformBoard.columns.filter(column => !column._destroy);
        
        // Add card to each column
        transformBoard.columns.forEach((column) => {
            column.cards = transformBoard.cards.filter(c => c.columnId.toString() === column._id.toString())
        });

        // Sort columns by columnOrder, sort cards by cardOrder => frontEnd xy ly, tranh ganh nang cho server

        // Remove cards data from board
        delete transformBoard.cards
        return transformBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async(id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        };
        if(updateData._id) delete updateData._id;
        if(updateData.columns) delete updateData.columns;
        const result = await BoardModel.update(id, updateData);
        const findById = await BoardModel.findById(id);
        return findById;
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardService = {
    createNew,
    getFullBoard,
    update
}