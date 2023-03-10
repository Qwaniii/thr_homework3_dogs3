import React from "react";
import { useState } from "react";
import api from "../../Api/Api";
import s from "./addreview.module.css"

const AddReview = ({ id, setAnchorReview, anchorReview }) => {

const [objReview, setObjectReview] = useState({})

const handleAddReview = (e, id, data) => {
    e.preventDefault();
    console.log(objReview)
    api.sendReview(id, data)
        .then((data) => {
            console.log(data)
            setAnchorReview(!anchorReview)
        })
        .catch(err => console.log(err))
    setObjectReview({})
}



console.log(objReview)

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
                            <label> Оценка
                                <select 
                                    name="rating" 
                                    className={s.innerNum} 
                                    // value={objReview.rating || ""}
                                    onChange={(e) => setObjectReview({...objReview, [e.target.name]: e.target.value})}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5} selected>5</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <input className={s.btn} type="submit" value="Добавить отзыв"></input>
                </form>
            </div>

        </div>
    )
}

export default AddReview;