import React, { createContext, useState, useContext } from "react";

const RegContext = createContext();

export const RegProvider = ({ children }) => {
    
    //armazena tudo no react e sessionstorage, evita limpar os dados ao recarregar
    const [nomeMae, setNomeMae] = useState(sessionStorage.getItem('nomeMae_mchat') || null);
    const [nomeCrianca, setNomeCrianca] = useState(sessionStorage.getItem('nomeCrianca_mchat') || null);
    const [idade, setIdade] = useState(sessionStorage.getItem('idade_mchat') || null);
    const [sexo, setSexo] = useState(sessionStorage.getItem('sexo_mchat') || null);
    const [cidade, setCidade] = useState(sessionStorage.getItem('cidade_mchat') || null);
    const [email, setEmail] = useState(sessionStorage.getItem('email_mchat') || null);

    const registrar = ({ nomeMae, nomeCrianca, idade, sexo, cidade, email }) => {
        //atualizar o estado no react
        setNomeMae(nomeMae);
        setNomeCrianca(nomeCrianca);
        setIdade(idade);
        setSexo(sexo);
        setCidade(cidade);
        setEmail(email);

        //salvar no sessionstorafe
        sessionStorage.setItem('nomeMae_mchat', nomeMae);
        sessionStorage.setItem('nomeCrianca_mchat', nomeCrianca);
        sessionStorage.setItem('idade_mchat', idade);
        sessionStorage.setItem('sexo_mchat', sexo);
        sessionStorage.setItem('cidade_mchat', cidade);
        sessionStorage.setItem('email_mchat', email);
    };

    const resetReg = () => {
        //limpar o estado do react
        setNomeMae(null);
        setNomeCrianca(null);
        setIdade(null);
        setSexo(null);
        setCidade(null);
        setEmail(null);
        
        //remover do sessionstorage
        sessionStorage.removeItem('nomeMae_mchat');
        sessionStorage.removeItem('nomeCrianca_mchat');
        sessionStorage.removeItem('idade_mchat');
        sessionStorage.removeItem('sexo_mchat');
        sessionStorage.removeItem('cidade_mchat');
        sessionStorage.removeItem('email_mchat');
    };

    const valor = {
        nomeMae,
        nomeCrianca,
        idade,
        sexo,
        cidade,
        email,
        registrar,
        resetReg,
    };

    return <RegContext.Provider value={valor}>{children}</RegContext.Provider>;
};

export const useReg = () => {
    return useContext(RegContext);
};