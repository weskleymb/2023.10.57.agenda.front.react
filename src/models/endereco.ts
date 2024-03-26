
export default class Endereco {

    constructor(
        public id: number,
        public logradouro: string,
        public numero: string,
        public bairro: string,
        public cidade: string,
        public estado: string,
        public cep: string
    ) {
        this.id = id;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }

}