import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import PessoaDataService from "../../services/PessoaDataService";

const { Column } = Table;

interface Pessoa {
  codigo: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  idade: number;
  dataNascimento: string;
  isVacinada: boolean;
}

export const ListaPessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);  

  useEffect(() => {
    refreshPessoas();
  }, []);

  const refreshPessoas = () => {
    PessoaDataService.retriveAllPessoas().then((response) => {
      console.log(response);
      setPessoas(response.data);
    });
  };

  const success = (record: Pessoa) => { 
    const pessoa = pessoas.map(p => {
      if (p.codigo === record.codigo) {
        record.isVacinada = !record.isVacinada
      }
      return p;
    });
    setPessoas(pessoa);
    PessoaDataService.updatePessoa(record, record.codigo);
    message.success("Status alterado com sucesso!");
  };

  return (
    <div className="container">
      <h2>PESSOAS CADASTRADAS</h2>
      <div className="container">
        <Table dataSource={pessoas}>
          <Column title="NOME" dataIndex="nome" key="nome" />
          <Column title="CPF" dataIndex="cpf" key="cpf" />
          <Column title="TELEFONE" dataIndex="telefone" key="telefone" />
          <Column title="EMAIL" dataIndex="email" key="email" />
          <Column
            title="VACINADA"
            dataIndex="isVacinada"
            key="isVacinada"
            render={(text, record: Pessoa) => <p>{String(record.isVacinada)}</p>}
          />
          <Column
            title="ATUALIZAR"
            key="atualizar"
            render={(text, record: Pessoa) => (
              <Button onClick={() => success(record)} type="primary">
                Alterar Status
              </Button>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
