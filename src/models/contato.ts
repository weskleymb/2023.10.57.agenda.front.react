import Fone from './fone';
import Endereco from './endereco';

export default class Contato {

    constructor(
        public id: number,
        public nome: string,
        public fone: Fone,
        public email: string,
        public endereco: Endereco
    ) {
        this.id = id;
        this.nome = nome;
        this.fone = fone;
        this.email = email;
        this.endereco = endereco;
    }

}