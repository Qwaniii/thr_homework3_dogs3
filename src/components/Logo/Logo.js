import React from 'react'
import LogoSrc from "./img/logo.svg"

export default function Logo() {
    return (
        <div>
            <a href="#">
                <img src={LogoSrc} alt="Logo" />
            </a>
        </div>
    )
}
