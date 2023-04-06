import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../Api/Api"

const initialState = {
  modalEdit: false,
  product: {},
  message: "",
  anchor: true
}

export const asyncEditProduct = createAsyncThunk(
  'edit/product',
  async(data, { getState }) => {
    const state = getState()
    console.log(state)
    try {
      const responce = api.editProduct(data, state.editProduct.product._id);
      return responce
    } catch (err) {
      console.log(err)
      return err
    }
  }
)

const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    modalWindow(state, action) {
      state.modalEdit = action.payload
    },
    getProduct(state, action) {
      state.product = action.payload
    },
    emptyMessage(state) {
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncEditProduct.fulfilled, (state, action) => {
        console.log(action.payload)
        state.product = action.payload
        state.modalEdit = false
        state.anchor = !(state.anchor)
        state.message = "Изменения сохранены"
      })
      .addCase(asyncEditProduct.rejected, (state, action) => {
        console.log(action.payload)
        state.message = "Error"
      })
  }
})

export const { modalWindow, getProduct, emptyMessage } = editProductSlice.actions

export const modalEdit = (state) => state.editProduct.modalEdit
export const productInfo = (state) => state.editProduct.product
export const anchorEditProduct = (state) => state.editProduct.anchor
export const editMessage = (state) => state.editProduct.message

export default editProductSlice.reducer