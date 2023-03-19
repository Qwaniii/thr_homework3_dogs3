import React, { useEffect, useState } from "react";
import Basket from "../components/Basket/Basket";
import Spinner from "../components/Spinner/Spinner";
import "./index.css";

export default function BasketPage({
  basket,
  setBasket,
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
  cardsForPaginate,
}) {
  const [finalPrice, setFinalPrice] = useState([]);



//   useEffect(() => {
//     if(countBasket.length === 0) {
//       setCountBasket(basket.map((prevState, index) => ({...prevState, key: 1})))
//     } else if (countBasket.length < basket.length){
//       console.log(...basket.slice(countBasket.length, basket.length))
//       setCountBasket((prevState) => prevState.concat([...basket.slice(countBasket.length, basket.length)]))
//       console.log(countBasket.length)
//   }
// }, [basket]);


  useEffect(() => {
    setFinalPrice(basket.map((card) => (Math.round(card.price - (card.price * card.discount) / 100)) * card.count));
  }, [basket]);
  
  // console.log(countBasket[1].key)

  return (
    <div>
      {isLoading ? (
        <div className="container">
          <h2 className="basket__header">Корзина {basket.length > 0 && `(${basket.length}):`}</h2>
          {basket.length !== 0 
            ? (
              <>
              <div className="basket__main-delete" onClick={() => setBasket(prevState => prevState.filter(item => item === 1))}>Очистить все</div>
              <div className="basket__main">
                {basket?.map((card, index) => (
                  <Basket
                    card={card}
                    key={card._id + index}
                    index={index}
                    basket={basket}
                    setBasket={setBasket}
                    finalPrice={finalPrice}
                    setFinalPrice={setFinalPrice}
                
                  />
                ))}
              <div className="basket__price">
                Итого:{" "}
                {finalPrice.length !== 0 &&
                  finalPrice?.reduce((acc, prev) => acc + prev)} руб.
              </div>
            </div>
            </>
          ) : (
            <h3 className="basket__header">
              Пусто...
              <div>Добавьте товары в корзину</div>
            </h3>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
