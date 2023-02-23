import React from "react";
import s from "./card.module.css";
import { ReactComponent as Like } from "./img/like.svg";
import cn from "classnames";
import { Link } from "react-router-dom";
import Tags from "../Tags/Tags";

export default function Card({ card, onProductLike, currentUser, setIsLoading, likes }) {
  const isLiked = card.likes.some((id) => id === currentUser._id);

  function handleLikeClick() {
    onProductLike(card);
  }

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
      <div className={s.likeContainer}>
        <button
          className={cn(s.like, { [s.likeActive]: isLiked })}
          onClick={handleLikeClick}
        >
          <Like /> 
        </button>
        <span className={s.num}>{likes > 0 && likes}</span>
      </div>
      <div className={s.image}>
        <Link to={`product/${card._id}`} onClick={() => setIsLoading(false)}>
          <img src={card.pictures} alt="Image"></img> 
        </Link>
      </div>
      <div className={s.title}>{card.name}</div>
      <div className={s.descr}>
        <span className={s.oldprice}>{card.discount > 0 && card.price > 0 && `${Math.round((card.price * 100) / (100 - card.discount))} руб.` } </span>
        <span className={cn(s.price, {[s.redprice]: card.discount})}>{card.price} руб.</span>
        <span className={s.wight}>{card.wight}</span>
        {/* <p>{card.description}</p> */}
      </div>
      <div className={s.add}>
        <a href="#">В корзину</a>
      </div>
    </div>
  );
}
