import React, { useContext, useEffect, useState } from "react";
import s from "./product.module.css";
import { ReactComponent as Like } from "../Card/img/like.svg";
import cn from "classnames";
import api from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../../Page/NotFoundPage";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../Context/UserContext";
import Review from "../Review/Review";
import AddReview from "../AddReview/AddReview";
import Popup from "../Popup/Popup";
import SmallNotification from "../Notification/SmallNotification";

export default function Product({
  id,
  isLoading,
  setIsLoading,
  cards,
  setCards,
  handleProductLike,
  modalUserReview,
  setModalUserReview,
  anchorReview,
  setAnchorReview,
  anchorPaginate,
  handleProductLikeForAllProduct,
  allCardsForSort,
  basket,
  setBasket,
  setSmallModalNotific
}) {
  const [aboutProduct, setAboutProduct] = useState({});
  const [reviewRating, setReviewRating] = useState(5);
  const [errStatus, setErrStatus] = useState(false);
  const [countBasket, setCountBasket] = useState(1)
  const [delObj, setDelObj] = useState({})

  const { currentUser } = useContext(UserContext);


  const isLike = aboutProduct?.likes?.some((id) => id === currentUser._id);
  const navigate = useNavigate();
  const length = aboutProduct?.reviews?.length;

  useEffect(() => {
    const tokenStor = sessionStorage.getItem('token')
    if(tokenStor) {
      api.setToken(tokenStor)
    }
  }, [id])

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
  }, [id, cards, anchorReview, setIsLoading, allCardsForSort]);

  const addToBascket = () => {
    let inBasket = basket.find((item) => (item._id ===aboutProduct._id))
    if (!inBasket) {
    setBasket((prevState) => [...prevState, {...aboutProduct, count: (countBasket > 0 ? countBasket : 1)}])
    } else {
      setBasket((prevState) => [...prevState.map(item => item._id === aboutProduct._id ? ({...item, count: (item.count + (countBasket > 0 ? countBasket : 1))}) : ({...item}) )])
    }
    setSmallModalNotific(true)
    setTimeout(() => {
      setSmallModalNotific(false)
    }, 1500)
}


  useEffect(() => {
    const sum = aboutProduct?.reviews?.reduce((res, item) => {
      return res + item.rating;
    }, 0);
    setReviewRating(sum / length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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


  const handleDeleteReview = (postId, reviewId) => {
    api.deleteReview(postId, reviewId)
        .then(data => {
          console.log(data)
          setAboutProduct(data)
          setAnchorReview(!anchorReview)
          setModalUserReview(false)
          setDelObj(prevState => ({...prevState, message: "Комментарий удален"}))
          setTimeout(() => {
            setDelObj({})
          }, 5000)
        })
        .catch(err => {
          console.log(err)
          err.json()
        })
  }


  return (
    <div>
      {isLoading ? (
        !errStatus && (
          <div className="container">
            <div className={s.wrapper}>
              <div className={s.header}>
                <div  className={s.btnWrapper}>
                  <span onClick={() => navigate(-1)} className={s.back}>Назад</span>
                  <span className={s.edit}>Редактировать</span>
                </div>
                <h2 className="div">{aboutProduct.name}</h2>
                <p className="div">Артикул {aboutProduct?._id?.slice(5,12)}</p>
              </div>
              <div className={s.main}>
                <div className={s.image}>
                  <img src={aboutProduct.pictures} alt={aboutProduct.title}></img>
                  {aboutProduct.discount > 0 && (
                    <div className={`${s.sale} ${s.backgroundSale}`}>
                      - {aboutProduct.discount}%
                    </div>
                  )}
                </div>
                <div className={s.info}>
                  {aboutProduct.discount > 0 && (
                    <div className={s.oldprice}>
                      {aboutProduct.discount > 0 && (aboutProduct.price + " руб.")}
                    </div>
                  )}
                  <div className={s.price}>{Math.round(aboutProduct.price - aboutProduct.price * aboutProduct.discount / 100)} руб.</div>
                  <div className={s.wigth}>{aboutProduct.wight}</div>
                  <div className={s.cart}>
                    <div className={s.wrapperNum}>
                      <span className={s.minus} onClick={() => countBasket > 1 ? setCountBasket(Number(countBasket) - 1) : setCountBasket(countBasket)}></span>
                      <input className={s.input} type="number" value={countBasket} min={1} onChange={(e) => setCountBasket(e.target.value)}></input>
                      <span className={s.plus} onClick={() => setCountBasket(Number(countBasket) + 1)}></span>
                    </div>
                    <div className={s.link} onClick={() => addToBascket()}>В корзину</div>
                  </div>
                  <div className={s.likeContainer}>
                    <button
                      className={cn(s.like, { [s.likeActive]: isLike })}
                      onClick={() => {anchorPaginate ? handleProductLike(aboutProduct) : handleProductLikeForAllProduct(aboutProduct)}}
                    >
                      <Like />
                    </button>
                    <span>В изрбранное</span>
                  </div>
                  {aboutProduct?.reviews?.length > 0 && <div className={s.rating}>
                    Рейтинг товара:{" "}
                    <span className={s.numRat}>
                      {(Math.floor(reviewRating * 100) / 100).toString()}
                    </span>
                  </div>}
                  <div className={s.delivery}>
                    <p>Доставка по всему миру</p>
                    <p>Доставка курьером от <b>300 руб.</b></p>
                  </div>
                  <div className={s.garanty}>
                    <b>Гарантия качества</b>
                    <p>Если вам не понравилось качество нашей продукции, мы вернем Вам деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды</p>

                  </div>
                </div>
              </div>
              <div className={s.about}>
                <h3>Описание</h3>
                <p>{aboutProduct.description}</p>
              </div>
              <div className={s.character}>
                <h3>Характеристики</h3>
            <p>
              Отличный продукт для вашего питомца
              Цена {aboutProduct.price} руб. за {aboutProduct.wight} 
            </p>
              </div>
              <div className={s.review}>
                <h3 className={s.h3}>
                  {aboutProduct?.reviews?.length > 0 ? `Отзывов о товаре (${aboutProduct?.reviews?.length}) :` : `Нет отзывов. Будьте первым!`}
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
                    {aboutProduct?.reviews?.map((review) => (
                        <Review
                          key={review._id}
                          review={review}
                          anchorReview={anchorReview}
                          setReviewRating={setReviewRating}
                          setAnchorReview={setAnchorReview}
                          setModalUserReview={setModalUserReview}
                          setDelObj={setDelObj}
                        />
                      ))
                      .reverse()}
                  </span>
                  <Popup popup={modalUserReview} setPopup={setModalUserReview}>
                    <div className={s.popup}>
                      <h4>Удалить отзыв?</h4>
                      <div className={s.btn}>
                        <button  onClick={() => setModalUserReview(false)}>Отмена</button>
                        <button  onClick={() => handleDeleteReview(delObj.product, delObj.review)}>Удалить</button>
                      </div>
                    </div>
                  </Popup>
                  <div className={s.notific}>
                    <SmallNotification message={delObj.message} />
                  </div>
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
