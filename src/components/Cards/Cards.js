import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import Card from '../Card/Card'
import Options from '../Options/Options'
import Paginate from '../Paginate/Paginate'
import s from './cards.module.css'


export default function Cards({ goods, searchQuery, onProductLike, setIsLoading, page, setPage, countPage, curPaginate, cardsOnList, setCardsOnList }) {
    
    const { currentUser, selectTab, allCardsForSort } = useContext(UserContext)
    const arrCountProducts = [12, 24, 36, 48]

    return (
        <main>
            <div className="container">
                <div className={s.box}>
                    {searchQuery && <div className={s.searchInfo}>По запросу <b>{searchQuery}</b> найдено: <b>{goods.length}</b>
                    {(goods.length % 10 === 1) && ' позиция'}
                    {(goods.length % 10 > 1 && goods.length % 10 < 5) && ' позиции'}
                    {(goods.length % 10 >= 5 || !goods.length) && ' позиций'}
                    </div>}
                    {!searchQuery && <div className={s.option}>
                        <Options/>
                    </div>}
                </div>
                <div className={s.cards}>
                    {selectTab === "all" && goods.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser} setIsLoading={setIsLoading}/>
                    ))}
                    {selectTab === "new" && allCardsForSort.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser} setIsLoading={setIsLoading}/>
                    ))}
                    {selectTab === "cheap" && allCardsForSort.sort((a, b) => a.price - b.price).map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser} setIsLoading={setIsLoading}/>
                    ))}
                    {selectTab === "expens" && allCardsForSort.sort((a, b) => b.price - a.price).map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser} setIsLoading={setIsLoading}/>
                    ))}
                    {selectTab === "popular" && allCardsForSort.sort((a, b) => b.likes.length - a.likes.length).map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser} setIsLoading={setIsLoading} likes={item.likes.length}/>
                    ))}
                    {selectTab === "sale" && allCardsForSort.sort((a, b) => b.discount - a.discount).map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser} setIsLoading={setIsLoading}/>
                    ))}
                    
                </div>
                
                {selectTab === "all" && !searchQuery && <div className={s.paginate}>
                    
                        {/* <button>&lArr;</button> */}
                           {page > 3 && <><Paginate 
                                paginateNum={1}
                                page={page}
                                setPage={setPage}
                                curPaginate={curPaginate}
                                />  <span className={s.dot}>...</span>
                                </>
                            } 
                    
                        {page < 3 && countPage
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

                        {page === 3 && countPage
                            .slice(0, page + 1)
                            .map((paginateNum) => ( 
                                <Paginate 
                                    key={paginateNum}
                                    paginateNum={paginateNum}
                                    page={page}
                                    setPage={setPage}
                                    curPaginate={curPaginate}
                            />   
                            )) }                 
                        {page > 3 && page < countPage.length - 2 && countPage
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
                        {page > countPage.length - 3  && countPage
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

                        {page < countPage.length - 2 && <>
                                <span className={s.dot}>...</span>
                                <Paginate 
                                paginateNum={countPage.length}
                                page={page}
                                setPage={setPage}
                                curPaginate={curPaginate}
                                />  
                                </>
                            } 
                            {/* <button>&rArr;</button> */}
                </div>}
                            {selectTab === "all" && !searchQuery && <div className={s.form}>
                                <label htmlFor="count">Количество продуктов на странице</label>
                                <select id="count" className={s.select} value={cardsOnList} onChange={(e) => setCardsOnList(e.target.value)}>
                                    {arrCountProducts.map((countLimitPage) => (
                                        <option key={countLimitPage} value={countLimitPage}>{countLimitPage}</option>
                                    ))}
                                    {/* <option value="12">12</option>
                                    <option value="24">24</option>
                                    <option value="36">36</option>
                                    <option value="48">48</option> */}
                                </select>
                            </div>}

            </div>
        </main>
    )
}
