import React from "react";
import { Navigate } from "react-router-dom";
import { useReg } from '../context/RegContext';

const ProtectedRoute = ({ children }) => {
    const { nomeMae } = useReg();

    if (nomeMae === undefined || nomeMae === null) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;