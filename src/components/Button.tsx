import { ButtonHTMLAttributes } from "react";
import "../App.css"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    width: string;
    padding: string;
}

export function Button({title, width, padding, ...rest }: ButtonProps){
    return(
        <button  className="ButtonPrincipal"
            style={{
                width: width,
                padding: padding
            }}
            {...rest}
        >
            {title}
        </button>
    )
}