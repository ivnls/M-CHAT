import React from "react";
import RiskProbBar from "../components/RiskProbBar";
import Header from "../components/Header";
import Aviso from "../components/Aviso";

function ResultadoPage() {

    const data = new Date();
    const dataFormatada = data.toLocaleString("pt-BR");

    return(
        <>
            <Header subtitle={"Resultado"} />
            <RiskProbBar/>
            <div className="m-8">
                <Aviso></Aviso>
            </div>
        </>
    );
}

export default ResultadoPage;