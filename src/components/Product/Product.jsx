import React, { useContext, useEffect, useState } from "react";
import s from "./product.module.css";
import { ReactComponent as Like } from "../Card/img/like.svg";
import cn from "classnames";
import api from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import NotFoundPage from "../../Page/NotFoundPage";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../Context/UserContext";
import Review from "../Review/Review";
import AddReview from "../AddReview/AddReview";
import Popup from "../Popup/Popup";

export default function Product({
  id,
  isLoading,
  setIsLoading,
  cards,
  setCards,
  handleProductLike,
  modalUserReview,
  setModalUserReview
}) {
  const [aboutProduct, setAboutProduct] = useState({});
  const [reviewRating, setReviewRating] = useState(0);
  const [errStatus, setErrStatus] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [anchorReview, setAnchorReview] = useState(false);

  const isLike = aboutProduct?.likes?.some((id) => id === currentUser._id);
  const navigate = useNavigate();
  const length = aboutProduct?.reviews?.length;

  useEffect(() => {
    api
      .getProductById(id)
      .then((data) => {
        setAboutProduct(data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setErrStatus(true);
      });
  }, [id, cards, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  }, [aboutProduct, anchorReview]);

  // function handleProductLikeClick() {
  //   api.changeLikeProductStatus(aboutProduct._id, !isLike)
  //     .then((newProduct) => {

  //       setAboutProduct(newProduct);
  //       const newCards = cards.map((card) =>
  //         card._id === newProduct._id ? newProduct : card
  //       )
  //       setCards(newCards);
  //     })
  // }

  console.log(aboutProduct)

  return (
    <div>
      {isLoading ? (
        !errStatus && (
          <div className="container">
            <div className={s.wrapper}>
              <div className={s.header}>
                <Link onClick={() => navigate(-1)} className={s.back}>
                  Назад
                </Link>
                <h2 className="div">{aboutProduct.name}</h2>
                <p className="div">Артикул {aboutProduct._id.slice(5,12)}</p>
              </div>
              <div className={s.main}>
                <div className={s.image}>
                  <img src={aboutProduct.pictures}></img>
                  {aboutProduct.discount > 0 && (
                    <div className={`${s.sale} ${s.backgroundSale}`}>
                      - {aboutProduct.discount}%
                    </div>
                  )}
                </div>
                <div className={s.info}>
                  {aboutProduct.discount > 0 && (
                    <div className={s.oldprice}>
                      {`${Math.round(
                        (aboutProduct.price * 100) /
                          (100 - aboutProduct.discount)
                      )}`}{" "}
                      руб.
                    </div>
                  )}
                  <div className={s.price}>{aboutProduct.price} руб.</div>
                  <div className={s.wigth}>{aboutProduct.wight}</div>
                  <div className={s.cart}>
                    <a href="#">В корзину</a>
                  </div>
                  <div className={s.likeContainer}>
                    <button
                      className={cn(s.like, { [s.likeActive]: isLike })}
                      onClick={() => handleProductLike(aboutProduct)}
                    >
                      <Like />
                    </button>
                    <span>В изрбранное</span>
                  </div>
                  {aboutProduct.reviews.length > 0 && <div className={s.rating}>
                    Рейтинг товара:{" "}
                    <span className={s.numRat}>
                      {Math.floor(reviewRating * 100) / 100}
                    </span>
                  </div>}
                </div>
              </div>
              <div className={s.about}>
                <h3>Описание</h3>
                <p>{aboutProduct.description}</p>
              </div>
              <div className={s.character}>
                {/* <h3>Характеристики</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A, saepe
              aliquid eveniet dolorem dolor similique temporibus. Unde impedit
              neque eius.
            </p> */}
              </div>
              <div className={s.review}>
                <h3 className={s.h3}>
                  Отзывов о товаре ({aboutProduct.reviews.length}) :{" "}
                </h3>
                <div className={s.revWrapper}>
                  <div className={s.addRev}>
                    <AddReview
                      id={id}
                      setAnchorReview={setAnchorReview}
                      anchorReview={anchorReview}
                    />
                  </div>
                  <span className={s.rev}>
                    {aboutProduct.reviews
                      .map((review) => (
                        <Review
                          key={review._id}
                          review={review}
                          anchorReview={anchorReview}
                          setReviewRating={setReviewRating}
                          setAnchorReview={setAnchorReview}
                          setModalUserReview={setModalUserReview}
                        />
                      ))
                      .reverse()}
                  </span>
                  {/* <Popup popup={modalUserReview} setPopup={setModalUserReview}>
                        <img src={authorReview.avatar} alt={authorReview.name}></img>
                        {authorReview.name}
                  </Popup> */}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Spinner />
      )}
      {errStatus && <NotFoundPage />}
    </div>
  );
}
