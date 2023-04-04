import { useState } from "react"
import { useNavigate } from "react-router"
import api from "../Api/Api"
import MyReview from "../components/MyReview/MyReview"
import Popup from "../components/Popup/Popup"
import "./index.css"

const MyReviewPage = ({ myReviewArr, setMyReviewArr, isLoading, setIsLoading, setAnchorReview, anchorReview }) => {

    const [deleteComment, setDeleteComment] = useState({})
    const [modalDelete, setModalDelete] = useState(false)
    const navigate = useNavigate()

    const handleDeleteReview = (postId, reviewId) => {
        api.deleteReview(postId, reviewId)
            .then(data => {
              console.log(data)
              setAnchorReview(!anchorReview)
              setModalDelete(false)
            })
            .catch(err => {
              console.log(err.status)
              err.json()
              .then(data => {
                  console.log(data.message)
              })
            })
      }

    return (
            <div className="container">
                <div onClick={() => navigate(-1)} className='back__history'>
                  &lt;Назад
                </div>
                <h3 className="myreview">{myReviewArr > 0 ? `Мои отзывы ( ${(myReviewArr.length).toString()} ) :` : `Нет комментариев...`}</h3>
                    {myReviewArr
                        .map((myRev) => (
                        <MyReview
                            myRev={myRev}
                            key = {myRev._id}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setDeleteComment={setDeleteComment}
                            setModalDelete={setModalDelete}
                        />
                        ))
                        .reverse()}
                <Popup popup={modalDelete} setPopup={setModalDelete}>
                    <div className="review__popup-wrapper">
                      <h4>Удалить отзыв?</h4>
                      <div className="review__btn">
                        <button  onClick={() => setModalDelete(false)}>Отмена</button>
                        <button  onClick={() => handleDeleteReview(deleteComment.product, deleteComment.review)}>Удалить</button>
                      </div>
                    </div>
                </Popup>
                
            </div>
    )
}

export default MyReviewPage