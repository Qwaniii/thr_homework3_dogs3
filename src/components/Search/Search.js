import React from 'react'
import s from "./search.module.css"

export default function Search({setSearchQuery}) {
  return (
    <div className={s.search}>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск">

        </input>
    </div>
  )
}
