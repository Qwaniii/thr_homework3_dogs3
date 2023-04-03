import React from 'react'
import s from './footer.module.css'
import { Link } from 'react-router-dom'
import Logo from "../Logo/Logo"


export default function Footer({ setSelectTab, setAnchorPaginate }) {
  return (
    <footer className='footer'>
        <div  className='container'>
          <div className={s.wrapper}>
            <div >
              <Link className={s.link} to="thr_homework3_dogs3/faq">FAQ</Link>
            </div>
            <div className={s.logo}>
              <Logo setSelectTab={setSelectTab} setAnchorPaginate={setAnchorPaginate}/>
              <div>
                made by Oleg &copy;
              </div>
            </div>
            <div>
              Контакты
            </div>
          </div>
          
        </div>
    </footer>
  )
}