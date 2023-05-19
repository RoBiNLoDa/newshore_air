import { Injectable } from '@angular/core';
import { Coin } from '../models/coin';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharecoinService {

  private coins = Coin.getCoins();

  private sharingObservablePrivate: BehaviorSubject<Coin> = new BehaviorSubject<Coin>(this.coins[0]);

  get sharingObservable() {
    return this.sharingObservablePrivate.asObservable();
  }

  set sharingObservableData(data: Coin) {
    this.sharingObservablePrivate.next(data);
  }

  constructor() { }
}
