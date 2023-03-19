import React from "react";
import Cards from "../components/Cards/Cards";
import Spinner from "../components/Spinner/Spinner";

export default function FavoritePage({
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
  cardsForPaginate,
  setBasket,
  basket,
  setSmallModalNotific
}) {

  return (
    <div>
      {isLoading ? (
        <>
        <Cards
          goods={cards}
          cardsForPaginate={cardsForPaginate}
          searchQuery={searchQuery}
          onProductLike={handleProductLike}
          currentUser={currentUser}
          setIsLoading={setIsLoading}
          page={page}
          setPage={setPage}
          countPage={countPage}
          curPaginate={curPaginate}
          cardsOnList={cardsOnList}
          setCardsOnList={setCardsOnList}
          setBasket={setBasket}
          basket={basket}
          setSmallModalNotific={setSmallModalNotific}
        />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
