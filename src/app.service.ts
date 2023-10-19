import { Injectable } from "@nestjs/common";
import { CSVtoPDF } from "./tryTable";
import PDFDocument from "pdfkit-table";

@Injectable()
export class AppService {
  getCSVandConvertToPDF(file):PDFDocument {
    const arr: string[] = file.buffer.toString().split("\n");
    let arr2d: string[][] = [];
    let temp: string;
    let i: number = 0;

    for (temp of arr) {
      let t: string[] = temp.split(",");
      arr2d.push([]);

      for (let j = 0; j < t.length; j++) {
        arr2d[i].push(t[j]);
      }

      i++;
    }

    arr2d.pop();

    const createPDF = new CSVtoPDF();
    
    return createPDF.conversionTop(arr2d);
  }

  getHello() {
    return { hello: "world" };
  }
}
