import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../Api/Api"
import s from "./myreview.module.css"
import cn from "classnames"


const MyReview = ({ myRev }) => {

    const createdDate = new Date(myRev.created_at)
    const [productReview, setProductReview] = useState({})
    const [openTab, setOpenTab] = useState(false)

    
    useEffect(() => {
        const tokenStor = sessionStorage.getItem('token')
        if(tokenStor) {
          api.setToken(tokenStor)
        }
      }, [])
    
      useEffect(() => {
        api
          .getProductById(myRev.product)
          .then((data) => {
            setProductReview(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [myRev]);


    return(
        <div className={s.wrapper}>
            <div className={s.cardReview}>
                <div className={s.userInfo}>
                    <div className={s.avatar}><img src={myRev?.author.avatar} alt={myRev.author.name}></img></div>
                    <div>{myRev?.author.name}</div>
                </div>
                <div className={s.myReview}>
                    <div className={s.date}>отзыв добавлен: {createdDate.toLocaleDateString("ru-RU", {
                    month: "2-digit",
                    day: "numeric",
                    year: "numeric",
                    })
                    }</div>
                    <div className={s.innerReview}>
                    <div>{myRev?.text}</div>
                        <div className={s.rate}>Оценка: <span className={s.rating}>{myRev?.rating}</span></div>
                    </div>
                </div>
                <div className={cn(s.updown, {[s.active]: openTab})} onClick={() => setOpenTab(!openTab)}>&#10148;</div>
                <div className={s.product} onClick={() => setOpenTab(!openTab)}>посмотреть товар</div>
            </div>
            <div className={cn(s.nonActive, {[s.active]: openTab})}>
                <div className={s.prodWrapper}>
                    <Link to={`/thr_homework3_dogs3/product/${myRev.product}`} className={s.link}>
                        <div className={s.prodImg}>
                            <img src={productReview.pictures} alt={productReview.name}></img>
                        </div>
                    </Link>
                    <div className={s.prodInfo}>
                        <Link to={`/thr_homework3_dogs3/product/${myRev.product}`} className={s.link}>
                        <h2>{productReview?.name}</h2>
                        <div>{productReview?.description}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyReview