import React from 'react'
import { Link } from 'react-router-dom'
import LogoSrc from "./img/logo.svg"

export default function Logo() {
    return (
        <div>
            <Link to="thr_homework3_dogs3">
                <img src={LogoSrc} alt="Logo" />
            </Link>
        </div>
    )
}
