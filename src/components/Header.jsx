import React from "react";

import logo from "../assets/logo.svg";
import susLogo from "../assets/sus-logo.svg";
import ifrsLogo from "../assets/ifrs-logo.svg";
import altoFelizBrasao from "../assets/altofelizbrasao.svg";
import teacolheLogo from "../assets/teacolhe-logo.svg";

function Header({ subtitle }) {
    return (
        <header className="flex flex-col lg:flex-row w-full items-center justify-between gap-10 border-b-8 rounded-b-3xl bg-gradient-to-t from-blue-950 to-cyan-600 border-slate-800 text-white">
            
            <div className="flex flex-row items-center gap-5 lg:py-8 pl-6 pt-4">
                <img src={logo} className="h-20 lg:h-28 w-auto" alt="Logo M-CHAT" />
                <div className="flex flex-col">
                    <h1 className="text-xl lg:text-2xl font-bold">M-CHAT DIGITAL</h1>
                    <p>{subtitle}</p>
                </div>
            </div>

            <div className="flex flex-row items-center gap-5 px-5 pb-4">
                <img src={susLogo} className="h-8 lg:h-16 w-auto " alt="Logo do SUS" />
                <img src={ifrsLogo} className="h-14 lg:h-24 w-auto" alt="Logo do IFRS" />
                <img src={altoFelizBrasao} className="h-10 lg:h-20 w-auto" alt="Brasão de Alto Feliz" />
                <img src={teacolheLogo} className="h-10 lg:h-20 w-auto" alt="Logo do TECAcolhe" /> 
            </div>

        </header>
    );
}

export default Header;