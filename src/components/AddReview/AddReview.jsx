import React from "react";
import { useState } from "react";
import api from "../../Api/Api";
import s from "./addreview.module.css"
import { useDispatch, useSelector } from "react-redux";
import { changeRating, numRating } from "../../storage/reducers/ratingReducer";

const AddReview = ({ id, setAnchorReview, anchorReview, setAddRevAvailable }) => {

const [objReview, setObjectReview] = useState({})

const defaultRating = useSelector(numRating)
const dispatch = useDispatch()

const optionArr = new Array(5).fill(null).map((el, ind) => el = ind + 1)


const onChange = (e) => {
    setObjectReview({...objReview, [e.target.name]: e.target.value})
    dispatch(changeRating(e.target.value))
}

const handleAddReview = (e, id, data) => {
    e.preventDefault();
    console.log(data)
    if (!data.rating) {data.rating = defaultRating || 5}
    api.sendReview(id, data)
        .then((data) => {
            console.log(data)
            setAnchorReview(!anchorReview)
            setObjectReview({})
        })
        .catch(err => console.log(err))
}

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <h3>Отставьте отзыв</h3>
                <form 
                    className={s.form}
                    onSubmit={(e) => handleAddReview(e, id, objReview)}>
                    <div className={s.inner}>
                        <textarea 
                            name="text"
                            value={objReview.text || ""}
                            className={s.textarea} 
                            type="text" 
                            placeholder="Ваш отзыв"
                            onChange={(e) => setObjectReview({...objReview, [e.target.name]: e.target.value})}
                        ></textarea>
                        <div className={s.number}>
                            <label> Ваша оценка
                                <select 
                                    name="rating" 
                                    className={s.innerNum} 
                                    value={defaultRating || 5}
                                    // value={objReview.rating || ""}
                                    onChange={(e) => onChange(e)}>
                                    {optionArr.map(el => 
                                        <option key={el} value={el}>{el}</option>
                                    )}
                                    {/* <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option> */}
                                </select>
                            </label>
                        </div>
                    </div>
                    <input className={s.btn} type="submit" value="Добавить отзыв"></input>
                </form>
                <div onClick={() => setAddRevAvailable(false)} className={s.back}>&#8617;</div>
            </div>

        </div>
    )
}

export default AddReview;