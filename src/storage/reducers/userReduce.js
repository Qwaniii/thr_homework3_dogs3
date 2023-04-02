import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../Api/Api"

const initialState = {
  infoUser: {},
  message: '',
  editAnchor: false,
  avatarAnchor: false,
}

export const asyncEditUserInfo= createAsyncThunk(
  'edit/userInfo',
  async (data, { rejectWithValue }) => {
      try {
        const response = await api.editUserInfo(data);
        return response
    } catch(err) {
        return rejectWithValue(err.message)
    }
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
    },
    editAvatar(state, action) {
      state.avatarAnchor = action.payload
    },
    setMessage(state, action) {
      state.message = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncEditUserInfo.fulfilled, (state, action) => {
        console.log(action.payload)

        state.infoUser = action.payload
        state.editAnchor = false
        state.message = "Данные сохранены!"
      })
      .addCase(asyncEditUserInfo.rejected, (state, action) => {
        console.log(action.error)
        console.log(action)
        state.message = "Ошибка"
        // state.message = action.payload
      })
    
    builder
        .addCase(asyncEditUserAvatar.fulfilled, (state, action) => {
          state.infoUser = action.payload
          state.avatarAnchor = false
          state.message = "Аватар изменен!"

        })
        .addCase(asyncEditUserAvatar.rejected, (state, action) => {
          console.log(action)
          state.message = "Ошибка"

        })
  }
      
    
})

export const { changeName, changeAbout, changeAvatar, getUser, editState, editAvatar, setMessage } = userSlice.actions 

export const userName = (state) => state.user.infoUser.name
export const userAvatar = (state) => state.user.infoUser.avatar
export const userAbout = (state) => state.user.infoUser.about
export const userEmail = (state) => state.user.infoUser.email
export const editAnchor = (state) => state.user.editAnchor
export const avatarAnchor = (state) => state.user.avatarAnchor
export const messageEdit = (state) => state.user.message


export default userSlice.reducer

