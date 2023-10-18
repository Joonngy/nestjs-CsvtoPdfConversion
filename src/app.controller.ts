import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { storage } from './config/storage.config';
import * as fs from 'fs';
import { CSVtoPDF } from './tryTable';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private outpath: string;
  @Get()
  sayHello() {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async upload(@UploadedFile() file) {
    const createPDF = new CSVtoPDF();
    const stream = fs.createWriteStream('./document.pdf');
    this.outpath = createPDF.conversionTop(
      file.destination + '/' + file.filename,
      stream,
    );
    return {
      fileName: file.originalname,
      // savedPath: path.replace(/\\/gi, '/'),
      size: file.size,
    };
  }

  @Get('download/:path')
  download(@Param('path') path: string): StreamableFile {
    console.log(`./${path}`);
    const file = fs.createReadStream(`./${path}`);
    return new StreamableFile(file);
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file/pass-validation')
  // uploadFileAndPassValidation(
  //   @Body() body: SampleDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'json',
  //       })
  //       .build({
  //         fileIsRequired: false,
  //       }),
  //   )
  //   file?: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file?.buffer.toString(),
  //   };
  // }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file/fail-validation')
  // uploadFileAndFailValidation(
  //   @Body() body: SampleDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpg',
  //       })
  //       .build(),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }
}
