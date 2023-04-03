import React, { useState } from 'react'
import s from "./faq.module.css"

export default function Faq({ item }) {

const [toogle, setToogle] = useState(false)

const handleToogle = () => {
  setToogle(!toogle)
}

  return (
    <div className={s.wrapper}>
      <h4 className={`${s.title} ${!toogle && s.active}`} onClick={handleToogle}>{item.title}</h4>
      <div className={`${s.content} ${toogle && s.active}`}>
        <div className={s.contentWrapper}>{item.content}</div>
      </div>
    </div>
  )
}
