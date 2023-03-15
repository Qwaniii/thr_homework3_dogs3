import React from 'react'
import { useNavigate } from 'react-router'
import CardDB from '../Card/CardDB'
import s from './cards.module.css'


export default function CardsDB({ goods, setIsLoading }) {

    const navigate = useNavigate()
    

    return (
        <main>
            <div className="container">
                <div className={s.logout}>
                    <h4>Вам доступен ограниченный функционал</h4>
                    <h5>Для доступа к полной версии </h5>
                    <p><span className={s.navi} onClick={() => navigate("/thr_homework3_dogs3/login")}>Войдите</span> или <span className={s.navi} onClick={() => navigate("/thr_homework3_dogs3/registration")}>Зарегистрируйтесь</span></p>
                </div>
                <div className={s.cards}>
                    {goods.map((item, index) => (
                        <CardDB card={item} key={item._id} setIsLoading={setIsLoading}/>
                    ))}
                </div>
            </div>
        </main>
    )
}
