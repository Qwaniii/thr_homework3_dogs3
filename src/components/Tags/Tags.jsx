import React from 'react'
import s from "./tags.module.css"

export default function Tags({ tag }) {
  return (
    <div>
        <div className={s.background}>
          <div className={s.tag}>{tag}</div>
        </div>
    </div>
  )
}
