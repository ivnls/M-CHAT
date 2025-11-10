import React, { useState } from "react";
import RelatorioResultados from "../components/RelatorioPCidade";
import AdminLogin from "../components/AdminLogin";

function AdminPage() {

    const [isLogged, setLogged] = useState(false);

    const hLoginSucess = () => {
        setLogged(true);
    }

    return (
        <>
            {!isLogged ? (
                <AdminLogin loginSuccess={hLoginSucess}></AdminLogin>
            ) : (
                <RelatorioResultados></RelatorioResultados>
            )}

        </>
    );
}

export default AdminPage;