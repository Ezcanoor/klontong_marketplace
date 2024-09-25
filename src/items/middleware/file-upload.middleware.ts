import { diskStorage } from 'multer';
import { extname } from 'path';

/* 
  here is mimic uploads file to any cloud service. instead of upload to cloud service, i upload to project directory
  in real live scenario it can change to upload file to cloud service funct
*/
export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});
