import React from 'react'
import s from "./header.module.css"
import Logo from "../Logo/Logo"
import Search from "../Search/Search"
import api from '../../Api/Api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ReactComponent as Exit } from "./img/exit.svg"

export default function Header({currentUser, 
                                setSearchQuery, 
                                setModalLogin, 
                                setIsToken,
                                isToken,
                                modalRegistr,
                                setModalRegistr
                              }) {

  const navigate = useNavigate()

  const handleLogOut = (e) => {
    e.preventDefault(); 
    sessionStorage.removeItem('token'); 
    setIsToken(null); 
    navigate("/thr_homework3_dogs3");
    api._token = null
  }

  return (
    <header>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.logo}>
            <Logo />
          </div>
          <div className={s.search}>
            <Search setSearchQuery={setSearchQuery} isToken={isToken}/>
          </div>
          {isToken 
          ? 
          <div className={s.enter}>
            <div>
              {/* {!currentUser.email && `Войти`} */}
              {currentUser && 
              <>
              <span className={s.email}><b>E-mail: </b>{currentUser.email}</span>
              <span className={s.name}> <b>Имя:</b> {currentUser.name}</span>
              </>}
              {/* {currentUser.name && <span className={s.name}> <b>Имя:</b> {currentUser.name} <span className={s.about}><b>Должность: </b>{currentUser.about}</span></span>} */}
            </div>
            <div onClick={(e) => handleLogOut(e)}><Exit className={s.exit}/></div>

            {/* {currentUser.name && <button className={s.btn}>
              Изменить
            </button>} */}
          </div>
          :
          <div className={s.enter}>
            <Link to="thr_homework3_dogs3/login" className={s.linkwrap}><button onClick={() => setModalLogin(true)} className={s.enterBtn}>Войти</button></Link>
            <Link to="thr_homework3_dogs3/registration" className={s.linkwrap}><button onClick={() => setModalRegistr(true)} className={s.enterBtn}>Регистрация</button></Link>
          </div>}
            {/* <div><Accordeon/></div> */}
        </div>
      </div>
    </header>
  )
}
