import React, { useContext, useState } from 'react'
import {ReactComponent as ImageAcc} from "./Img/treebars.svg"
import s from "./accordeon.module.css"
import { Link } from 'react-router-dom'
import { FavoriteContext } from '../../Context/FavoriteContext'
import cn from "classnames"

export default function Accordeon({ children, myReviewArr }) {

  const [isAccordeon, setIsAccordeon] = useState(false)
  const { favoriteCards } = useContext(FavoriteContext)

  const toggle = () => {
    console.log("done", isAccordeon)
    setIsAccordeon(!isAccordeon)
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <ImageAcc className={s.accordeon} onClick={toggle}/>
        <div className={cn(s.window, {[s.active]: isAccordeon})}>
          {/* {isAccordeon && <> */}
          <div className={s.wrapperUser}>
            <div className={s.user}>
              {children}
            </div>
            <div className={s.link}>
              <Link to="thr_homework3_dogs3/favorite" onClick={toggle} className={s.favorite}>&#10084;  {favoriteCards.length}</Link>
              <Link to="thr_homework3_dogs3/my-review" onClick={toggle} className={s.review}>&#9998; {myReviewArr.length}</Link>
            </div>
          </div>
          <div className={s.close} onClick={toggle}>
            Закрыть &#10006;
          </div>

          {/* </>} */}
        </div>
      </div>
    </div>
  )
}
