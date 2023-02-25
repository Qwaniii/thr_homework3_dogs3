import React from 'react'
import { Link } from 'react-router-dom'
import LogoSrc from "./img/logo.svg"

export default function Logo() {
    return (
        <div>
            <Link to="/">
                <img src={LogoSrc} alt="Logo" />
            </Link>
        </div>
    )
}
