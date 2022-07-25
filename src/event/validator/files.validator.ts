import { Injectable, FileValidator } from '@nestjs/common';

interface Types {
  types: string[];
}

@Injectable()
export class FilesValidator extends FileValidator<Types> {
  constructor(protected readonly validationOptions: Types) {
    super(validationOptions);
  }

  isValid(files: Express.Multer.File[]): boolean | Promise<boolean> {
    const checkFiles = files.filter((f) => {
      const { originalname } = f;
      const extension = originalname.substring(originalname.indexOf('.') + 1);

      return this.validationOptions.types.indexOf(extension) !== -1;
    });

    return checkFiles.length === files.length;
  }

  buildErrorMessage(file: any): string {
    return `all files not match types ${this.validationOptions.types.join(', ')}`;
  }
}
