import React from "react";
import s from "./card.module.css";
import cn from "classnames";
import Tags from "../Tags/Tags";
import { Link } from "react-router-dom";

export default function CardDB({ card, onProductLike, setIsLoading, likes }) {


  return (
    <div className={s.card}>
      <div className={s.discount}>
        {card.discount > 0 && (
          <div className={s.backgroundDiscount}>-{card.discount}%</div>
        )}
      </div>
      <div className={s.tag}>
        {card.tags.map((tag, index) => 
          <Tags tag={tag} key={index}/>
        )}
      </div>
      <Link to="/thr_homework3_dogs3/login" className={s.link}>
        <div className={s.image}>
            <img src={card.pictures} alt={card.title}></img> 
        </div>
        <div className={s.descr}>
          <span className={s.oldprice}>{card.discount > 0 && (card.price + " руб.")} </span>
          <span className={cn(s.price, {[s.redprice]: card.discount})}>{Math.round(card.price - card.price * card.discount / 100)} руб.</span>
          <span className={s.wight}>{card.wight}</span>
          <div className={s.title}>{card.name}</div>
          {/* <p>{card.description}</p> */}
        </div>
      </Link>
      <div className={s.add}>
      <Link to="/thr_homework3_dogs3/login" className={s.link}><span className={s.linkBtn}>В корзину</span></Link>
        <div className={s.likeContainer}>
        {/* <button
          className={cn(s.like, { [s.likeActive]: isLiked })}
          onClick={handleLikeClick}
        >
          <Like /> 
        </button> */}
        {/* <span className={s.num}>{likes > 0 && likes}</span> */}
      </div>
      </div>
    </div>
  );
}
