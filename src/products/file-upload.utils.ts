import { UNSUPPORTED_FILE } from 'src/utils/constants';

export const editFilename = (req, file, cb) => {
  const filename = file.originalname.split('.')[0];
  const fileExtention = file.originalname.split('.')[1];
  const newFileName =
    filename.split(' ').join('_') + '_' + Date.now() + '.' + fileExtention;
  cb(null, newFileName);
};

export const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
    req[UNSUPPORTED_FILE] = true;
    cb(null, false);
  }
  cb(null, true);
};
