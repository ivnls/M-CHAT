import React from "react";

function Aviso() {
    return(

        <div id="alert-additional-content-4" className="p-4 mb-4 border text-center lg:text-start border-white rounded-lg dark:bg-slate-700 dark:text-yellow-300" role="alert">
        <div className="flex items-center justify-center lg:justify-start">
          <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Aviso!</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
        Como na maioria dos testes de rastreio, poderá existir um grande número de falsos positivos, indicando que nem todas as crianças que constam neste questionário irão ser diagnosticadas com esta perturbação. No entanto, estes resultados podem apontar para a existência de outras anomalias do desenvolvimento, sendo por isso necessária a avaliação por profissionais desta área.
        </div>
      </div>
    );
}

export default Aviso;