import React from "react";
import s from "./basket.module.css"

const Basket = ({ card, index }) => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.index}>{index}</div>
                <div className={s.infoProduct}>
                    <div className={s.image}>
                        <img src={card.pictures} alt={card.name}></img>
                    </div>
                    <div className={s.aboutProd}>
                        <div>{card.name}</div>
                        <div className={s.wight}>{card.wight}</div>
                    </div>
                    <div className={s.empty}></div>
                    <div className={s.finalPrice}>
                        <div>{card.price}</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basket