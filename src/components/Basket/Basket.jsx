import React, { useEffect, useState } from "react";
import s from "./basket.module.css";
import { ReactComponent as Close } from "../LoginForm/img/close.svg";
import cn from "classnames";

const Basket = ({ card, index, basket, setBasket, finalPrice, setFinalPrice}) => {

  const [anchorUnderCard, setAnchorUnderCard] = useState(false);
  const [countBasket, setCountBasket] = useState(card.count);
  // const [value, setValue] = useState(1)

  // useEffect(() => {
  //   setFinalPrice((prevState) =>
  //     prevState.map((value, i) =>
  //       i === index ? card.price * countBasket[index] : value
  //     )
  //   );
  // }, [countBasket, card]);

  const deleteFunc = () => {
    setBasket((prevState) =>
        prevState.filter((del, indexDel) => indexDel !== index));
    setFinalPrice((prevState) =>
        prevState.filter((del, indexDel) => indexDel !== index));
  }

  useEffect(() => {
    setBasket(prevState => [...prevState.map(item => item._id === card._id ? ({...item, count: countBasket}) : ({...item}) )])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countBasket])

  // console.log(countBasket.map((item) => item._id))

  return (
    <div className={s.container}>
      <div
        className={cn(s.wrapper, { [s.active]: anchorUnderCard })}
        onMouseEnter={() => setAnchorUnderCard(true)}
        onMouseLeave={() => setAnchorUnderCard(false)}
      >
        <div className={s.index}>{index + 1}.</div>
        <div className={s.infoProduct}>
          <div className={s.image}>
            <img src={card.pictures} alt={card.name}></img>
          </div>
          <div className={s.aboutProd}>
            <div className={s.name}>{card.name}</div>
            <div className={s.wight}>{card.wight}</div>
          </div>
          <div className={s.empty}></div>
          <div className={s.finalPrice}>
            <div className={s.price}>{Math.round(card.price - (card.price * card.discount) / 100)} руб.</div>
            <div className={s.inpWrapper}>
              <input
                type="number"
                className={s.input}
                min={1}
                value={countBasket}
                onChange={(e) => setCountBasket(e.target.value)}
              ></input>{" "}
              шт.
              <button
                className={s.minus}
                onClick={() =>
                  countBasket > 1
                    ? setCountBasket(countBasket - 1)
                    : setCountBasket(countBasket)
                }
              ></button>
              <button
                className={s.plus}
                onClick={() => setCountBasket(countBasket + 1)}
              ></button>
            </div>
            <Close
              title="Удалить"
              className={cn(s.delete, { [s.active]: anchorUnderCard })}
              onClick={() => deleteFunc()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
