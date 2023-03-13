import React from "react";
import { useParams } from "react-router";
import Product from "../components/Product/Product";

export default function ProductPage({
  isLoading,
  cards,
  setCards,
  setIsLoading,
  handleProductLike,
  modalUserReview,
  setModalUserReview,
  anchorReview,
  setAnchorReview
}) {
  const id = useParams();

  return (
    <div>
      <Product
        id={id.prodId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        cards={cards}
        setCards={setCards}
        handleProductLike={handleProductLike}
        modalUserReview={modalUserReview}
        setModalUserReview={setModalUserReview}
        anchorReview={anchorReview}
        setAnchorReview={setAnchorReview}
      />
    </div>
  );
}
