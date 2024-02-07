import Express from 'express';
import {deleteItem, getItemById, getItems, postItem, putItem} from '../controllers/item-controller.mjs';

const itemRouter = Express.Router();

// define routes here
// GET http://127.0.0.1:3000/items
itemRouter.get('/', getItems);
// GET http://127.0.0.1:3000/items/<ID>
itemRouter.get('/:id', getItemById);
// Itemin lisäys
// POST http://127.0.0.1:3000/items/
itemRouter.post('/', postItem);
//PUT
itemRouter.put('/:id', putItem);
//DELETE
itemRouter.delete('/:id', deleteItem);

export default itemRouter;
