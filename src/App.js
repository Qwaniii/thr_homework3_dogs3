import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cards from "./components/Cards/Cards";
import { useEffect, useState } from "react";
import api from "./Api/Api";
import useDebounce from "./hooks/useDebounse";
import Product from "./components/Product/Product";
import { Route, Routes } from "react-router";
import IndexPage from "./Page/IndexPage";
import ProductPage from "./Page/ProductPage";
import NotFoundPage from "./Page/NotFoundPage";
import { UserContext } from "./Context/UserContext";
import FavoritePage from "./Page/FavoritePage";
import { FavoriteContext } from "./Context/FavoriteContext";

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
  const arrMaxPage = [];

  const debounceValue = useDebounce(searchQuery, 500);
  

  useEffect(() => {
    api.getAppInfo(page, cardsOnList, debounceValue)
      .then(([cardData, currentUserData]) => {
        setCards(cardData.products);
        setMaxPage(Math.ceil(cardData.total / cardsOnList))
        setCurrentUser(currentUserData);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
}, [page, debounceValue, cardsOnList]);

  useEffect(() => {
    api.getProductList()
    .then((data) => {
      setAllCardsForSort(data.products);
      const filtredData = (data.products)?.filter((post) => post?.likes?.some((id) => id === currentUser._id));
      setFavoriteCards((prevState) => filtredData);
    })
    .catch((err) => console.log(err))
  }, [currentUser])



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


  // ?????????? ?????????????? ?????? ??????????????????

  // useEffect(() => {
  //   searchQuery > 0 && api.search(debounceValue).then((data) => {
  //     setCards(data);
  //   });
    // const newState = (cardData.products).filter((item) => (item.name.toLowerCase()).includes(searchQuery.toLowerCase())) --- ?????????? ?????????????? ?????? ??????????????
  // }, [debounceValue]);

  function handleProductLike(product) {
    const isLike = product.likes.some((id) => id === currentUser._id);
    api.changeLikeProductStatus(product._id, !isLike).then((newCard) => {
      // ?? ?????????????????????? ???? ???????? ???????? ?????????? ?????? ?????? ???????????????????? ???????????? PUT ?????? DELETE
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

  const curPaginate = (pagePaginate) => {
    setPage(pagePaginate)
  }

// ???????????????? ?????????????? ?????? ?????????????????? ?????????????? 

  for (let i = 1; i <= maxPage; i ++) {
    arrMaxPage.push(i)
  }
  console.log(favoriteCards)

  return (
    <div>
      <FavoriteContext.Provider value={{favoriteCards}}>
      <UserContext.Provider value={{currentUser, selectTab, setSelectTab, allCardsForSort}}>
        <Header currentUser={currentUser} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            path="thr_homework3_dogs3"
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
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
      </UserContext.Provider>
      </FavoriteContext.Provider>
    </div>
  );
}

export default App;
