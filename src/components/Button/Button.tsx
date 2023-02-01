import { useState } from "react";
import { styled } from "base-styled-ts"

type typeBtn =  "default" | "shadow"

interface IButton {
    text?: string;
    type?: typeBtn
}

function Button({text = "", type = "default"}: IButton) {
    const [isClick, setIsClick] = useState(false)

    const defaultStyle = `
        height: 50px;
        min-width: 100px;
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        transition: background-color 200ms linear;
        border: none;
        background-color: ligthgray;
        &:hover {
            cursor: pointer;
            background-color: blue;
            color: white;
        }
        @media(max-width: 1300px) {
            font-size: 20px;
        }
    `

    const DefaultButton = styled("button")`
        ${defaultStyle}
    `;
    
    const ButtonWithShadow = styled(DefaultButton)`
        ${defaultStyle}
        border: 1px solid gray;
        border-radius: 10px;
        transition: box-shadow 200ms linear;
        background-color: white;
        transform: scale(${isClick ? "0.9" : "1"});
        &:hover {
            background-color: none;
            box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        }
    `;
    
    if (type === "shadow") return <ButtonWithShadow onMouseUp={() => setIsClick(false)} onMouseDown={() => setIsClick(true)}>{text}</ButtonWithShadow>

    return <DefaultButton>{text}</DefaultButton>
}

export default Button