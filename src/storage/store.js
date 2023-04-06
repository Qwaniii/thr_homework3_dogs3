import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReduce"
import editProductReducer from "./reducers/editProductReducer";
import ratingReducer from "./reducers/ratingReducer";

const store = configureStore({
  reducer: {
    user: userSlice,
    editProduct: editProductReducer,
    rating: ratingReducer
  }
})

export default store