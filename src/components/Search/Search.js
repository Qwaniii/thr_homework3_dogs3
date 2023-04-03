import React from 'react'
import { useLocation } from 'react-router'
import s from "./search.module.css"

export default function Search({setSearchQuery, isToken, anchorPaginate}) {

  const location = useLocation()

  const arrUrl = ["favorite", "product", "my-review", "basket", "about-user", "faq"]

  return (
    <div className={s.search}>
        {isToken 
        && anchorPaginate 
        && !arrUrl.some(path => location.pathname.includes(path))
        // && !(location.pathname).includes("favorite") 
        // && !(location.pathname).includes("product")
        // && !(location.pathname).includes("my-review")
        // && !(location.pathname).includes("basket")
        ? <input  type="search" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск">
          </input>
        : <input disabled type="search" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск">
          </input>}
    </div>
  )
}
