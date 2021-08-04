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

export const CardService = {
    createNew
}