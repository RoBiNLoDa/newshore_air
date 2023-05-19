import { Component, OnInit, Input } from '@angular/core';
import { Journey } from 'src/app/models/journey';
import { DialogFlightComponent } from '../dialog-flight/dialog-flight.component';
import { MatDialog } from '@angular/material/dialog';
import { SharecoinService } from 'src/app/services/sharecoin.service';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/models/coin';


@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  @Input() journeys!: Journey[];
  data$: Observable<Coin>
  coin!: Coin;

  constructor(public dialog: MatDialog,
    private shareCoing: SharecoinService
  ) {
    this.data$ = shareCoing.sharingObservable;
    this.data$.subscribe((data) => {
      this.coin = data;
    });
  }

  openDialog(journey: Journey) {
    const dialogo1 = this.dialog.open(DialogFlightComponent, {
      data: journey
    });

  }
  ngOnInit(): void {
    
  }

}
