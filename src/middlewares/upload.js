import multer from 'multer';
import createHttpError from 'http-errors';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: function (req, file, callback) {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;

    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (reg, file, callback)=> {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return callback(createHttpError(400, ".exe is not valid extension of the file"));
  }
  callback(null, true)
}
export const upload = multer({
  storage,
  limits,
  fileFilter,
 });
