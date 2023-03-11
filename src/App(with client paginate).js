import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import api from "./Api/Api";
import useDebounce from "./hooks/useDebounse";
import { Route, Routes } from "react-router";
import IndexPage from "./Page/IndexPage";
import ProductPage from "./Page/ProductPage";
import NotFoundPage from "./Page/NotFoundPage";
import { UserContext } from "./Context/UserContext";

function App() {
  const [cards, setCards] = useState([]);
  const [cardsForPaginate, setCardsForPaginate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectTab, setSelectTab] = useState("all")
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cardsOnList, setCardsonList] = useState(12);
  const arrMaxPage = [];

  const debounceValue = useDebounce(searchQuery, 500);

  const startPaginate = (cardsOnList * page) - cardsOnList;


  useEffect(() => {
    api.getAppInfo().then(([cardData, currentUserData]) => {
      setCards(cardData.products);
      setMaxPage(Math.ceil(cardData.total / cardsOnList))
      setCurrentUser(currentUserData);
      setCardsForPaginate(cardData.products.slice(startPaginate, startPaginate + cardsOnList))
      setIsLoading(true);
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

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

  useEffect(() => {
    api.search(debounceValue).then((data) => {
      // setCards(data);
      setCardsForPaginate(data);
    });
    // const newState = (cardData.products).filter((item) => (item.name.toLowerCase()).includes(searchQuery.toLowerCase())) --- поиск товаров без сервера
  }, [debounceValue]);

  function handleProductLike(product) {
    const isLike = product.likes.some((id) => id === currentUser._id);
    api.changeLikeProductStatus(product._id, !isLike).then((newCard) => {
      // в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      setCards(newCards);
    });
  }

  const curPaginate = (pagePaginate) => {
    setPage(pagePaginate)
    setCardsForPaginate(cards.slice(startPaginate, startPaginate + cardsOnList))
  }

// Создание массива для пагинации страниц 

  for (let i = 1; i <= maxPage; i ++) {
    arrMaxPage.push(i)
  }
  
  useEffect(() => {
    setCardsForPaginate(cards.slice(startPaginate, startPaginate + cardsOnList))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPaginate])

  console.log(cardsForPaginate)

  return (
    <div>
      <UserContext.Provider value={{currentUser, selectTab, setSelectTab, cards}}>
        <Header currentUser={currentUser} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            index
            element={
              <IndexPage
                cards={cardsForPaginate}
                searchQuery={searchQuery}
                handleProductLike={handleProductLike}
                currentUser={currentUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                countPage={arrMaxPage}
                page={page}
                setPage={setPage}
                curPaginate={curPaginate}
              />
            }
          ></Route>
          <Route
            path="product/:prodId"
            element={
              <ProductPage
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                cards={cards}
                setCards={setCards}
              />
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
