import React, { useContext } from "react";
import s from "./card.module.css";
import { ReactComponent as Like } from "./img/like.svg";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import Tags from "../Tags/Tags";
import { UserContext } from "../../Context/UserContext";

export default function Card({
  card,
  onProductLike,
  setIsLoading,
  likes,
  basket,
  setBasket,
  setSmallModalNotific
}) {
  const { currentUser } = useContext(UserContext);

  const isLiked = card.likes.some((id) => id === currentUser._id);

  function handleLikeClick() {
    onProductLike(card);
  }

  const inBasket = basket.find((item) => (item._id === card._id))

  const addToBascket = () => {
      if (!inBasket) {
        setBasket((prevState) => [...prevState, {...card, count: 1}])
      } else {
        setBasket((prevState) => [...prevState.map(item => item._id === card._id ? ({...item, count: (item.count + 1)}) : ({...item}) )])
      }
      setSmallModalNotific(true)
      // setCountItem((basket.filter(item => item._id === card._id).map(res => res.count)))
      setTimeout(() => {
        setSmallModalNotific(false)
      }, 1500)
  }

  const location = useLocation();

  return (
    <div className={s.card}>
      <div className={s.discount}>
        {card.discount > 0 && (
          <div className={s.backgroundDiscount}>-{card.discount}%</div>
        )}
      </div>
      <div className={s.tag}>
        {card.tags.map((tag, index) => (
          <Tags tag={tag} key={index} />
        ))}
      </div>

      <Link
        to={
          location.pathname === "/thr_homework3_dogs3/favorite"
            ? `/thr_homework3_dogs3/product/${card._id}`
            : `product/${card._id}`
        }
        onClick={() => setIsLoading(false)}
        className={s.link}
      >
        <div className={s.image}>
          <img src={card.pictures} alt={card.title}></img>
        </div>
        <div className={s.descr}>
          <span className={s.oldprice}>
            {card.discount > 0 && card.price + " руб."}{" "}
          </span>
          <span className={cn(s.price, { [s.redprice]: card.discount })}>
            {Math.round(card.price - (card.price * card.discount) / 100)} руб.
          </span>
          <span className={s.wight}>{card.wight}</span>
          <div className={s.title}>{card.name}</div>
          {/* <p>{card.description}</p> */}
        </div>
      </Link>
      <div className={s.add}>
        <span
          className={cn (s.linkBtn, {[s.inBasket]: inBasket})}
          onClick={() => addToBascket()}
        >
          {inBasket ? `В корзине ${inBasket?.count} шт.` : "В корзину"}
        </span>
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
