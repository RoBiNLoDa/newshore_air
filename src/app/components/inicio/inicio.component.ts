import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Destination } from '../../models/destinations';
import { FlightService } from 'src/app/services/flight';
import { Flight } from 'src/app/models/flight';
import { Journey } from 'src/app/models/journey';
import { DialogFlightComponent } from '../dialog-flight/dialog-flight.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [FlightService]
})
export class InicioComponent implements OnInit {

  public datos: any;
  public place_origin: any;
  public place_destination: any;
  public flights: Flight[] = [];
  public journey!: Journey;
  public journeys!: Array<Journey>;
  public destination!: Destination;
  public options: Array<Destination>;
  public isJourneys!: Boolean


  constructor(
    private _flightService: FlightService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.destination = new Destination("", "", "");
    this.options = this.destination.options;
    this.isJourneys == false;
  }

  formularioBusqueda = this.fb.group({
    origen: ['', [Validators.required, Validators.pattern('[A-Z]{3}')]],
    destino: ['', [Validators.required, Validators.pattern('[A-Z]{3}')]]
  });



  ngOnInit(): void {
    this.flights = this.getFlights()
  }

  areEqual(): Boolean {
    if (this.formularioBusqueda.value.origen?.length == 3 && this.formularioBusqueda.value.destino?.length == 3 &&
      (this.formularioBusqueda.value.origen == this.formularioBusqueda.value.destino)) {

      this.formularioBusqueda.setErrors({ error: true });
      return true

    } else {
      return false
    }
  }

  findPlace(isAPlace?: string, x?: string): Boolean {
    if (x === 'o') {
      if (this.options.find(code => code.code === isAPlace)) {
        this.place_origin = this.options.find(code => code.code === isAPlace)
        return true
      } else {
        this.formularioBusqueda.setErrors({ error: true });
        return false
      }
    } else if (x === 'd') {
      if (this.options.find(code => code.code === isAPlace)) {
        this.place_destination = this.options.find(code => code.code === isAPlace)
        return true
      } else {
        this.formularioBusqueda.setErrors({ error: true });
        return false
      }
    } else {
      this.formularioBusqueda.setErrors({ error: true });
      return false
    }

  }

  onSubmit() {

    let arrScale: Array<any> = [];
    let results: Flight[] = [];
    this.journeys = [];

    var result = this.flights.find(flight =>
      flight.origin === this.formularioBusqueda.value.origen &&
      flight.destination === this.formularioBusqueda.value.destino
    );
    //Vuelo directo
    if (result) {
      results.push(result);
      this.journey = {
        flights: results,
        origin: this.formularioBusqueda.value.origen!,
        destination: this.formularioBusqueda.value.destino!,
        price: result.price
      }
      this.journeys.push(this.journey);
      //console.log('Vuelo directo: ',this.journeys);
    } else {
      const arrFlight_origin = this.flights.filter(flight =>
        flight.origin === this.formularioBusqueda.value.origen
      );
      const arrFlight_destination = this.flights.filter(flight =>
        flight.destination === this.formularioBusqueda.value.destino
      );
      if (arrFlight_origin.length > 0 && arrFlight_destination.length > 0) {
        //Vuelos con una escala
        for (let i = 0; i < arrFlight_origin.length; i++) {
          for (let j = 0; j < arrFlight_destination.length; j++) {
            if (arrFlight_origin[i].destination === arrFlight_destination[j].origin) {
              arrScale.push(arrFlight_origin[i]);
              arrScale.push(arrFlight_destination[j]);
            }
          }
        }
        //Vuelos con dos escalas
        if (arrScale.length == 0) {
          for (let i = 0; i < arrFlight_origin.length; i++) {
            for (let j = 0; j < arrFlight_destination.length; j++) {
              var result = this.flights.find(flight =>
                flight.origin === arrFlight_origin[i].destination &&
                flight.destination === arrFlight_destination[j].origin
              );
              if (result != undefined) {
                arrScale.push(arrFlight_origin[i]);
                arrScale.push(result);
                arrScale.push(arrFlight_destination[j]);
              }
            }
          }
          if (arrScale.length > 3) {
            this.journeys = this.getJourneys(arrScale)
            //console.log('Datos3: ', this.journeys)
          } else if (arrScale.length == 0) {
            arrScale.push(arrFlight_origin[0]);
            const newArrFlight_origin = this.flights.filter(flight =>
              flight.origin === arrFlight_origin[0].destination
            );
            const newArrFlight_destination = this.flights.filter(flight =>
              flight.destination === arrFlight_destination[0].origin
            );
            if (newArrFlight_origin.length > 0 && newArrFlight_destination.length > 0) {
              //Vuelos con una escala
              for (let i = 0; i < newArrFlight_origin.length; i++) {
                for (let j = 0; j < newArrFlight_destination.length; j++) {
                  if (newArrFlight_origin[i].destination === newArrFlight_destination[j].origin) {
                    arrScale.push(newArrFlight_origin[i]);
                    arrScale.push(newArrFlight_destination[j]);
                  }
                }
              }
            }
            arrScale.push(arrFlight_destination[0]);
            //console.log(arrScale)
            this.journey = {
              flights: arrScale,
              origin: this.formularioBusqueda.value.origen!,
              destination: this.formularioBusqueda.value.destino!,
              price: arrScale.reduce((totalprice, item) => totalprice + item.price, 0)
            }
            this.journeys.push(this.journey);

          } else {
            //console.log('Datos: ', arrScale);
            this.journey = {
              flights: arrScale,
              origin: this.formularioBusqueda.value.origen!,
              destination: this.formularioBusqueda.value.destino!,
              price: arrScale.reduce((totalprice, item) => totalprice + item.price, 0)
            }
            this.journeys.push(this.journey);
          }

        } else if (arrScale.length > 3) { //Vuelos con una escala con varias opciones
          this.journeys = this.getJourneys(arrScale);
          //console.log('Vuelo con una escala: ', this.journeys);
        } else {
          this.journeys = [
            this.journey = {
              flights: arrScale,
              origin: this.formularioBusqueda.value.origen!,
              destination: this.formularioBusqueda.value.destino!,
              price: arrScale.reduce((totalprice, item) => totalprice + item.price, 0)
            },
          ];
          //console.log('Datos2: ', this.journeys);
        }
      } else {
        //console.log(this.isJourneys)
        this.isJourneys == true;
        this.openDialog(this.isJourneys);
      }
    }


  }

  getJourneys(arrScale: Array<any>): Array<Journey> {
    let arrScale1 = arrScale.slice(0, arrScale.length / 2);
    let arrScale2 = arrScale.slice(arrScale.length / 2, arrScale.length);
    let price1 = arrScale1.reduce((totalprice, item) => totalprice + item.price, 0);
    let price2 = arrScale2.reduce((totalprice, item) => totalprice + item.price, 0);
    this.journeys = [
      this.journey = {
        flights: arrScale1,
        origin: this.formularioBusqueda.value.origen!,
        destination: this.formularioBusqueda.value.destino!,
        price: price1
      },
      this.journey = {
        flights: arrScale2,
        origin: this.formularioBusqueda.value.origen!,
        destination: this.formularioBusqueda.value.destino!,
        price: price2
      },
    ];
    return this.journeys
  }

  getFlights(): any {
    this._flightService.getFlights().subscribe({
      next: (response: any) => {
        if (response) {
          this.flights = response;
        }
      },
      error: (err: any) => {
        return null
      }
    });
  }

  openDialog(isJourney: Boolean) {
    const dialogo1 = this.dialog.open(DialogFlightComponent, {
      data: []
    });

  }



}
