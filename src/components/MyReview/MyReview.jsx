import React, { useEffect } from "react"
import { useContext } from "react"
import api from "../../Api/Api"
import { UserContext } from "../../Context/UserContext"

const MyReview = ({ myReviewArr, setMyReviewArr }) => {


    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        const tokenStor = sessionStorage.getItem('token')
        if(tokenStor) {
          api.setToken(tokenStor)
        }
      }, [myReviewArr])

    useEffect(() => {
        api.getAllReview()
            .then((data) => {
                console.log(data)
                const myData = data.filter((item) => item.author._id === currentUser._id)
                setMyReviewArr(myData)
            })
    }, [currentUser, setMyReviewArr])

    console.log(myReviewArr)
    return(
        <div className="container">
            <h3>Мои отзывы</h3>
            {myReviewArr.map((myRev) => (
                <div>
                    <div>{myRev?.author.name}</div>
                    <div key={myRev._id}>
                        {myRev?.text}
                        {myRev?.rating}
                    </div>
                    <div>{}</div>
                </div>
            ))}
        </div>
    )
}

export default MyReview