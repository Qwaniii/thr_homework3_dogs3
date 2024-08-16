import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React, { useEffect, useState } from "react";
import api from "./Api/Api";
import useDebounce from "./hooks/useDebounse";
import { Route, Routes, useNavigate } from "react-router";
import IndexPage from "./Page/IndexPage";
import ProductPage from "./Page/ProductPage";
import NotFoundPage from "./Page/NotFoundPage";
import { UserContext } from "./Context/UserContext";
import FavoritePage from "./Page/FavoritePage";
import { FavoriteContext } from "./Context/FavoriteContext";
import Popup from "./components/Popup/Popup";
import Login from "./components/LoginForm/Login";
import Registration from "./components/LoginForm/Registration";
import MyReviewPage from "./Page/MyReviewPage";
import NewProduct from "./components/NewProduct/NewProduct";
import Notification from "./components/Notification/Notification";
import BasketPage from "./Page/BasketPage";
import PopupNotific from "./components/PopupNotific/PopupNotific";
import SmallNotification from "./components/Notification/SmallNotification";
import AboutUser from "./components/AboutUser/AboutUser";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./storage/reducers/userReduce";
import FaqPage from "./Page/FaqPage";
import { anchorEditProduct } from "./storage/reducers/editProductReducer";
import ForgotPass from "./components/LoginForm/ForgotPass";

function App() {
  const [cards, setCards] = useState([]);
  const [allCardsForSort, setAllCardsForSort] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalSearch, setTotalSearch] = useState(0)
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectTab, setSelectTab] = useState("all")
  const [cardsForPaginate, setCardsForPaginate] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [cardsOnList, setCardsOnList] = useState(12);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [modalUserReview, setModalUserReview] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegistr, setModalRegistr] = useState(false)
  const [modalForgotPass, setModalForgotPass] = useState(false)
  const [modalNotific, setModalNotific] = useState(false)
  const [smallModalNotific, setSmallModalNotific] = useState(false)
  const [isToken, setIsToken] = useState(true)
  const [myReviewArr, setMyReviewArr] = useState([])
  const [anchorReview, setAnchorReview] = useState(false);
  const [anchorPaginate, setAnchorPaginate] = useState(true);
  const [anchorNewProduct, setAnchorNewProduct] = useState(false);
  const [userRegistration, setUserRegistration] = useState(null)
  const [basket, setBasket] = useState([])  
  const [scrollTop, setScrollTop] = useState(0);

  
  const  dispatch = useDispatch()
  const navigate = useNavigate()
  const anchorEditProd = useSelector(anchorEditProduct)
  
  const arrMaxPage = [];

  const debounceValue = useDebounce(searchQuery, 500);

  const startPaginate = (cardsOnList * page) - cardsOnList;

  // проверяем наличие токена
  // useEffect(() => {
  //   const tokenStor = sessionStorage.getItem('token')
  //   if(tokenStor) {
  //     api.setToken(tokenStor)
  //     setIsToken(tokenStor)
  //   }
  // }, [isToken])

  // получаем продукты и инфо опользователе (пагинация на сервере)
  useEffect(() => {
   isToken && 
    api.getAppInfo(page, cardsOnList, debounceValue)
      .then(([cardData, currentUserData]) => {
        console.log(cardData)
        setCards(cardData.products);
        setTotalSearch(cardData.total)
        setMaxPage(Math.ceil(cardData.total / cardsOnList))
        setCurrentUser(currentUserData);
        setIsLoading(true);
        dispatch(getUser(currentUserData))
      })
      .catch((err) => console.log(err));
    
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [page, debounceValue, cardsOnList, isToken, anchorNewProduct, anchorEditProd]);


  // получаем все продукты для сортировки и списка любимых товаров
  useEffect(() => {
    isToken &&
    api.getProductList()
      .then((data) => {
        console.log(data)
        setAllCardsForSort(data.products);
        const filtredData = (data.products)?.filter((post) => post?.likes?.some((id) => id === currentUser._id));
        setFavoriteCards(filtredData);
      })
      .catch((err) => console.log(err))
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isToken, anchorNewProduct, anchorEditProd])

  // получаем все отзывы
  useEffect(() => {
    isToken &&
    api.getAllReview()
        .then((data) => {
            console.log(data)
            // забираем отзывы данного юзера
            const myData = data.filter((item) => item.author._id === currentUser._id)
            setMyReviewArr(myData)
        })
        .catch((err) => console.log(err.status))
  }, [currentUser, setMyReviewArr, anchorReview, isToken])



  //   api.getProductPaginateList(page, cardsOnList).then((cardData) => {
  //     setMaxPage(Math.ceil(cardData.total / cardsOnList))
  //     setCards(cardData.products);
  //     console.log(page)
  //     setIsLoading(true)
  //   });
  // }, [page]);

  // useEffect(() => {
  //   api.getUserInfo().then((currentUserData) => {
  //     setCurrentUser(currentUserData);
  //   })
  // }, [])


  // Поиск товаров без пагинации

  // useEffect(() => {
  //   searchQuery > 0 && api.search(debounceValue).then((data) => {
  //     setCards(data);
  //   });
    // const newState = (cardData.products).filter((item) => (item.name.toLowerCase()).includes(searchQuery.toLowerCase())) --- поиск товаров без сервера
  // }, [debounceValue]);

  function handleProductLike(product) {
    if(isToken) {
      const isLike = product.likes.some((id) => id === currentUser._id);
      api.changeLikeProductStatus(product._id, !isLike).then((newCard) => {
        // в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
        const newCards = cards.map((c) => {
          return c._id === newCard._id ? newCard : c;
        });
        if (!isLike) {
          setFavoriteCards(prevState => [...prevState, newCard])
        } else {
          setFavoriteCards(prevState => prevState.filter((card) => card._id !== newCard._id))
        }
        // лайки для пагинации на сервере
        setCards(newCards);
      });
    }
    }


  function handleProductLikeForAllProduct(product) {
    if(isToken) {
    const isLike = product.likes.some((id) => id === currentUser._id);
    api.changeLikeProductStatus(product._id, !isLike).then((newCard) => {
      // в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
      const newCards = allCardsForSort.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      if (!isLike) {
        setFavoriteCards(prevState => [...prevState, newCard])
      } else {
        setFavoriteCards(prevState => prevState.filter((card) => card._id !== newCard._id))
      }
      // лайки для всех товаров
      setAllCardsForSort(newCards);
    });
  }
  }

  const curPaginate = (pagePaginate) => {
    setPage(pagePaginate)
  }

  const curPaginateOnClient = (pagePaginate) => {
    setPage(pagePaginate)
    // setCardsForPaginate(allCardsForSort.slice(startPaginate, startPaginate + cardsOnList))

  }

  // сортируем все продукты 
  useEffect(() => {
    if (selectTab === "new") {
      setCardsForPaginate(allCardsForSort
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(startPaginate, startPaginate + cardsOnList))}
    else if (selectTab === "cheap") {
      setCardsForPaginate(allCardsForSort
        .sort((a, b) => (Math.round(a.price - a.price * a.discount / 100)) - (Math.round(b.price - b.price * b.discount / 100)))
        .slice(startPaginate, startPaginate + cardsOnList))}
    else if (selectTab === "expens") {
      setCardsForPaginate(allCardsForSort
        .sort((a, b) => (Math.round(b.price - b.price * b.discount / 100)) - (Math.round(a.price - a.price * a.discount / 100)))
        .slice(startPaginate, startPaginate + cardsOnList))}
    else if (selectTab === "popular") {
      setCardsForPaginate(allCardsForSort
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(startPaginate, startPaginate + cardsOnList))}
    else if (selectTab === "sale") {
      setCardsForPaginate(allCardsForSort
        .sort((a, b) => b.discount - a.discount)
        .slice(startPaginate, startPaginate + cardsOnList))}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPaginate, selectTab, favoriteCards])



// Создание массива для пагинации страниц 

  for (let i = 1; i <= maxPage; i ++) {
    arrMaxPage.push(i)
  }
  
  useEffect(() => {
    const handleScroll = event => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div>
      <FavoriteContext.Provider value={{favoriteCards}}>
      <UserContext.Provider value={{currentUser, selectTab, setSelectTab, allCardsForSort}}>
        <Header currentUser={currentUser} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} 
                setModalLogin={setModalLogin}
                setIsToken={setIsToken} 
                isToken={isToken}
                modalRegistr={modalRegistr}
                setModalRegistr={setModalRegistr}
                myReviewArr={myReviewArr}
                anchorPaginate={anchorPaginate}
                setAnchorPaginate={setAnchorPaginate}
                setSelectTab={setSelectTab}
                setPage={setPage}
                basket={basket}

        />
        <div className="wrap">
          <Routes>
            <Route
              path="/thr_homework3_dogs3"
              element={
                <IndexPage
                  cards={cards}
                  searchQuery={searchQuery}
                  handleProductLike={handleProductLike}
                  currentUser={currentUser}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  countPage={arrMaxPage}
                  maxPage={maxPage}
                  page={page}
                  setPage={setPage}
                  curPaginate={curPaginate}
                  cardsOnList={cardsOnList}
                  setCardsOnList={setCardsOnList}
                  isToken={isToken}
                  setIsToken={setIsToken}
                  handleProductLikeForAllProduct={handleProductLikeForAllProduct}
                  totalSearch={totalSearch}
                  anchorPaginate={anchorPaginate}
                  setAnchorPaginate={setAnchorPaginate}
                  cardsForPaginate={cardsForPaginate}
                  curPaginateOnClient={curPaginateOnClient}
                  setBasket={setBasket}
                  basket={basket}
                  setSmallModalNotific={setSmallModalNotific}
                />
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/product/:prodId"
              element={
                <ProductPage
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  cards={cards}
                  setCards={setCards}
                  handleProductLike={handleProductLike}
                  modalUserReview={modalUserReview}
                  setModalUserReview={setModalUserReview}
                  anchorReview={anchorReview}
                  setAnchorReview={setAnchorReview}
                  anchorPaginate={anchorPaginate}
                  handleProductLikeForAllProduct={handleProductLikeForAllProduct}
                  allCardsForSort={allCardsForSort}
                  basket={basket}
                  setBasket={setBasket}
                  setSmallModalNotific={setSmallModalNotific}
                />
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/favorite"
              element={
                <FavoritePage
                  cards={favoriteCards}
                  cardsForPaginate={favoriteCards}
                  searchQuery={searchQuery}
                  handleProductLike={handleProductLike}
                  currentUser={currentUser}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  countPage={arrMaxPage}
                  page={page}
                  setPage={setPage}
                  curPaginate={curPaginate}
                  cardsOnList={cardsOnList}
                  setCardsOnList={setCardsOnList}
                  setBasket={setBasket}
                  basket={basket}
                  setSmallModalNotific={setSmallModalNotific}
                />
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/basket"
              element={
                <BasketPage
                  basket={basket}
                  setBasket={setBasket}
                  cardsForPaginate={favoriteCards}
                  handleProductLike={handleProductLike}
                  currentUser={currentUser}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  countPage={arrMaxPage}
                  page={page}
                  setPage={setPage}
                  curPaginate={curPaginate}
                  cardsOnList={cardsOnList}
                  setCardsOnList={setCardsOnList}
                />
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/my-review"
              element={
                <MyReviewPage
                  myReviewArr={myReviewArr}
                  setMyReviewArr={setMyReviewArr}
                  anchorReview={anchorReview}
                  setAnchorReview={setAnchorReview}
                />
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/add-product"
              element={
                <NewProduct
                isToken={isToken}
                setIsToken={setIsToken}
                setCards={setCards}
                anchor={anchorNewProduct}
                setAnchor={setAnchorNewProduct}
                setModal={setModalNotific}
                setSelectTab={setSelectTab}
              />
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/about-user"
              element={
                <AboutUser/>
              }/>
            <Route
              path="thr_homework3_dogs3/faq"
              element={
                <FaqPage/>
              }/>
            {!isToken &&
            <>
            <Route
              path="thr_homework3_dogs3/login"
              element={
                <IndexPage/>
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/registration"
              element={
                <IndexPage/>
              }
            ></Route>
            <Route
              path="thr_homework3_dogs3/forgot-password"
              element={
                <IndexPage/>
              }
            ></Route>
            </>}
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
        <Footer setSelectTab={setSelectTab} setAnchorPaginate={setAnchorPaginate} setSearchQuery={setSearchQuery}/>
        <Popup popup={modalLogin} setPopup={setModalLogin}>
          <Login 
            sToken={isToken} 
            setIsToken={setIsToken} 
            setModalLogin={setModalLogin}
            modalLogin={modalLogin}
            userRegistration={userRegistration}
            setUserRegistration={setUserRegistration}
            />
        </Popup>
        <Popup popup={modalRegistr} setPopup={setModalRegistr}>
          <Registration 
            isToken={isToken} 
            setIsToken={setIsToken} 
            setModalRegistr={setModalRegistr} 
            modalRegistr={modalRegistr}
            userRegistration={userRegistration}
            setUserRegistration={setUserRegistration}
            />
        </Popup>
        <Popup popup={modalForgotPass} setPopup={setModalForgotPass}>
              <ForgotPass
                isToken={isToken} 
                setModalForgotPass={setModalForgotPass}
              />
        </Popup>
        <Popup popup={modalNotific} setPopup={setModalNotific}>
            <Notification title={"Отлично!"} message={"Продукт добавлен!"} close={setModalNotific}/>
        </Popup>
        <PopupNotific popup={smallModalNotific} setPopup={setSmallModalNotific}>
            <SmallNotification message={"Товар в корзине!"} close={setSmallModalNotific} error={false} onClick={() => navigate("/thr_homework3_dogs3/basket")} />
        </PopupNotific>
        {scrollTop > 200 && <div className="toUp" onClick={() => toUp()}>^</div>}
      </UserContext.Provider>
      </FavoriteContext.Provider>
    </div>
  );
}

export default App;
