import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Contato } from '../../models/contato';
import { Link } from 'react-router-dom';

const ContatoList: React.FC = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/contatos');
        setContatos(response.data);
      } catch (error) {
        console.error('Houve um erro ao buscar os contatos:', error);
      }
    };
    fetchContatos();
  }, []);

  return (
    <div>
      <h2>Lista de Contatos</h2>
      <ul>
        {contatos.map(contato => (
          <li key={contato.id}>
            {contato.nome} 
            - {contato.fone.numero} 
            - {contato.email} 
            - <Link to={`/contatos/${contato.id}`} className='btn btn-primary'>
                Editar
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContatoList;
