import mongoose from 'mongoose';
import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return await Contact.findById(id);
  }
  return null;
};
