import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const [erros, setErros] = useState(sessionStorage.getItem('erros_mchat'));
    const [data, setData] = useState(sessionStorage.getItem('datafinal_mchat'));

    const setScore = (erros) => {
        setErros(erros);
    };

    const setFinalData = (data) => {
        setData(data);
    };

    const resetScore = () => {
        setScore(null);
        setData(null)
        sessionStorage.removeItem('erros_mchat');
        sessionStorage.removeItem('datafinal_mchat');
    };

    const valor = {
        erros,
        data,
        setScore,
        resetScore,
        setFinalData
    };

    return <ScoreContext.Provider value={valor}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
    return useContext(ScoreContext);
};