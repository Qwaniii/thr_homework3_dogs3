import React from 'react'
import s from "./header.module.css"
import Logo from "../Logo/Logo"
import Search from "../Search/Search"
import api from '../../Api/Api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ReactComponent as Exit } from "./img/exit.svg"
import Accordeon from "../Accordeon/Accordeon"
import { useSelector } from 'react-redux'
import { user } from '../../storage/reducers/userReduce'

export default function Header({searchQuery,
                                setSearchQuery, 
                                setModalLogin, 
                                setIsToken,
                                isToken,
                                modalRegistr,
                                setModalRegistr,
                                myReviewArr,
                                anchorPaginate,
                                setAnchorPaginate,
                                setSelectTab,
                                setPage,
                                basket
                              }) {

  const navigate = useNavigate()
  const currentUser = useSelector(user)

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
            <Logo setSelectTab={setSelectTab} setAnchorPaginate={setAnchorPaginate} setSearchQuery={setSearchQuery}/>
          </div>
          <div className={s.search}>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} isToken={isToken} anchorPaginate={anchorPaginate} setPage={setPage}/>
          </div>
          {isToken 
          ? 
          <div className={s.enter}>
            <div>
              {/* {!currentUser.email && `Войти`} */}
              {currentUser && 
              <>
              <div className={s.info}  >
                <span className={s.email} ><b>E-mail: </b>{currentUser.email}</span>
                <span className={s.name}> <b>Имя:</b> {currentUser.name}</span>
              </div>
              </>}
              {/* {currentUser.name && <span className={s.name}> <b>Имя:</b> {currentUser.name} <span className={s.about}><b>Должность: </b>{currentUser.about}</span></span>} */}
            </div>
            <div onClick={(e) => handleLogOut(e)}><Exit className={s.exit}/></div>
            <div className={s.accordeon}>
              <Accordeon myReviewArr={myReviewArr} basket={basket}> 
                <div className={s.accAvatar}><img src={currentUser.avatar} alt={currentUser.name}></img></div>
                <div>{currentUser.name}</div>
                <div>{currentUser.about}</div>
              </Accordeon> 
            </div>
            {/* {currentUser.name && <button className={s.btn}>
              Изменить
            </button>} */}
          </div>
          :
          <div className={s.enter}>
            <Link to="thr_homework3_dogs3/login" className={s.linkwrap}><button onClick={() => setModalLogin(true)} className={s.enterBtn}>Войти</button></Link>
            <Link to="thr_homework3_dogs3/registration" className={s.linkwrap}><button onClick={() => setModalRegistr(true)} className={s.enterBtn}>Регистрация</button></Link>
          </div>}
        </div>
      </div>
    </header>
  )
}
