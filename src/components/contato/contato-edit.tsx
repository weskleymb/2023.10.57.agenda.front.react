import React, { useEffect, useState } from "react";
import axios from "axios";

import { Contato } from "../../models/contato";
import { useNavigate, useParams } from "react-router-dom";

const ContatoEdit: React.FC = () => {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const [contato, setContato] = useState<Contato>();

    useEffect(() => {
        const fetchContato = async () => {
          const response = await axios.get(`http://localhost:8080/contatos/${id}`);
          setContato(response.data);
        };
        fetchContato();
      }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const resposta = await axios.put('http://localhost:8080/contatos', contato);
            navigate('/contatos');
        } catch (error) {
            console.error('Houve um erro ao salvar o contato:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContato({
            ...contato,
            [name]: value
            } as any);
      };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={contato?.nome}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={contato?.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="numeroFone">Número do Telefone</label>
                <input
                    type="text"
                    className="form-control"
                    id="numeroFone"
                    value={contato?.fone.numero}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="tipoFone">Tipo do Telefone</label>
                <select id="tipoFone" className="form-select" onChange={handleChange}>
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
                    value={contato?.endereco.logradouro}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="numeroEndereco">Número do Endereço</label>
                <input
                    type="text"
                    className="form-control"
                    id="numeroEndereco"
                    value={contato?.endereco.numero}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    );

}

export default ContatoEdit;