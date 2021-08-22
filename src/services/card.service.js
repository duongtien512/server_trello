import { ColumnModel } from '*/models/column.model';
import { CardModel } from '*/models/card.model';

const createNew = async(data) => {
    try {
        const newCard = await CardModel.createNew(data);
        const findNewCard = await CardModel.findById(newCard.insertedId.toString());

        // update cardOrder Array in columns collection
        await ColumnModel.pushCardOrder(findNewCard.columnId.toString(), findNewCard._id.toString());
        return findNewCard;
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
        const result = await CardModel.update(id, updateData);
        const findById = await CardModel.findById(id);
        
        return findById;
    } catch (error) {
        throw new Error(error);
    }
};

export const CardService = {
    createNew,
    update
}