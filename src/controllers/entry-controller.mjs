import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry(req.body);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const {entry_id} = req.params;
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;

  try {
    // Check if entry exists
    const existingEntry = await findEntryById(entry_id);
    if (!existingEntry) {
      return res.sendStatus(404);
    }
    const result = await updateEntry(existingEntry);
    res.json({message: 'Entry updated successfully.', result});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal server error.'});
  }
};

const deleteEntry = async (req, res) => {
  const {entry_id} = req.params;

  try {
    // Check if entry exists
    const existingEntry = await findEntryById(entry_id);
    if (!existingEntry) {
      return res.sendStatus(404);
    }

    // Delete entry from the database
    const result = await deleteEntryById(entry_id);
    res.json({message: 'Entry deleted successfully.', result});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal server error.'});
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
