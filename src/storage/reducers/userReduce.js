import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../Api/Api"

const initialState = {
  infoUser: {},
  message: '',
  editAnchor: false,
}

export const asyncEditUserInfo= createAsyncThunk(
  'edit/userInfo',
  async (data) => {
    const response = await api.editUserInfo(data);
    return response
}
)

export const asyncEditUserAvatar = createAsyncThunk(
  'edit/userAvatar',
  async (avatar) => {
    const respAva = await api.editUserAvatar(avatar);
    return respAva
  }
)

const userSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    changeName(state, action) {
      state.infoUser.name = action.payload
    },
    changeAbout(state, action) {
      state.infoUser.about = action.payload
    },
    changeAvatar(state, action) {
      state.infoUser.avatar = action.payload
    },
    getUser(state, action) {
      state.infoUser = action.payload
    },
    editState(state, action) {
      state.editAnchor = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncEditUserInfo.fulfilled, (state, action) => {
        state.infoUser = action.payload
      })
      .addCase(asyncEditUserInfo.rejected, (state, action) => {
        console.log(action.payload)
        // state.message = action.payload
      })
  }
})

export const { changeName, changeAbout, changeAvatar, getUser, editState } = userSlice.actions 

export const userName = (state) => state.user.infoUser.name
export const userAvatar = (state) => state.user.infoUser.avatar
export const userAbout = (state) => state.user.infoUser.about
export const userEmail = (state) => state.user.infoUser.email
export const editAncor = (state) => state.user.editAnchor


export default userSlice.reducer

