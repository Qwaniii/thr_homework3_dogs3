import React from "react";
import Cards from "../components/Cards/Cards";
import CardsDB from "../components/Cards/CardsDB";
import Spinner from "../components/Spinner/Spinner";
import productsDB from "../Array/productsDB"

export default function IndexPage({
  cards,
  searchQuery,
  handleProductLike,
  handleProductLikeForAllProduct,
  currentUser,
  isLoading,
  setIsLoading,
  page,
  setPage,
  maxPage,
  countPage,
  curPaginate,
  cardsOnList,
  setCardsOnList,
  isToken,
  setIsToken,
  totalSearch,
  anchorPaginate,
  setAnchorPaginate,
  cardsForPaginate,
  curPaginateOnClient
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
          onProductLikeAllProducts={handleProductLikeForAllProduct}
          currentUser={currentUser}
          setIsLoading={setIsLoading}
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          countPage={countPage}
          curPaginate={curPaginate}
          cardsOnList={cardsOnList}
          setCardsOnList={setCardsOnList}
          totalSearch={totalSearch}
          anchorPaginate={anchorPaginate}
          setAnchorPaginate={setAnchorPaginate}
          cardsForPaginate={cardsForPaginate}
          curPaginateOnClient={curPaginateOnClient}
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
