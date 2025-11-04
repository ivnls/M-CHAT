import React from "react";
import { createContext, useState, useContext } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {

    //startDate -> usar no futuro
    const [startDate, setFinalStartDate] = useState(sessionStorage.getItem('startDate_mchat'));
    const [conclusionDate, setFinalConclusionDate] = useState(sessionStorage.getItem('conclusionDate_mchat'));

    const setStartDate = (date) => {
        setFinalStartDate(date);
        sessionStorage.setItem('startDate_mchat', date);
    }

    const setConclusionDate = (date) => {
        setFinalConclusionDate(date);
        sessionStorage.setItem('conclusionDate_mchat', date);
    };

    const resetDate = () => {
        setFinalStartDate(null);
        setFinalConclusionDate(null);

        sessionStorage.removeItem('startDate_mchat');
        sessionStorage.removeItem('conclusionDate_mchat');
    };

    const valor = {
        startDate,
        conclusionDate,
        setConclusionDate,
        setStartDate,
        resetDate
    };

    return <DateContext.Provider value={valor}>{children}</DateContext.Provider>;
    
}   

export const useDate = () => {
    return useContext(DateContext);
};