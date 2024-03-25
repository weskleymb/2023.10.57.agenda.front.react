import React, { useState, useEffect } from 'react';
import axios from 'axios';

// declaração de tipos
interface Fone {
    id: number;
    numero: string;
}

interface Contato {
  id: number;
  nome: string;
  fone: Fone;
}

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
            {contato.nome} - {contato.fone.numero}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContatoList;
