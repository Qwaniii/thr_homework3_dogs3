import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import Card from '../Card/Card'
import CardDB from '../Card/CardDB'
import Options from '../Options/Options'
import Paginate from '../Paginate/Paginate'
import s from './cards.module.css'


export default function CardsDB({ goods, setIsLoading, cardsOnList, setCardsOnList }) {
    

    return (
        <main>
            <div className="container">
                <div className={s.cards}>
                    {goods.map((item, index) => (
                        <CardDB card={item} key={item._id} setIsLoading={setIsLoading}/>
                    ))}
                </div>
            </div>
        </main>
    )
}
