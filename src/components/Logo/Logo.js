import React from 'react'
import { Link } from 'react-router-dom'
import LogoSrc from "./img/logo.svg"

export default function Logo({ setSelectTab, setAnchorPaginate, setSearchQuery }) {

    const homaPage = () => {
        setSelectTab("all"); 
        setAnchorPaginate(true);
        setSearchQuery("")
    }

    return (
        <div>
            <Link to="thr_homework3_dogs3" onClick={() => homaPage()}>
                <img className='logo' src={LogoSrc} alt="Logo" />
            </Link>
        </div>
    )
}
