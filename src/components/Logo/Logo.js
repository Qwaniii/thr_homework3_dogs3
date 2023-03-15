import React from 'react'
import { Link } from 'react-router-dom'
import LogoSrc from "./img/logo.svg"

export default function Logo({ setSelectTab, setAnchorPaginate }) {
    return (
        <div>
            <Link to="thr_homework3_dogs3" onClick={() => {setSelectTab("all"); setAnchorPaginate(true)}}>
                <img src={LogoSrc} alt="Logo" />
            </Link>
        </div>
    )
}
