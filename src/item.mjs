// mock data for simple API
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item kolme'},
  {id: 4, name: 'Item neljä'},
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemById = (req, res) => {
  // Etsi objekti, jonka id vastaa pyydettyä
  const requestedId = parseInt(req.params.id);
  let item = items.find((item) => item.id === requestedId);

  if (!item) {
    // Jos objektia ei löydy, palauta virhekoodi 404 Not Found
    return res.status(404).json({message: 'Item not found'});
  }

  // Palauta löydetty objekti
  res.json(item);
};

const postItem = (req, res) => {
  // TODO: lisää postattu item items-taulukkoon
  res.json({message: 'item created'});
};

const deleteItem = (req, res) => {
  //TODO: implement delete item
  // tip: array.findIndex() ?
  res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
  // TODO: implement modify item
  res.json({message: 'put placeholder'});
};

export {getItems, getItemById, postItem, deleteItem, putItem};
