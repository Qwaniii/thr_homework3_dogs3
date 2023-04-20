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
    
    console.log("review", review)

    useEffect(() => {
        api.getReviewAuthor(review.author._id)
            .then((data) => {
                setAuthorReview(data)
            })
            .catch((err) => console.log(err))
    }, [review.author])

    const delReview = () => {
        setModalUserReview(true)
        setDelObj({product: review.product, review: review._id})
        console.log(review.product, review._id)
    }

    const defaultBackground = "https://талисман-ростов.рф/wp-content/uploads/woocommerce-placeholder.png"

    // useEffect(() => {
    //     const readyRating = review.rating.reduce((acc, curVal) => acc + curVal, 0)
    //     console.log(readyRating)
    // }, [])
// 
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.header} >
                    <div className={s.imgWrapper}><img className={s.avatar} src={authorReview.avatar ? authorReview.avatar : defaultBackground} alt={authorReview.name}></img></div>
                    {authorReview.name ? authorReview.name : "Гость Иванов"}
                    {currentUser._id === review.author._id && <div onClick={delReview} className={s.deleteRev}>Удалить</div>}
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