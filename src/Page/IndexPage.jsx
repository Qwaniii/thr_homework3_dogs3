import React from "react";
import api from "../Api/Api";
import Cards from "../components/Cards/Cards";
import CardsDB from "../components/Cards/CardsDB";
import Spinner from "../components/Spinner/Spinner";
import productsDB from "../Array/productsDB"

export default function IndexPage({
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
  isToken,
  setIsToken
}) {

  return (
    <>
    {isToken 
    ? 
      <div>
        {isLoading ? 
        <Cards
          goods={cards}
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
        /> : <Spinner/>}
      </div> 
    :
        <div>
          <CardsDB
            goods={productsDB}
            setIsToken={setIsToken}
          />
        </div>}
    </>
  );
}
