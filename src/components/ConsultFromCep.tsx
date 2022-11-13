import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Button } from "./Button";

type InfoPlace = {
    id: number;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade?: any;
    ibge: string;
    gia: string;
}

type DisplayDiv = {
    display: string;
    consultCep?: boolean;
}

export function ConsultFromCep(props: DisplayDiv){
    const [numberCep, setNumberCep] = useState('');
    const [infoLocal, setInfoLocal] = useState<InfoPlace>();
    
    const MessageError = document.getElementById('MessageError')
    const TitleError = document.getElementById('titleError')
    const InfoLogradouro = document.getElementById('InformacoesLogradouro')

    useEffect(
        () => {
          setNumberCep("");
          setInfoLocal(undefined);
        },
        [props.consultCep],
    );

    async function ConsultCep(event: FormEvent) {
        event.preventDefault();

        try {
            const response = await api.get(`/ConsultarCep/${numberCep}`)
            if(response.data){
                setInfoLocal(response.data)

                MessageError!.style.display = "none"
                InfoLogradouro!.style.display = "grid"
            }

            setNumberCep("")
        } catch (error: ErrorEvent | any) {
            if(error?.response?.data?.msg == "Invalid CEP"){
                MessageError!.style.display = "flex"

                TitleError!.innerHTML = "Esse cep não existe!"
            }
            else if(error?.response?.data?.msg == "Cep not found"){
                MessageError!.style.display = "flex"

                TitleError!.innerHTML = "Esse cep não está cadastrado " +
                "em nossa base de dados!"
            }
            else{
                MessageError!.style.display = "none"
                InfoLogradouro!.style.display = "none"

                alert("Ocorreu um erro ao consultar o cep, tente novamente!")
            }
        }
    }

    async function AddNewCep(event: FormEvent){
        event.preventDefault();

        try {
            const response = await api.post(`/ConsultarCep/addcep/${numberCep}`)
            if(response.data){
                setInfoLocal(response.data)

                MessageError!.style.display = "none"
                InfoLogradouro!.style.display = "grid"
            }

            setNumberCep("")
        } catch (error: ErrorEvent | any) {
            if(error?.response?.data?.msg == "Invalid CEP"){
                MessageError!.style.display = "flex"

                TitleError!.innerHTML = "Esse cep não existe!"
            }
            else if(error?.response?.data?.msg == "The Cep has already been added to the database!"){
                MessageError!.style.display = "flex"
                InfoLogradouro!.style.display = "grid"

                TitleError!.innerHTML = "Esse cep já está cadastrado " +
                "em nossa base de dados!"

                setInfoLocal(error?.response.data.checkCepAdded);
            }
            else if(error?.response?.data?.msg == "Cep not found"){
                MessageError!.style.display = "flex"

                TitleError!.innerHTML = "Não foi possível encontrar esse cep!"
            }
            else{
                MessageError!.style.display = "none"
                InfoLogradouro!.style.display = "none"

                alert("Ocorreu um erro ao adicionar o cep, tente novamente!")
            }
        }
    }

    return(
        <div
            style={{
                display: props.display
            }}
        >
            <section>
                <form onSubmit={(event) => {props.consultCep ?  ConsultCep(event) : AddNewCep(event)}}>
                    <label htmlFor=""
                        style={{
                            paddingRight: "2%",
                        }}
                    >
                        CEP
                    </label>
                    <input 
                        type="text" 
                        onChange={event => setNumberCep(event.target.value)}
                        value={numberCep}
                        required
                        maxLength={9}
                        name="inputCep"
                        style={{
                            height: "4vh",
                            width: "30vw",
                            maxWidth: "200px",
                            marginRight: "2%",
                            padding: "0.5%",
                            backgroundColor: "#656565",
                            borderRadius: "6px",
                            borderColor: "#323238"
                        }}
                    />
                    
                    <Button type="submit"  title="Enviar" width="30%" padding=".8%"/>
                </form>
            </section>

            <p
                style={{
                    fontSize: "clamp(1px, 2rem, 10vw)",
                    textDecoration: "underline",
                    margin: "5% 0px"
                }}
            >
                {
                    props.consultCep ? 
                        "Informações sobre o logradouro da base de dados" : 
                        "Informações sobre o logradouro adicionado"
                }
            </p>

            <div id="InformacoesLogradouro"
                style={{
                    display: "none",
                    gridTemplateColumns: "60% 40%"
                }}
            >
                <div className="FirstCollumn">
                    <p>Cep: <span>{infoLocal?.cep}</span></p>
                    <p>Logradouro: <span>{infoLocal?.logradouro}</span></p>
                    <p>Localidade: <span>{infoLocal?.localidade}</span></p>
                    <p>Bairro: <span>{infoLocal?.bairro}</span></p>
                    <p>Unidade:<span>{infoLocal?.unidade}</span></p>
                </div>

                <div className="SecondCollumn">
                    <p>Complemento: <span>{infoLocal?.complemento}</span></p>
                    <p>UF: <span>{infoLocal?.uf}</span></p>
                    <p>IBGE: <span>{infoLocal?.ibge}</span></p>
                    <p>GIA: <span>{infoLocal?.gia}</span></p>
                </div> 
            </div>
        </div>
    )
}