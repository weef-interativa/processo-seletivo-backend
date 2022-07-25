import { createParamDecorator, ExecutionContext, ParseFilePipe, UploadedFiles } from '@nestjs/common';
import { FilesValidator } from '../validator';

export const FileUploaded = createParamDecorator((imageTypes: string[], ctx: ExecutionContext) => {
  const files: Express.Multer.File[] = ctx.switchToHttp().getRequest().files;
  const pipe = new ParseFilePipe({ validators: [new FilesValidator({ types: imageTypes })] });

  return pipe.transform(files);
});
