import { useEffect, useState } from "react";
import { CepActions } from "../components/CepActions";
import { Button } from "../components/Button";

export function Home(){
    const [divLocalState, setDivLocalState] = useState('none');
    const [cepActionSelected, setCepActionSelected] = useState(false);
    const [ufActionSelected, setUfActionSelected] = useState(false);

    document.getElementById('ButtonBack')?.addEventListener('click', () => {
        if(divLocalState == "flex"){
            setDivLocalState('none')
        }

        document.getElementById('MessageError')!.style.display = "none"
        document.getElementById('InformacoesLogradouro')!.style.display = "none"
    })
    
    return (
        <div
            style={{
                fontFamily: "Roboto, sans-serif"
            }}
        >
            <header
                style={{
                    backgroundColor: "#202024",
                    height: "20vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <p
                    style={{
                        color: "white",
                        marginLeft: "5%",
                        fontSize: "clamp(1px, 2.5rem, 3vw)"
                    }}
                >
                    Olá, bem-vindo à consulta de cep’s  
                </p>
            </header>

            <p id="Title"
                style={{
                    fontSize: "clamp(1px, 2rem, 3vw)",
                    margin: "5%"
                }}
            >
                Selecione qual consulta deseja fazer:
            </p>

            <div
                style={{
                    height: "30vh",
                    width: "70vw",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Button 
                    title="LOGRADOUROS EXISTENTES NA BASE"
                    width="50%"
                    padding="2%"
                    onClick={
                        () => {
                        setDivLocalState("flex")
                        setCepActionSelected(true)  
                        setUfActionSelected(false)    
                    }}
                />

                <Button 
                    title="ADICIONAR NOVO CEP"
                    width="50%"
                    padding="2%"
                    onClick={
                        () => {
                        setDivLocalState("flex")
                        setCepActionSelected(false)   
                        setUfActionSelected(false)    
                    }}
                />

                <Button 
                    title="TODOS OS CEPS DE UMA REGIÃO"
                    width="50%"
                    padding="2%"
                    onClick={
                        () => {
                        setDivLocalState("flex")
                        setUfActionSelected(true)    
                    }}
                />
            </div>

            <CepActions 
                display={divLocalState} 
                consultCep={cepActionSelected} 
                consultCepsInRegion={ufActionSelected}
            />
        </div>
    )
}