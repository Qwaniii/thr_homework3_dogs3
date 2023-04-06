import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  rating: null,
  newRate: false
}

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    changeRating(state, action) {
      state.rating = action.payload
    }
  }
})

export const { changeRating } = ratingSlice.actions

export const numRating = (state) => state.rating.rating

export default ratingSlice.reducer