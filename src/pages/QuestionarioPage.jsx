import React from "react";
import InfoReg from "../components/InfoReg";
import AnsForm from "../components/AnsForm";
import Header from "../components/Header";

function QuestionarioPage() {

    // aqui a página de questionário é montada
    return(
        <div className="flex justify-center flex-col">  
            <Header subtitle={"Questionário"} />
            <InfoReg />
            <AnsForm />
        </div>
    );
}

export default QuestionarioPage;