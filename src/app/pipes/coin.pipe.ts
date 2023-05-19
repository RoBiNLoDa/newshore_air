import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../models/coin';

@Pipe({
  name: 'coin'
})
export class CoinPipe implements PipeTransform {

  public coins: Array<any>;

  constructor() {
    this.coins = Coin.getCoins();
  }

  transform(value: number, type: string): number {

    if (type != null) {

      switch (type) {
        case 'COP':
          return this.getVal(value, type);
          break;
        case 'USD':
          return this.getVal(value, type);
          break;
        case 'EUR':
          return this.getVal(value, type);
          break;
        case 'CAD':
          return this.getVal(value, type);
          break;
        default:
          break;
      }

    }
    return value;

  }

  getVal(value: number, type: string): number {

    const result = this.coins.forEach((item) => {
      if (item.coin === type) {
        return value = Math.round(item.value * value);
      }
      else {
        return value;
      }
    });
    return value;
  }

}
