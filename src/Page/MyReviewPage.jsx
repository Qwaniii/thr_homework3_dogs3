import MyReview from "../components/MyReview/MyReview"

const MyReviewPage = ({ myReviewArr, setMyReviewArr }) => {
    return (
        <div>
            <MyReview
                myReviewArr={myReviewArr}
                setMyReviewArr={setMyReviewArr}
            />
        </div>
    )
}

export default MyReviewPage