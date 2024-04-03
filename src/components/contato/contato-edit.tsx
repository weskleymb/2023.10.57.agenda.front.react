import React, { useEffect, useState } from "react";
import axios from "axios";

import { Contato } from "../../models/contato";
import { useNavigate, useParams } from "react-router-dom";

const ContatoEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [contato, setContato] = useState<Contato | undefined>(undefined);

    useEffect(() => {
        const fetchContato = async () => {
            const resposta = await axios.get(`http://localhost:8080/contatos/${id}`);
            setContato(resposta.data);
        };
        fetchContato();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!contato) return;

        try {
            await axios.put(`http://localhost:8080/contatos/${id}`, contato);
            navigate('/contatos');
        } catch (error) {
            console.error('Houve um erro ao salvar o contato:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Atualiza o estado de maneira imutável
        setContato((prevContato) => {
            if (!prevContato) return prevContato;

            // Exemplo para campos simples
            if (name in prevContato) {
                return { ...prevContato, [name]: value };
            }

            // Exemplo para propriedades aninhadas como 'fone' e 'endereco'
            if (name.startsWith('fone.')) {
                const [, key] = name.split('.');
                return { ...prevContato, fone: { ...prevContato.fone, [key]: value } };
            }

            if (name.startsWith('endereco.')) {
                const [, key] = name.split('.');
                return { ...prevContato, endereco: { ...prevContato.endereco, [key]: value } };
            }

            return prevContato;
        });
    };

    if (!contato) return <div>Carregando...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={contato.nome || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
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
                    name="fone.numero"
                    value={contato?.fone.numero}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="tipoFone">Tipo do Telefone</label>
                <select id="tipoFone" name="fone.tipoFone" value={contato?.fone.tipoFone} className="form-select" onChange={handleChange}>
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
                    name="endereco.logradouro"
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
                    name="endereco.numero"
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