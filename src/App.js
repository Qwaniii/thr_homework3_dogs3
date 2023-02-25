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

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectTab, setSelectTab] = useState("all")
  const debounceValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    api.getAppInfo().then(([cardData, currentUserData]) => {
      setCards(cardData.products);
      setCurrentUser(currentUserData);
      setIsLoading(true);
    });
    // api.getProductList().then((cardData) => {
    //   console.log(cardData.products)
    //   setCards(cardData.products);
    // });
  }, []);

  useEffect(() => {
    api.search(debounceValue).then((data) => {
      setCards(data);
    });
    // const newState = (cardData.products).filter((item) => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()))
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

  return (
    <div>
      <UserContext.Provider value={{currentUser, selectTab, setSelectTab}}>
        <Header currentUser={currentUser} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            index
            element={
              <IndexPage
                cards={cards}
                searchQuery={searchQuery}
                handleProductLike={handleProductLike}
                currentUser={currentUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
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
