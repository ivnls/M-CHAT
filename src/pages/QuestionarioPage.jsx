import React from "react";
import InfoReg from "../components/InfoReg";
import AnsForm from "../components/AnsForm";

function QuestionarioPage() {

    // aqui a página de questionário é montada
    return(
        <div className="flex justify-center flex-col">  
            <InfoReg />
            <AnsForm />
        </div>
    );
}

export default QuestionarioPage;