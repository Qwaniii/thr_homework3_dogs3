import React from 'react'
import s from './footer.module.css'


export default function Footer() {
  return (
    <footer className='footer'>
        <div  className='container'>
          <div class={s.wrapper}>
            made by Oleg &copy;
          </div>
        </div>
    </footer>
  )
}