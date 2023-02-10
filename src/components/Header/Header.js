import React from 'react'
import s from "./header.module.css"
import Logo from "../Logo/Logo"
import Search from "../Search/Search"

export default function Header({currentUser, setSearchQuery}) {
  return (
    <header>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.logo}>
            <Logo />
          </div>
          <div className={s.search}>
            <Search setSearchQuery={setSearchQuery}/>
          </div>
          <div className={s.enter}>
            {!currentUser.email && `Войти`}
            {currentUser.email && <span className={s.email}>{currentUser.email}</span>}
            {currentUser.name && <div className={s.nameAbout}> Имя: {currentUser.name} {currentUser.about}</div>}
            {currentUser.name && <button className={s.btn}>
              Изменить
            </button>}
          </div>
        </div>
      </div>
    </header>
  )
}
