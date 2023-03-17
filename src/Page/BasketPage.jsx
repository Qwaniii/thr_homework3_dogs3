import React from "react";
import Basket from "../components/Basket/Basket";
import Spinner from "../components/Spinner/Spinner";
import "./index.css"

export default function BasketPage({
  cards,
  searchQuery,
  handleProductLike,
  currentUser,
  isLoading,
  setIsLoading,
  page,
  setPage,
  countPage,
  curPaginate,
  cardsOnList,
  setCardsOnList,
  cardsForPaginate
}) {

  return (
    <div>
      {isLoading ? (
        <div className="container">
          <h2 className="basket__header">Корзина</h2>
          <div className="basket__main">
            {cards.map((card, index) => (
              <Basket card={card} key={card._id} index={index + 1}/>
            ))}
            <div className="basket__price">Стоимость: {(cards.map((card) => card.price).reduce((acc, prev) => acc + prev))}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
