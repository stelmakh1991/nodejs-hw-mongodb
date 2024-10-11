import { Router } from 'express';
import {
  getContactsController,
  getContactsControllerById,
  createContactController,
  deleteContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { createContactSchema } from '../validation/createContactsSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateContactSchema } from '../validation/updateContactsSchema.js';
import { ROLES } from '../constants/index.js';
import { authentificate } from '../middlewares/authentificate.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

router.use(authentificate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId',
  checkRoles(ROLES.AUTOR),
  ctrlWrapper(getContactsControllerById));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.AUTOR),
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.AUTOR),
  ctrlWrapper(deleteContactByIdController));

export default router;
