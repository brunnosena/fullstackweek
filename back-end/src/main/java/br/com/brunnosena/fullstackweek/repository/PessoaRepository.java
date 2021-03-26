package br.com.brunnosena.fullstackweek.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.brunnosena.fullstackweek.domain.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
