import {
  Controller,
  Get,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import PDFDocumentWithTables from "pdfkit-table";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sayHello() {
    return this.appService.getHello();
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file, @Response() res) {
    res.setHeader(
      "Content-disposition",
      `attachment; filename=${file.originalName}`
    );
    res.set("Content-Type", "application/pdf");
    res.setTimeout(1800 * 1000); // 30 minutes timeout

    const doc: PDFDocumentWithTables =
      this.appService.getCSVandConvertToPDF(file);

    doc.pipe(res);
    doc.end();
    console.log("Convert Table Success");
  }
}
