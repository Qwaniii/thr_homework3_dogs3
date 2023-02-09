import React from 'react'
import s from './card.module.css'
import { ReactComponent as Like } from "./img/like.svg" 



export default function Card({card}) {
    return (
        <div className={s.card}>
            <div className={s.discount}>
                {card.discount > 0 && <div className={s.backgroundDiscount}>-{card.discount}%</div>}
            </div>
            <div className={s.likeContainer}><button className={s.like}><Like /></button></div>
            <div className={s.image}>
                <a href = "#">
                    <img src={card.pictures} alt="Image"></img>
                </a>
            </div>
            <div className={s.title}>{card.name}</div>
            <div className={s.descr}>
                <span className={s.price}>{card.price}руб.</span>
                <span className={s.wight}>{card.wight}</span>
                {/* <p>{card.description}</p> */}
            </div>
            <div className={s.add}><a href="#">В корзину</a></div>
            
        </div>
    )
}
