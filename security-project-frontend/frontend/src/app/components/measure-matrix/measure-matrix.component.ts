import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MATRIX_HEADERS_PROM, MATRIX_HEADERS_TOTAL} from "../../utils/app.titles";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import {ExportFileService} from "../../services/export-file.service";

@Component({
  selector: 'app-measure-matrix',
  templateUrl: './measure-matrix.component.html',
  styleUrls: ['./measure-matrix.component.scss']
})
export class MeasureMatrixComponent implements OnInit {

  @Input() measure: string;
  @Input() mode: 'TOTAL' | 'PROMEDIO';
  @Input() defaultPeriod: string;
  @Input() theme: string;
  @Input() units: number;
  @Input() data$: Observable<string[][]>;
  @Input() data: string[][];

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  headers: string[];
  filteredData: string[][];
  loading: boolean;
  options: any;

  constructor(
    private exportFileService: ExportFileService
  ) { }

  ngOnInit(): void {
    this.headers = this.mode === "TOTAL" ? MATRIX_HEADERS_TOTAL : MATRIX_HEADERS_PROM;
    this.loading = true;
    this.data$
      .pipe(
        filter((data) => !!data),
        tap((data) => {
          this.data = data;
          this.data[this.data.length-1][0] = this.mode;
          this.filteredData = this.data;
          this.loading = false;
        }),
      )
      .subscribe();
  }

  onDateChange(dates: Date[]) {
    this.dateEmitter.emit(dates);
  }

  exportExcel() {
    const element = document.getElementById('matrix');
    this.exportFileService.exportExcel(this.measure+'.xlsx', element);
  }
}
