import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Global } from "./global";
import { map } from "rxjs";
import { Flight } from "../models/flight";
import { Transport } from "../models/transport";

@Injectable()
export class FlightService {
    public url: string;
    public datos: any = [];
    public data: any = [];
    public transport: Transport;
    public flight: Flight;
    public flightCarrier: string;
    public flightNumber: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
        this.transport = new Transport("", "");
        this.flight = new Flight(this.transport, "", "", 0);
        this.flightCarrier = "";
        this.flightNumber = " "
    }

    getFlights() {
        return this._http.get<Flight>(this.url)
            .pipe(
                map((dats: any) => dats.map((dat: any) => {
                    return new Flight(
                        this.flight.transport = new Transport(dat.flightCarrier, dat.flightNumber),
                        this.flight.origin = dat.departureStation,
                        this.flight.destination = dat.arrivalStation,
                        this.flight.price = dat.price);
                }))
            );
    }

}