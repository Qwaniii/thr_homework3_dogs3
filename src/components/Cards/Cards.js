import React, { useContext } from "react";
import { useLocation } from "react-router";
import { UserContext } from "../../Context/UserContext";
import Card from "../Card/Card";
import Options from "../Options/Options";
import Paginate from "../Paginate/Paginate";
import s from "./cards.module.css";

export default function Cards({
  goods,
  searchQuery,
  onProductLike,
  onProductLikeAllProducts,
  setIsLoading,
  page,
  setPage,
  maxPage,
  countPage,
  curPaginate,
  cardsOnList,
  setCardsOnList,
  totalSearch,
  anchorPaginate,
  setAnchorPaginate,
  cardsForPaginate,
  curPaginateOnClient,
  setBasket
}) {
  const { currentUser, selectTab } = useContext(UserContext);
  const arrCountProducts = [12, 24, 36, 48];

  const location = useLocation();

  return (
    <main>
      <div className="container">
        <div className={s.box}>
          {searchQuery && (
            <div className={s.searchInfo}>
              По запросу <b>{searchQuery}</b> найдено: <b>{totalSearch}</b>
              {totalSearch % 10 === 1 && " позиция"}
              {totalSearch % 10 > 1 && totalSearch % 10 < 5 && " позиции"}
              {(totalSearch % 10 >= 5 || !totalSearch) && " позиций"}
            </div>
          )}
          {!searchQuery && (
            <div className={s.option}>
              {location.pathname === "/thr_homework3_dogs3/favorite" ? (
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  Избранные товары:
                </div>
              ) : (
                <Options setAnchorPaginate={setAnchorPaginate} setPage={setPage} />
              )}
            </div>
          )}
        </div>
        <div className={s.cards}>
          {selectTab === "all" &&
            goods
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((item, index) => (
                <Card
                  card={item}
                  key={item._id}
                  onProductLike={onProductLike}
                  currentUser={currentUser}
                  setIsLoading={setIsLoading}
                  goods={goods}
                  setBasket={setBasket}
                />
              ))}
          {selectTab === "new" &&
            cardsForPaginate
              //   .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((item, index) => (
                <Card
                  card={item}
                  key={item._id}
                  onProductLike={onProductLikeAllProducts}
                  currentUser={currentUser}
                  setIsLoading={setIsLoading}
                  setBasket={setBasket}
                />
              ))}
          {selectTab === "cheap" &&
            cardsForPaginate.map((item, index) => (
              <Card
                card={item}
                key={item._id}
                onProductLike={onProductLikeAllProducts}
                currentUser={currentUser}
                setIsLoading={setIsLoading}
              />
            ))}
          {selectTab === "expens" &&
            cardsForPaginate.map((item, index) => (
              <Card
                card={item}
                key={item._id}
                onProductLike={onProductLikeAllProducts}
                currentUser={currentUser}
                setIsLoading={setIsLoading}
              />
            ))}
          {selectTab === "popular" &&
            cardsForPaginate.map((item, index) => (
              <Card
                card={item}
                key={item._id}
                onProductLike={onProductLikeAllProducts}
                currentUser={currentUser}
                setIsLoading={setIsLoading}
                likes={item.likes.length}
              />
            ))}
          {selectTab === "sale" &&
            cardsForPaginate.map((item, index) => (
              <Card
                card={item}
                key={item._id}
                onProductLike={onProductLikeAllProducts}
                currentUser={currentUser}
                setIsLoading={setIsLoading}
              />
            ))}
        </div>

        {/* {selectTab === "all" && !searchQuery && ( */}

 

        {!(location.pathname === "/thr_homework3_dogs3/favorite") && !(countPage.length === 1) &&
          <div className={s.paginate}>
            {maxPage <= 5 && 
                countPage
                .map((paginateNum) => (
                    <Paginate
                    key={paginateNum}
                    paginateNum={paginateNum}
                    page={page}
                    setPage={setPage}
                    curPaginate={curPaginate}
                    />
                ))}

              {maxPage > 5 && page > 3 && 
                            <>
                                <Paginate
                                paginateNum={1}
                                page={page}
                                setPage={setPage}
                                curPaginate={curPaginate}
                                />{" "}
                                <span className={s.dot}>...</span>
                            </>}
              { maxPage > 5 && page < 3 &&
                      countPage
                          .slice(0, 3)
                          .map((paginateNum) => (
                          <Paginate
                              key={paginateNum}
                              paginateNum={paginateNum}
                              page={page}
                              setPage={setPage}
                              curPaginate={curPaginate}
                    />
                  ))}
            {maxPage > 5 && page === 3 &&
                    countPage
                        .slice(0, page + 1)
                        .map((paginateNum) => (
                        <Paginate
                            key={paginateNum}
                            paginateNum={paginateNum}
                            page={page}
                            setPage={setPage}
                            curPaginate={curPaginate}
                        />
                        ))}
            {maxPage > 5 && page > 3 && page < countPage.length - 2 &&
                    countPage
                        .slice(page - 2, page + 1)
                        .map((paginateNum) => (
                        <Paginate
                            key={paginateNum}
                            paginateNum={paginateNum}
                            page={page}
                            setPage={setPage}
                            curPaginate={curPaginate}
                        />
                        ))}
            {maxPage > 5 && page > 3 && page > countPage.length - 3 &&
                    countPage
                        .slice(page - 2, countPage.length + 2)
                        .map((paginateNum) => (
                        <Paginate
                            key={paginateNum}
                            paginateNum={paginateNum}
                            page={page}
                            setPage={setPage}
                            curPaginate={curPaginate}
                        />
                        ))} 
            {maxPage > 5 && page < countPage.length - 2 && (
                <>
                    <span className={s.dot}>...</span>
                    <Paginate
                    paginateNum={countPage.length}
                    page={page}
                    setPage={setPage}
                    curPaginate={curPaginate}
                    />
                </>
                )}
          </div>
        }

        {!(location.pathname === "/thr_homework3_dogs3/favorite") && (
          <div className={s.form}>
            <label htmlFor="count">Количество продуктов на странице</label>
            <select
              id="count"
              className={s.select}
              value={cardsOnList}
              onChange={(e) => {setCardsOnList(e.target.value); setPage(1)}}
            >
              {arrCountProducts.map((countLimitPage) => (
                <option key={countLimitPage} value={countLimitPage}>
                  {countLimitPage}
                </option>
              ))}
              {/* <option value="12">12</option>
                                    <option value="24">24</option>
                                    <option value="36">36</option>
                                    <option value="48">48</option> */}
            </select>
          </div>
        )}
      </div>
    </main>
  );
}
