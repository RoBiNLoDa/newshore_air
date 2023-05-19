export class Coin{

    constructor(
        public coin: string,
        public value: number,
        public country: string
    ){
        
    }

    static getCoins(){
        let coins:Array<any>;
        coins=[
            {coin: 'USD', value: 1, country: 'USA'},
            {coin: 'COP', value: 4532.1, country: 'Colombia'},
            {coin: 'EUR', value: 0.92, country: 'Europa'},
            {coin: 'CAD', value: 1.35, country: 'Canada'}
        ];
        return coins
    }
    
}