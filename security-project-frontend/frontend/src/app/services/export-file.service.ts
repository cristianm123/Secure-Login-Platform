import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor(
  ) { }

  exportExcel(fileName: string, element: HTMLElement): void {
    const ws: XLSX.WorkSheet= XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook= XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }
}
