import { useEffect, useState } from "react";

import { Button } from "./Button";
import { ConsultFromCep } from "./ConsultFromCep";
import { ConsultFromUf } from "./ConsultFromUf";

type DisplayDiv = {
    display: string;
    consultCep?: boolean;
    consultCepsInRegion?: boolean;
}

export function CepActions(props: DisplayDiv){
    const [divLocalState, setDivLocalState] = useState("none");

    useEffect(
        () => {
          setDivLocalState(props.display);
        },
        [props.display],
    );

    return(
        <div
            id="CepActions"
            style={{
                fontSize: "clamp(1px, 1.5rem, 10vw)",
                fontFamily: 'Roboto, sans-serif',
                fontWeight: "bold",
                color: "white",
                position: "absolute",
                top: "0",
                width: "100vw",
                height: "100vh",
                display: divLocalState,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#6d6d6d6c",
            }}
        >
            <div 
                style={{
                    backgroundColor: "#202024",
                    width: "80vw",
                    height: "70vh",
                    minHeight: "500px",
                    padding: "5%",
                    borderRadius: "6px",
                    overflow: "auto"
                }}
            >
                <div id="MessageError"
                style={{
                    display: "none",
                    marginBottom: "5%"
                }}
                >
                    <p id="titleError">
                        
                    </p>
                </div>

                <ConsultFromCep 
                    display={props.consultCepsInRegion ? "none" : "grid"}
                    consultCep={props.consultCep}
                />
                <ConsultFromUf 
                    display={props.consultCepsInRegion ? "grid" : "none"} 
                />
                
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button 
                        title="VOLTAR" 
                        id="ButtonBack" 
                        onClick={() => {setDivLocalState("none")}} 
                        width="20%" 
                        padding="1%" 
                    />
                </div>
            </div>
        </div>
    )
}