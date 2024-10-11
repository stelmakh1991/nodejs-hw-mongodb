import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';
import mongoose from 'mongoose';

import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_BY,
  SORT_ORDER,
} from '../constants/index.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllContacts = async ({
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE,
  sortBy = DEFAULT_SORT_BY,
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const skip = perPage * (page - 1);

  const contactsFilters = Contact.find({ userId });

  if (typeof filter.isFavorite === 'boolean') {
    contactsFilters.where('isFavorite').equals(filter.isFavorite);
  }

  if (filter.contactType) {
    contactsFilters.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsFilters).countDocuments(),
    Contact.find({ userId })
      .merge(contactsFilters)
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      })
      .exec(),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    contactsCount,
  );
  console.log(contacts);

  return {
    contacts,
    ...paginationInformation,
  };
};

export const getContactById = async (contactId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await Contact.findOne({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ ...payload, userId });

  return contact;
};

export const upsertContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};
