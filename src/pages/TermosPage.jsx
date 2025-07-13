import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Termos from "../components/Termos";

function TermosPage() {

    return(
        <div className="flex flex-col justify-center mb-8">
            <Header subtitle={"Termos"} />
            <Termos />
        </div>
    )
}

export default TermosPage;