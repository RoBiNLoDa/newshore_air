export class Destination {

    public options:Array<any>;

    constructor(
        public code: string,
        public city: string,
        public country: string
    ){
        this.options= [
            {code: 'BCN', city: 'Barcelona', country: 'España' },
            {code: 'BOG', city: 'Bogotá', country: 'Colombia' },
            {code: 'CAN', city: 'Cantón', country: 'China' },
            {code: 'CTG', city: 'Cartagena de Indias', country: 'Colombia' },
            {code: 'MAD', city: 'Madrid', country: 'España' },
            {code: 'MDE', city: 'Medellín', country: 'Colombia' },
            {code: 'MEX', city: 'Ciudad de México', country: 'México' },
            {code: 'MZL', city: 'Manizales', country: 'Colombia' },
            {code: 'PEI', city: 'Pereira', country: 'Colombia' },
            {code: 'LIM', city: 'Lima', country: 'Perú'}
        ]
    }
}