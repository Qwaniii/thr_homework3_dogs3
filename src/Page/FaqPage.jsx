import React from 'react'
import FaqData from "../components/FAQ/faqDB.json"
import Faq from '../components/FAQ/Faq'

export default function FaqPage() {
  return (
    <div className='container'>
      <div className='faq__wrapper'>
        <h3 className='title'>Часто задаваемые вопросы:</h3>
        <div className='faq__content'>
          {FaqData.map((item, index) => (
            <Faq key={index} item={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}
