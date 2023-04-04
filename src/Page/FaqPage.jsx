import React from 'react'
import FaqData from "../components/FAQ/faqDB.json"
import Faq from '../components/FAQ/Faq'
import { useNavigate } from 'react-router'

export default function FaqPage() {

  const navigate = useNavigate()

  return (
    <div className='container'>
      <div onClick={() => navigate(-1)} className='back__history'>
        &lt;Назад
      </div>
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
