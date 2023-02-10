import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cards from "./components/Cards/Cards";
import { useEffect, useState } from "react";
import api from "./Api/Api";
import useDebounce from "./hooks/useDebounse";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const debounceValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    api.getAppInfo()
      .then(([cardData, currentUserData]) => {
        setCards(cardData.products);        
        setCurrentUser(currentUserData);
      })
    // api.getProductList().then((cardData) => {
    //   console.log(cardData.products)
    //   setCards(cardData.products);
    // });
  }, []);

  useEffect(() => {
    api.search(debounceValue)
      .then(data => {
        setCards(data);
      })
    // const newState = (cardData.products).filter((item) => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()))
  }, [debounceValue]);


	function handleProductLike(product) {
    const isLike = product.likes.some((id) => id === currentUser._id);
		api.changeLikeProductStatus(product._id, !isLike).then((newCard) => {
			// в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
			const newCards = cards.map((c) => {
				console.log("Карточка в переборе", c);
				console.log("Карточка c сервера", newCard);
				return c._id === newCard._id ? newCard : c;
			});
			setCards(newCards);
		});
	}

  return (
    <div>
      <Header currentUser={currentUser} setSearchQuery={setSearchQuery} />
      <Cards goods={cards} searchQuery={searchQuery} onProductLike={handleProductLike} currentUser={currentUser}/>
      <Footer />
    </div>
  );
}

export default App;
