import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const [finalScore, setFinalScore] = useState(sessionStorage.getItem('score_mchat'));
    const [conclusionDate, setFinalConclusionDate] = useState(sessionStorage.getItem('conclusionDate_mchat'));

    const setScore = (finalScore) => {
        setFinalScore(finalScore);
    };

    const setConclusionDate = (conclusionDate) => {
        setFinalConclusionDate(conclusionDate);
    };

    const resetScore = () => {
        setScore(null);
        setData(null)
        sessionStorage.removeItem('score_mchat');
        sessionStorage.removeItem('conclusionDate_mchat');
    };

    const valor = {
        finalScore,
        conclusionDate,
        setScore,
        setConclusionDate,
        resetScore
    };

    return <ScoreContext.Provider value={valor}>{children}</ScoreContext.Provider>;
};

export const useScore = () => {
    return useContext(ScoreContext);
};