import React from "react";
import RiskProbBar from "../components/RiskProbBar";
import Header from "../components/Header";
import Aviso from "../components/Aviso";
import InfoReg from "../components/InfoReg"

function ResultadoPage() {

    const data = new Date();
    const dataFormatada = data.toLocaleString("pt-BR");

    

    return(
        <div className="flex justify-center flex-col"> 
            <Header subtitle={"Resultado"} />
            <InfoReg final={dataFormatada} />
            <RiskProbBar/>
            <div className="m-8">
                <Aviso />
            </div>
        </div>
    );
}

export default ResultadoPage;