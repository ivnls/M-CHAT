import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useReg } from '../context/RegContext';
import { useScore } from "../context/ScoreContext";

const ProtectedRoute = ({ children }) => {
    const { nomeMae } = useReg();
    const { erros } = useScore();
    const location = useLocation();

    if (nomeMae === undefined || nomeMae === null) {
        return <Navigate to="/" replace />;
    } else if (location.pathname === "/resultado") {
        if (erros === null) {
            return <Navigate to="/questionario" replace />;
        }
       console.log(erros);
    }

    return children;
}

export default ProtectedRoute;