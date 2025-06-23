import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const [erros, setErros] = useState(sessionStorage.getItem('erros_mchat'));

    const setScore = ({ erros }) => {
        setErros(erros);
    };

    const resetScore = () => {
        setScore(null);

        sessionStorage.removeItem('erros_mchat');
    };

    const valor = {
        erros,
        setScore,
        resetScore,
    };

    return <ScoreContext.Provider value={valor}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
    return useContext(ScoreContext);
};