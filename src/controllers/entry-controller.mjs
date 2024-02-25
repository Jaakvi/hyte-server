import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  listAllEntriesByUserId,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  try {
    // Varmistetaan, että käyttäjä on todennettu
    if (!req.user) {
      return res.status(401).json({virhe: 'Unauthorized'});
    }

    // Haetaan käyttäjän tunnus tokenista
    const userId = req.user.user_id;

    // Haetaan kirjaukset kirjautuneelle käyttäjälle
    const result = await listAllEntriesByUserId(userId);

    // Jos kyselyssä ei tapahtunut virheitä, lähetetään vastaus kirjauksista
    res.json(result);
  } catch (error) {
    // Jos virhe tapahtuu hakuprosessin aikana.
    res.status(500).json({virhe: 'Server error'});
  }
};

const getEntryById = async (req, res) => {
  // Authentication: Check if user is authenticated
  if (!req.user) {
    return res.sendStatus(401); // Unauthorized
  }

  // Retrieve entry by id
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404); // Not Found
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

    // Check if the logged-in user is the owner of the entry
    if (existingEntry.owner_id !== req.user.user_id) {
      return res.status(403).json({error: 'Unauthorized'});
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
