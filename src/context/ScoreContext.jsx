import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    //ler e parsear o sessionStorage
    const getInitialRespostas = () => {
        try {
            const item = sessionStorage.getItem('respostas_mchat');

            if (item === null || item === 'undefined') {
                return [];
            }
            return JSON.parse(item);

        } catch (error) {
            console.error("Erro ao parsear respostas do sessionStorage:", error);
            return []; 
        }
    };

    const getInitialCriticas = () => {
        const savedCriticas = sessionStorage.getItem('criticas_mchat');
        
        if (!savedCriticas) {
            return { A: 0, B: 0, C: 0, D: 0 };
        }

        try {
            return JSON.parse(savedCriticas);
        } catch (error) {
            console.error("Erro ao parsear 'criticas' do sessionStorage:", error);
            return { A: 0, B: 0, C: 0, D: 0 };
        }
    };

    const [finalScore, setFinalScore] = useState(sessionStorage.getItem('score_mchat'));
    const [finalCriticas, setFinalCriticas] = useState(getInitialCriticas);
    const [respostas, setFinalRespostas] = useState(getInitialRespostas);

    const setScore = (score) => {

        if (score === null || score === undefined) {
            sessionStorage.removeItem('score_mchat');
        } else {
            sessionStorage.setItem('score_mchat', score);
        }
        setFinalScore(score);
    };

const setCriticas = (novasCriticas) => {

        const valorParaSalvar = novasCriticas || { A: 0, B: 0, C: 0, D: 0 };
        sessionStorage.setItem('criticas_mchat', JSON.stringify(valorParaSalvar));
        setFinalCriticas(valorParaSalvar);
    };

    const setRespostas = (novasRespostas) => {

        const valorParaSalvar = novasRespostas || [];
        sessionStorage.setItem('respostas_mchat', JSON.stringify(valorParaSalvar));
        setFinalRespostas(valorParaSalvar);
    };

    const resetScore = () => {

        setFinalScore(null);
        setFinalCriticas({});
        setFinalRespostas({});
        
        sessionStorage.removeItem('score_mchat');
        sessionStorage.removeItem('criticas_mchat');
        sessionStorage.removeItem('respostas_mchat');
    };

    const valor = {
        finalScore,
        finalCriticas,
        respostas,
        setScore,
        setCriticas,
        setRespostas,
        resetScore
    };

    return <ScoreContext.Provider value={valor}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
    return useContext(ScoreContext);
};