import React, { useContext, useEffect, useState } from "react";
import api from "../Api/Api";
import Card from "../components/Card/Card";
import Cards from "../components/Cards/Cards";
import Spinner from "../components/Spinner/Spinner";
import { UserContext } from "../Context/UserContext";
import s from "./favorite.module.css";

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
}) {

  return (
    <div>
      {isLoading ? (
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
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
