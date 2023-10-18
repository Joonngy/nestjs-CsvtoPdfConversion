import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads/csv',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  console.log(file.originalname);
  return file.originalname;
}
