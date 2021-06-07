import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CONSUMPTION_ENDPOINT, EXCHANGE_ENDPOINT} from "../utils/app.endpoints";
import { ConsumptionUnitDto } from "../models/consumption-unit-dto";
import {MaxMinDateDto} from "../models/max-min-date-dto";
import {tap} from "rxjs/operators";
import {ExchangeDto} from "../models/exchange-dto";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  firstDateOfMonth: Date;
  lastDateOfMonth: Date;

  constructor(
    private httpClient: HttpClient
  ) {
    const date = new Date();
    // for final version
    // this.firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    // this.lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.firstDateOfMonth = new Date(2020, 2, 1);
    this.lastDateOfMonth = new Date(2020, 2, 30);
  }

  getData(start?: Date, end?: Date): Observable<ExchangeDto[]> {
    return this.httpClient.get<ExchangeDto[]>(EXCHANGE_ENDPOINT + `filter`, {
      params: {
        serviceId: '1',
        start: start ? start.toISOString().split('T')[0] : this.firstDateOfMonth.toISOString().split('T')[0],
        end: end ? end.toISOString().split('T')[0] : this.lastDateOfMonth.toISOString().split('T')[0],
      }
    });
  }


  getMatrix(start?: Date, end?: Date): Observable<string[][]> {
    return this.httpClient.get<string[][]>(EXCHANGE_ENDPOINT + `matrix`, {
      params: {
        serviceId: '1',
        start: start ? start.toISOString().split('T')[0] : this.firstDateOfMonth.toISOString().split('T')[0],
        end: end ? end.toISOString().split('T')[0] : this.lastDateOfMonth.toISOString().split('T')[0],
      }
    });
  }
}
