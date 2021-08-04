import { ColumnModel } from '*/models/column.model';
import { BoardModel } from '*/models/board.model';

const createNew = async(data) => {
    try {
        // su dung transaction mongodb de kiem tra loi toan cuc
        const newColumn = await ColumnModel.createNew(data);
        const findNewColumn = await ColumnModel.findById(newColumn.insertedId.toString());

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
        }
        const result = await ColumnModel.update(id, updateData);
        const findColumn = await ColumnModel.findColumn(id);
        return findColumn;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnService = {
    createNew,
    update
}