import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React, { useEffect, useState } from "react";
import api from "./Api/Api";
import useDebounce from "./hooks/useDebounse";
import { Route, Routes } from "react-router";
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

function App() {
  const [cards, setCards] = useState([]);
  const [allCardsForSort, setAllCardsForSort] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectTab, setSelectTab] = useState("all")
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [cardsOnList, setCardsOnList] = useState(12);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [modalUserReview, setModalUserReview] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegistr, setModalRegistr] = useState(false)
  const [isToken, setIsToken] = useState(null)
  const [myReviewArr, setMyReviewArr] = useState([])
  
  const arrMaxPage = [];

  const debounceValue = useDebounce(searchQuery, 500);
  
  useEffect(() => {
    const tokenStor = sessionStorage.getItem('token')
    if(tokenStor) {
      api.setToken(tokenStor)
      setIsToken(tokenStor)
    }
  }, [isToken])

  useEffect(() => {
   isToken && 
    api.getAppInfo(page, cardsOnList, debounceValue)
      .then(([cardData, currentUserData]) => {
        setCards(cardData.products);
        setMaxPage(Math.ceil(cardData.total / cardsOnList))
        setCurrentUser(currentUserData);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
    
}, [page, debounceValue, cardsOnList, isToken]);

  useEffect(() => {
    isToken &&
    api.getProductList()
    .then((data) => {
      setAllCardsForSort(data.products);
      const filtredData = (data.products)?.filter((post) => post?.likes?.some((id) => id === currentUser._id));
      setFavoriteCards((prevState) => filtredData);
    })
    .catch((err) => console.log(err))
  
  }, [currentUser, isToken])




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
      setCards(newCards);
    
    });
  }
  }

  const curPaginate = (pagePaginate) => {
    setPage(pagePaginate)
  }

// Создание массива для пагинации страниц 

  for (let i = 1; i <= maxPage; i ++) {
    arrMaxPage.push(i)
  }
  

  return (
    <div>
      <FavoriteContext.Provider value={{favoriteCards}}>
      <UserContext.Provider value={{currentUser, selectTab, setSelectTab, allCardsForSort}}>
        <Header currentUser={currentUser} 
                setSearchQuery={setSearchQuery} 
                setModalLogin={setModalLogin}
                setIsToken={setIsToken} 
                isToken={isToken}
                modalRegistr={modalRegistr}
                setModalRegistr={setModalRegistr}
                myReviewArr={myReviewArr}
        />
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
                page={page}
                setPage={setPage}
                curPaginate={curPaginate}
                cardsOnList={cardsOnList}
                setCardsOnList={setCardsOnList}
                isToken={isToken}
                setIsToken={setIsToken}
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
              />
            }
          ></Route>
          <Route
            path="thr_homework3_dogs3/favorite"
            element={
              <FavoritePage
                cards={favoriteCards}
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
              />
            }
          ></Route>
          <Route
            path="thr_homework3_dogs3/my-review"
            element={
              <MyReviewPage
                myReviewArr={myReviewArr}
                setMyReviewArr={setMyReviewArr}
              />
            }
          ></Route>
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
          </>}
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
        <Popup popup={modalLogin} setPopup={setModalLogin}>
          <Login isToken={isToken} setIsToken={setIsToken} setModalLogin={setModalLogin} modalLogin={modalLogin}/>
        </Popup>
        <Popup popup={modalRegistr} setPopup={setModalRegistr}>
          <Registration isToken={isToken} setIsToken={setIsToken} setModalRegistr={setModalRegistr} modalRegistr={modalRegistr}/>
        </Popup>
      </UserContext.Provider>
      </FavoriteContext.Provider>
    </div>
  );
}

export default App;
