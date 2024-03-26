
export type Contato = {

    id: number;
    nome: string;
    email: string;
    fone: {
        id: number;
        numero: string;
        tipoFone: string;
    };
    endereco: {
        id: number;
        logradouro: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };

};
