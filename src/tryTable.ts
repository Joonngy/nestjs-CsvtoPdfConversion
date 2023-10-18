import * as fs from 'fs';
import * as csv from 'csv-parser';
import PDFDocument from 'pdfkit-table';

export class CSVtoPDF {
  constructor() {}
  private outputFile: string = './document.pdf';

  private table = {
    title: '',
    headers: ['First', 'Last', 'Number', 'Street', 'City', 'Postcode'],
    rows: [['']],
  };

  private options: object = {
    width: 300,
    x: 150,
    y: 100,
    padding: {
      top: 1,
      bottom: 1,
      left: 5,
      right: 5,
    },
  };

  public ReadStream(inputFile: string, doc: PDFDocument) {
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', (row) => {
        this.table.rows.push([
          row['First'],
          row['Last'],
          row['Number'],
          row['Street'],
          row['City'],
          row['Postcode'],
        ]);
      })
      .on('end', () => {
        doc.table(this.table, this.options);
        doc.end();
        console.log('Success');
      });
  }

  public conversionTop(inputFile: string, stream: fs.WriteStream) {
    const doc: PDFDocument = new PDFDocument();
    stream = fs.createWriteStream(this.outputFile);
    doc.pipe(stream);
    this.table.rows.pop();
    this.ReadStream(inputFile, doc);
    return this.outputFile;
  }
}
