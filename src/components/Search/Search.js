import React from 'react'
import s from "./search.module.css"

export default function Search({setSearchQuery, isToken, anchorPaginate}) {
  return (
    <div className={s.search}>
        {isToken && anchorPaginate
        ? <input  type="search" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск">
          </input>
        : <input disabled type="search" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск">
          </input>}
    </div>
  )
}
