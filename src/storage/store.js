import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReduce"
import editProductReducer from "./reducers/editProductReducer";

const store = configureStore({
  reducer: {
    user: userSlice,
    editProduct: editProductReducer
  }
})

export default store