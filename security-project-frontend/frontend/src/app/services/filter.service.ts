import { Injectable } from '@angular/core';
import { ConsumptionUnitDto } from "../models/consumption-unit-dto";
import {ExchangeDto} from "../models/exchange-dto";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
  ) {
  }

  getMaxValue(data: ConsumptionUnitDto[]): ConsumptionUnitDto {
    const index = data?.reduce((prev, curr, i) =>curr.consumptionUnits && data[prev]?.consumptionUnits < curr?.consumptionUnits ? i : prev, 0)
    return data[index] ? data[index] : { consumptionUnits: 0, dateConsumption: ''};
  }

  getMinValueOfConsumption(data: ConsumptionUnitDto[]): ConsumptionUnitDto {
    const index = data?.reduce((prev, curr, i) => curr.consumptionUnits && data[prev]?.consumptionUnits > curr?.consumptionUnits ? i : prev, data.length-1)
    return data[index] ? data[index] : { consumptionUnits: 0, dateConsumption: ''};
  }

  getMinValueOfPrices(data: ExchangeDto[]): ExchangeDto {
    const index = data?.reduce((prev, curr, i) => curr.exchangeUnits && data[prev]?.exchangeUnits > curr?.exchangeUnits ? i : prev, data.length-1)
    return data[index] ? data[index] : { exchangeUnits: 0, dateExchange: ''};
  }
}
