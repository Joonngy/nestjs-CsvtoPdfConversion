import PDFDocument from 'pdfkit-table';
import PDFDocumentWithTables from 'pdfkit-table';

export class CSVtoPDF {
  constructor() {}

  private table = {
    title: '',
    headers: [''],
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

  public conversionTop(arr : string[][]):PDFDocument {
    const doc: PDFDocument = new PDFDocumentWithTables();

    this.table.headers.pop();
    this.table.rows.pop();
    
    let i=0;
    for(let i=0;i<arr[0].length;i++) {
      this.table.headers.push(arr[0][i]);
    }


    for(let i=1;i<arr.length;i++){
      this.table.rows[i-1] = [];
      for(let j=0;j<arr[i].length;j++){
        this.table.rows[i-1].push(arr[i][j].replaceAll("\"", ""));
      }
    }

    doc.table(this.table, this.options);
    return doc;
  }
}


