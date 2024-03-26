import React, { useEffect, useState } from "react";

import Contato from "../../models/contato";

interface Props {
    contato?: Contato;
    onSave: () => void;
}

const ContatoForm: React.FC<Props> = ({ contato, onSave }) => {

    const [nome, setNome] = useState('');
    // const [fone, setFone] = useState(null);
    const [email, setEmail] = useState('');
    // const [endereco, setEndereco] = useState(null);

    useEffect(() => {
        setNome(contato?.nome || '');
        // setFone(contato?.fone || new Fone(0, '', TipoFone.CELULAR));
        setEmail(contato?.email || '');
        // setEndereco(contato.endereco || new Endereco('', '', '', ''));
    }, [contato]);

    const handleSubmit = async (evento: React.FormEvent) => {
        evento.preventDefault();
        if (contato && contato.id) {
            // await atualizarContato(contato.id);
        } else {
            // await criarContato();
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    );
}


export default ContatoForm;