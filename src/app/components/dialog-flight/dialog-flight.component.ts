import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Journey } from 'src/app/models/journey';
import { Destination } from 'src/app/models/destinations';
import { Observable } from 'rxjs';
import { SharecoinService } from 'src/app/services/sharecoin.service';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-dialog-flight',
  templateUrl: './dialog-flight.component.html',
  styleUrls: ['./dialog-flight.component.css']
})
export class DialogFlightComponent {

  public destination: Destination;
  public options: Array<Destination>;
  data$: Observable<Coin>
  coin!: Coin;

  constructor(
    public dialogRef: MatDialogRef<DialogFlightComponent>,
    @Inject(MAT_DIALOG_DATA) public journey: Journey,
    private shareCoing: SharecoinService
  ) {
    this.destination = new Destination("", "", "");
    this.options = this.destination.options;
    this.data$ = shareCoing.sharingObservable;
    this.data$.subscribe((data) => {
      this.coin = data;
    });
  }

  close() {
    this.dialogRef.close()
  }

}
