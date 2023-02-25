import React, { useContext } from "react";
import s from "./card.module.css";
import { ReactComponent as Like } from "./img/like.svg";
import cn from "classnames";
import { Link } from "react-router-dom";
import Tags from "../Tags/Tags";
import { UserContext } from "../../Context/UserContext";

export default function Card({ card, onProductLike, setIsLoading, likes }) {
  const { currentUser } = useContext(UserContext);

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

      <Link to={`product/${card._id}`} onClick={() => setIsLoading(false)} className={s.link}>
        <div className={s.image}>
            <img src={card.pictures} alt="Image"></img> 
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
        <a href="#">В корзину</a>
        <div className={s.likeContainer}>
        <button
          className={cn(s.like, { [s.likeActive]: isLiked })}
          onClick={handleLikeClick}
        >
          <Like /> 
        </button>
        <span className={s.num}>{likes > 0 && likes}</span>
      </div>
      </div>
    </div>
  );
}
