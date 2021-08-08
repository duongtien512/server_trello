import { ColumnModel } from '*/models/column.model';
import { BoardModel } from '*/models/board.model';
import { CardModel } from '*/models/card.model';

const createNew = async(data) => {
    try {
        // su dung transaction mongodb de kiem tra loi toan cuc
        const newColumn = await ColumnModel.createNew(data);
        const findNewColumn = await ColumnModel.findById(newColumn.insertedId.toString());
        findNewColumn.cards = [];

        // update columnOrder Array in boards collection
        await BoardModel.pushColumnOrder(findNewColumn.boardId.toString(), findNewColumn._id.toString());

        return findNewColumn;
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
        if(updateData.cards) delete updateData.cards;
        const result = await ColumnModel.update(id, updateData);
        const findById = await ColumnModel.findById(id);
        if(findById._destroy) {
            // delete many card in this column
            CardModel.deleteMany(findById.cardOrder)
        }
        return findById;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnService = {
    createNew,
    update
}