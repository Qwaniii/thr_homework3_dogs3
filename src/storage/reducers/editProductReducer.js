import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  modalEdit: false,

}

const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    modalWindow(state, action) {
      state.modalEdit = action.payload
    }
  }
})

export const { modalWindow } = editProductSlice.actions

export const modalEdit = (state) => state.editProduct.modalEdit

export default editProductSlice.reducer