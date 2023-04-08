import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import s from "./search.module.css"

export default function Search({searchQuery, setSearchQuery, isToken, anchorPaginate, setPage}) {

  const location = useLocation()

  const arrUrl = ["favorite", "product", "my-review", "basket", "about-user", "faq"]

  const onChange = (e) => {
    setPage(1)
    setSearchQuery(e.target.value)
  }

  const empySearch = isToken && anchorPaginate && !arrUrl.some(path => location.pathname.includes(path))

  useEffect(() => {
    if(!empySearch) setSearchQuery("")
  }, [empySearch, setSearchQuery])

  return (
    <div className={s.search}>
        {empySearch
        // && !(location.pathname).includes("favorite") 
        // && !(location.pathname).includes("product")
        // && !(location.pathname).includes("my-review")
        // && !(location.pathname).includes("basket")
        ? <input  type="search" value={searchQuery} onChange={(e) => onChange(e)} placeholder="Поиск">
          </input>
        : <><input disabled type="search" value={searchQuery} placeholder="Поиск">
          </input></>}
    </div>
  )
}
