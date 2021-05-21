const crypto = require('crypto');
const multer = require('multer');
// const azure = require('multer-azure');
const path = require('path');

const SAVE_PATH = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, SAVE_PATH);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const blobPath = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, blobPath);
      });
    },
  }),

  // azure: azure({
  //   connectionString: process.env.AZURE_HOST,
  //   account: process.env.AZURE_ACC,
  //   key: process.env.AZURE_KEY,
  //   container: 'pamda',
  //   blobPathResolver: (req, file, cb) => {
  //     crypto.randomBytes(16, (err, hash) => {
  //       if (err) cb(err);

  //       const filename = `${hash.toString('hex')}-${file.originalname}`;

  //       cb(null, filename);
  //     });
  //   },
  // }),
  // ADD STORAGE TYPES ON THE APPLICATION
};

module.exports = {
  dest: SAVE_PATH,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    // eslint-disable-next-line no-unused-expressions
    allowedMimes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Invalid file type.'));
  },
};
