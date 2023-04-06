import React, { useState } from 'react'
import s from "./rating.module.css"
import { ReactComponent as Star2 } from "./img/star-filled-fiveointed-shape-svgrepo-com.svg"
import { useDispatch, useSelector } from 'react-redux'
import { changeRating, numRating } from '../../storage/reducers/ratingReducer'


export default function Rating({ setAddRevAvailable }) {

  
  const rating = useSelector(numRating)
  const dispatch = useDispatch()

  const [temporaryRating, setTemporaryRating] = useState(rating)

  const toGo = () => {
    window.scrollTo({
      top: 1060,
      behavior: "smooth"
    })
  }

  const handleRating = (index) => {
    dispatch(changeRating(index + 1))
    toGo()
    setAddRevAvailable(true)
  }

  const ratingArr = new Array(5).fill(null)

  return (
    <div className={s.wrapper}>
      {ratingArr.map((star, index) => (
        <span key={index}>
          <Star2 className={`${s.star} ${(index < temporaryRating) && s.rating}`}
                onMouseEnter={() => setTemporaryRating(index + 1)}
                onMouseLeave={() => setTemporaryRating(rating)}
                onClick={() => handleRating(index)}
          />
        </span>
      ))}
    </div>
  )
}
