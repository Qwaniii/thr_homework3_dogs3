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

  return (
    <div>
      <Header currentUser={currentUser} setSearchQuery={setSearchQuery} />
      <Cards goods={cards} searchQuery={searchQuery}/>
      <Footer />
    </div>
  );
}

export default App;
