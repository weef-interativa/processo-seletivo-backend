import { ForbiddenException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const FileUploadInterceptor = (fileTypes: string[]) => {
  const supportedExtensions = fileTypes.join('|');
  const regEx = new RegExp(`\.(${supportedExtensions})$`);

  return FilesInterceptor('images', 20, {
    storage: diskStorage({
      destination: './uploads',
      filename(_, file, callback) {
        const name = `${Date.now()}_${file.originalname}`;
        return callback(null, name);
      },
    }),
    fileFilter(_, file, callback) {
      if (!file.originalname.match(regEx)) {
        return callback(
          new ForbiddenException(`Only image files with types (${fileTypes.join(', ')}) are allowed!`),
          false,
        );
      }
      callback(null, true);
    },
  });
};
