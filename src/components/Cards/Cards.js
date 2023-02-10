import React from 'react'
import Card from '../Card/Card'
import s from './cards.module.css'


export default function Cards({goods, searchQuery, onProductLike, currentUser}) {
    
    return (
        <main>
            <div className={s.container}>
                {searchQuery && <div className={s.searchInfo}>По запросу <b>{searchQuery}</b> найдено: <b>{goods.length}</b>
                {(goods.length % 10 === 1) && ' позиция'} 
                {(goods.length % 10 > 1 && goods.length % 10 < 5) && ' позиции'}
                {(goods.length % 10 >= 5 || !goods.length) && ' позиций'}
                </div>}
                <div className={s.cards}>
                    {goods.map((item, index) => (
                        <Card card={item} key={item._id} onProductLike={onProductLike} currentUser={currentUser}/>
                    ))}
                    
                </div>
            </div>
        </main>
    )
}
