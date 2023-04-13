import React from 'react'
import { Link } from 'react-router-dom'
import LogoSrc from "./img/logo.svg"

export default function Logo({ setSelectTab, setAnchorPaginate, setSearchQuery }) {

    const toUp = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }

    const homePage = () => {
        setSelectTab("all"); 
        setAnchorPaginate(true);
        setSearchQuery("")
        toUp()
    }

    return (
        <div>
            <Link to="thr_homework3_dogs3" onClick={() => homePage()}>
                <img className='logo' src={LogoSrc} alt="Logo" />
            </Link>
        </div>
    )
}
