import { Transport } from "./transport";

export class Flight{

    /*static flightFromJson( obj:any){
        return new Flight(
            obj['transport'],
            obj['origin'],
            obj['destination'],
            obj['price'],
        );

    }*/

    constructor(
        public transport: Transport,
        public origin: string,
        public destination: string,
        public price: number,
    ){

    }
}