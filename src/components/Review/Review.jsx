import React, { useState } from "react"
import { useEffect } from "react"
import api from "../../Api/Api"
import s from "./review.module.css"
import cn from "classnames"
import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"

const Review = ({ review, anchorReview, setAnchorReview, setReviewRating, modalUserReview, setModalUserReview, setDelObj }) => { 

    const dateCreated = new Date(review.created_at)
    const [authorReview, setAuthorReview] = useState({});
    const { currentUser } = useContext(UserContext)
  

    useEffect(() => {
        api.getReviewAuthor(review.author)
            .then((data) => {
                setAuthorReview(data)
            })
            .catch((err) => console.log(err))
    }, [review.author])

    const delReview = () => {
        setModalUserReview(true)
        setDelObj({product: review.product, review: review._id})
    }


    // useEffect(() => {
    //     const readyRating = review.rating.reduce((acc, curVal) => acc + curVal, 0)
    //     console.log(readyRating)
    // }, [])
// 
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.header} >
                    <div className={s.imgWrapper}><img className={s.avatar} src={authorReview.avatar} alt={authorReview.name}></img></div>
                    {authorReview.name}
                    {currentUser._id === review.author && <div onClick={delReview} className={s.deleteRev}>Удалить</div>}
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