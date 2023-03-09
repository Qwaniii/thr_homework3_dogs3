import React, { useState } from "react"
import { useEffect } from "react"
import api from "../../Api/Api"
import s from "./review.module.css"
import cn from "classnames"

const Review = ({ review, anchorReview, setReviewRating }) => {

    const [authorReview, setAuthorReview] = useState({})
    const dateCreated = new Date(review.created_at)

    useEffect(() => {
        api.getReviewAuthor(review.author)
            .then((data) => {
                setAuthorReview(data)
            })
    }, [])


    // useEffect(() => {
    //     const readyRating = review.rating.reduce((acc, curVal) => acc + curVal, 0)
    //     console.log(readyRating)
    // }, [])
// 

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.header}>
                    <div className={s.imgWrapper}><img className={s.avatar} src={authorReview.avatar} alt={authorReview.name}></img></div>
                    {authorReview.name}
                </div>
                <div className={s.main}>
                    {review.text}
                </div>
                <div className={s.footer}>
                    {dateCreated.toLocaleDateString("ru-RU", {
                    month: "2-digit",
                    day: "numeric",
                    year: "numeric",
                })}
                </div>
                <div className={cn(s.rating, 
                    {[s.yellow]: (review.rating === 3)},
                    {[s.green]: (review.rating > 3)})}>
                    {review.rating}
                </div>

            </div>
        </div>
    )
}

export default Review;