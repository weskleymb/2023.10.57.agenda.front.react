import React, { useState } from "react";
import axios from "axios";

import { Contato } from "../../models/contato";
import { useNavigate } from "react-router-dom";

type Props = {
    onAddContato: (contato: Contato) => void;
}

const ContatoForm: React.FC<Props> = ({ onAddContato }) => {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [numeroFone, setNumeroFone] = useState('');
    const [tipoFone, setTipoFone] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numeroEndereco, setNumeroEndereco] = useState('');

    const handleSubmit = async (evento: React.FormEvent) => {
        evento.preventDefault();
        const newContato = {
            nome: nome,
            email: email,
            fone: {
                numero: numeroFone,
                tipoFone: tipoFone
            },
            endereco: {
                logradouro: logradouro,
                numero: numeroEndereco,
                bairro: '',
                cidade: '',
                estado: '',
                cep: ''
            }
        };
        
        try {
            const resposta = await axios.post('http://localhost:8080/contatos', newContato);
            onAddContato(resposta.data);
            navigate('/contatos');
        } catch (error) {
            console.error('Houve um erro ao salvar o contato:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="numeroFone">Número do Telefone</label>
                <input
                    type="text"
                    className="form-control"
                    id="numeroFone"
                    value={numeroFone}
                    onChange={(evento) => setNumeroFone(evento.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="tipoFone">Tipo do Telefone</label>
                <select id="tipoFone" className="form-select" onChange={(evento) => setTipoFone(evento.target.value)}>
                    <option value="CELULAR">Celular</option>
                    <option value="RESIDENCIAL">Residencial</option>
                    <option value="COMERCIAL">Comercial</option>
                </select>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                    type="text"
                    className="form-control"
                    id="logradouro"
                    value={logradouro}
                    onChange={(evento) => setLogradouro(evento.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="numeroEndereco">Número do Endereço</label>
                <input
                    type="text"
                    className="form-control"
                    id="numeroEndereco"
                    value={numeroEndereco}
                    onChange={(evento) => setNumeroEndereco(evento.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    );

}

export default ContatoForm;