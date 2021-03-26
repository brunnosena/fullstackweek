import api from './api';

class PessoaDataService{
    
    retriveAllPessoas(){
        return api.get('/pessoas');
    }

    updatePessoa(pessoa: any, codigo: number){
        return api.put(`pessoas/${codigo}`, pessoa);
    }
}

export default new PessoaDataService();