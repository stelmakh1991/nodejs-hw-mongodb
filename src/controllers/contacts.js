import {
    createContact,
    deleteContactById,
    getAllContacts,
    getContactById,
    upsertContact,
  } from '../services/contacts.js';

import { parseFilters } from '../utils/parseFilters.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = req.query;
  const filter = parseFilters(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully get contacts!',
    data: contacts,
  });
};

export const getContactsControllerById = async (req, res) => {
  const contactId = req.params.contactId;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);

  res.json({
    status: 200,
    message: `Successfully get student with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { body } = req;
  const contact = await createContact(body, req.user._id);

  res.status(201).json({
    status: 201,
    message: `Successfully created contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const userId = req.user._id;
  const { contact } = await upsertContact(contactId, userId, body);

  res.status(200).json({
    status: 200,
    message: `Successfully patched contact!`,
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  await deleteContactById(id);

  res.status(204).send();
};
