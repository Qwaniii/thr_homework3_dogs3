import React from "react";
import Cards from "../components/Cards/Cards";
import Spinner from "../components/Spinner/Spinner";

export default function IndexPage({
  cards,
  searchQuery,
  handleProductLike,
  currentUser,
  isLoading,
  setIsLoading
}) {
  return (
    <div>
      {isLoading ? 
      <Cards
        goods={cards}
        searchQuery={searchQuery}
        onProductLike={handleProductLike}
        currentUser={currentUser}
        setIsLoading={setIsLoading}
      /> : <Spinner/>}
    </div>
  );
}
