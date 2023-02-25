import React from 'react'
import s from "./header.module.css"
import Logo from "../Logo/Logo"
import Search from "../Search/Search"

export default function Header({currentUser, setSearchQuery}) {
  return (
    <header>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.logo}>
            <Logo />
          </div>
          <div className={s.search}>
            <Search setSearchQuery={setSearchQuery}/>
          </div>
          <div className={s.enter}>
            {!currentUser.email && `Войти`}
            {currentUser.email && <span className={s.email}><b>E-mail: </b>{currentUser.email}</span>}
            {currentUser.name && <span className={s.name}> <b>Имя:</b> {currentUser.name} <span className={s.about}><b>Должность: </b>{currentUser.about}</span></span>}
            {/* {currentUser.name && <button className={s.btn}>
              Изменить
            </button>} */}
          </div>
        </div>
      </div>
    </header>
  )
}
