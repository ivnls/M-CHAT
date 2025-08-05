import { React, useState } from "react";
import ScoreResult from "../components/ScoreResult";
import Header from "../components/Header";
import Aviso from "../components/Aviso";
import InfoReg from "../components/InfoReg"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TemplateAvaliacao from "../components/TemplateAvaliacao";

function ResultadoPage() {

    const data = new Date();
    const dataFormatada = data.toLocaleString("pt-BR");

    const [clicked, setClicked] = useState(false);

    const handleGerarPdf = () => {
        setClicked(true);
        const input = document.getElementById('pdf');

        setTimeout(() => {
            html2canvas(input, { scale: 4 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                
 
                const pdf = new jsPDF('p', 'mm', 'a4');
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                
                pdf.save('avaliacao-mchat.pdf');
            });
        }, 600) //atraso para carregar fontes e svgs
    };

    return(
        <div className="flex flex-col"> 
            <Header subtitle={"Resultado"} />
            <InfoReg final={dataFormatada} />
            <div className="m-2 lg:max-w-6xl lg:mx-auto">
                <ScoreResult/>
            </div>
            

            <div id="pdf" style={{ position: 'absolute', left: '-9999px' }}>
                <TemplateAvaliacao />
            </div>


            <div className="m-8 lg:max-w-xl lg:mx-auto">
                <Aviso />
            </div>

            <div onClick={clicked ? "" : handleGerarPdf} className="flex mx-auto gap-1 items-center mb-6 p-8 rounded-lg bg-blue-700 hover:bg-blue-800 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <p>Gerar Relatório em PDF</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={clicked ? "size-6" : "hidden"}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
        </div>
    );
}

export default ResultadoPage;