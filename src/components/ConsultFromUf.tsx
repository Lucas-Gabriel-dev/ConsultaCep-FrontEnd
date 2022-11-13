import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { Button } from "./Button";

type InfoPlace = {
    cep: string;
    logradouro: string;
    uf: string;
}

type DisplayDiv = {
    display: string;
}

export function ConsultFromUf(props: DisplayDiv){
    const [nameUf, setNameUf] = useState('');
    const [infoLocal, setInfoLocal] = useState<InfoPlace[]>([]);
    
    const MessageError = document.getElementById('MessageError')
    const TitleError = document.getElementById('titleError')
    const InfoLogradouro = document.getElementById('InfoUF')

    async function AllCepsInRegion(event: FormEvent) {
        event.preventDefault();
        
        try {
            const response = await api.get(`/ConsultarCep/uf/${nameUf}`)
            if(response.data){
                setInfoLocal(response.data)

                MessageError!.style.display = "none"
                InfoLogradouro!.style.display = "grid"
            }

            setNameUf("")
        } catch (error: ErrorEvent | any) {
            if(error?.response?.data?.msg == "UF is invalid!"){
                MessageError!.style.display = "flex"

                TitleError!.innerHTML = "Essa UF não existe!"
            }
            else if(error?.response?.data?.msg == "No record found"){
                MessageError!.style.display = "flex"

                TitleError!.innerHTML = "Não existe nenhum cep com esse " +
                "UF cadastrado"
            }
            else{
                MessageError!.style.display = "none"
                InfoLogradouro!.style.display = "none"

                alert("Ocorreu um erro ao consultar o cep, tente novamente!")
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
                <form onSubmit={AllCepsInRegion}>
                    <label htmlFor="uf"
                        style={{
                            paddingRight: "2%",
                        }}
                    >
                        UF
                    </label>

                    <select 
                        id="uf"
                        name="uf" 
                        onChange={event => setNameUf(event.target.value)}
                        value={nameUf}
                        required
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
                    >
                        <option value="">Selecione</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="AP">AP</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                    </select>
                    
                    <Button type="submit"  title="Enviar" width="30%" padding=".8%"/>
                </form>
            </section>

            <div id="InfoUF"
                style={{
                    display: "none",
                    flexDirection: "column"
                }}
            >
                <p
                    style={{
                        fontSize: "clamp(1px, 2rem, 10vw)",
                        textDecoration: "underline",
                        margin: "5% 0px"
                    }}
                >
                    Todos os ceps da região de {infoLocal[0]?.uf} 
                </p>
                {infoLocal.map(repo => {
                    return(
                        <div 
                            className="FirstCollumn"
                            style={{
                                borderBottom: "1px solid black",
                                marginBottom: "3%"
                            }}
                        >
                            <p>Cep: <span>{repo?.cep}</span></p>
                            <p>Logradouro: <span>{repo?.logradouro} - {repo?.uf}</span></p>
                        </div> 
                    )
                })}
                
            </div>
        </div>
    )
}