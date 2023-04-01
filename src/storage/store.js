import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReduce"

const store = configureStore({
  reducer: {
    user: userSlice,
  }
})

export default store