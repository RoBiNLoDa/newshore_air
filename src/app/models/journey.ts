import { Flight } from "./flight";

export class Journey{

    

    constructor(
        public flights: Flight[],
        public origin: string,
        public destination: string,
        public price: number
    ){
        
    }
}