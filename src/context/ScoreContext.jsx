import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {

    const [finalScore, setFinalScore] = useState(sessionStorage.getItem('score_mchat'));
    const [conclusionDate, setFinalConclusionDate] = useState(sessionStorage.getItem('conclusionDate_mchat'));

    const setScore = (finalScore) => {
        if (finalScore === null || finalScore === undefined) {
            sessionStorage.removeItem('score_mchat');
        } else {
            sessionStorage.setItem('score_mchat', finalScore);
        }
        setFinalScore(finalScore);
    };

    const setConclusionDate = (conclusionDate) => {
        if (conclusionDate === null || conclusionDate === undefined) {
            sessionStorage.removeItem('conclusionDate_mchat');
        } else {
            sessionStorage.setItem('conclusionDate_mchat', conclusionDate);
        }
        setFinalConclusionDate(conclusionDate);
    };

    const resetScore = () => {
        setFinalScore(null);
        setFinalConclusionDate(null);
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