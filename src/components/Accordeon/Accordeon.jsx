import React, { useContext, useState } from 'react'
import {ReactComponent as ImageAcc} from "./Img/treebars.svg"
import s from "./accordeon.module.css"
import { Link } from 'react-router-dom'
import { FavoriteContext } from '../../Context/FavoriteContext'
import cn from "classnames"

export default function Accordeon() {

  const [isAccordeon, setIsAccordeon] = useState(false)
  const { favoriteCards } = useContext(FavoriteContext)

  const toggle = () => {
    console.log("done", isAccordeon)
    setIsAccordeon(!isAccordeon)
  }

  return (
    <div>
      <div className={s.wrapper}>
        <ImageAcc style={{cursor: 'pointer', width: 20, height: 30}} onClick={toggle}/>
      </div>
      {isAccordeon && <div className={cn(s.window, {[s.active]: isAccordeon})}>
        <div style={{padding: 10, cursor: "pointer"}} onClick={toggle}>X</div>
        <div className={s.link}>
          <Link to="thr_homework3_dogs3/favorite" onClick={toggle} className={s.favorite}>Любимые продукты  {favoriteCards.length}</Link>
        </div>
      </div>}
    </div>
  )
}
