import mongoose from 'mongoose';
import { Contact } from '../db/models/contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw createHttpError(404, 'Contact not found');

  const contact = await Contact.findById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

export const upsertContact = async (id, payload, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(404, 'Contact not found');
  }

  const rawResult = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
