import { Pipe, PipeTransform } from '@angular/core';
import { Destination } from '../models/destinations';

@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

  public destination: Destination;
  public options: Array<Destination>;

  constructor() {
    this.destination = new Destination("", "", "");
    this.options = this.destination.options;
  }

  transform(value: unknown, ...args: unknown[]): unknown {

    const result = this.options.find(option => option.code === value);
    const city = result?.city;
    return city;

  }

}
