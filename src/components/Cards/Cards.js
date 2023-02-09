import React from 'react'
import Card from '../Card/Card'
import s from './cards.module.css'


export default function Cards({goods, searchQuery}) {
    
    return (
        <main>
            <div className={s.container}>
                {searchQuery && <div className={s.searchInfo}>По запросу {searchQuery} найдено: {goods.length} позиции</div>}
                <div className={s.cards}>
                    {goods.map((item, index) => (
                        <Card card={item} key={item._id}/>
                    ))}
                    
                </div>
            </div>
        </main>
    )
}
