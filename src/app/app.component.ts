import { Component, OnInit} from '@angular/core';
import { Coin } from './models/coin';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharecoinService } from './services/sharecoin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newshore_air';
  public coins = Coin.getCoins();
  form! : FormGroup;
  public coin_value: string;
  

  constructor(private fb: FormBuilder,
              private shareCoin : SharecoinService){ 
    this.coin_value = 'USD'
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      coin_: [this.coins[0]],
   });

  }

  onChange(value:any):string {
    this.coin_value = value.coin;
    this.shareCoin.sharingObservableData=value;
    return this.coin_value;
  }
  
}
