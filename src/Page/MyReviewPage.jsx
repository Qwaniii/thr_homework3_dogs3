import MyReview from "../components/MyReview/MyReview"
import "./index.css"

const MyReviewPage = ({ myReviewArr, setMyReviewArr, isLoading, setIsLoading }) => {


    return (
            <div className="container">
                <h3 className="myreview">Мои отзывы ( {(myReviewArr.length).toString()} )</h3>
                    {myReviewArr
                        .map((myRev) => (
                        <MyReview
                            myRev={myRev}
                            key = {myRev._id}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                        ))
                        .reverse()}
                
            </div>
    )
}

export default MyReviewPage