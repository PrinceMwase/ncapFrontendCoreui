import { createSlice } from '@reduxjs/toolkit'

export const authApi = createSlice({
  name: 'authApi',

  initialState: {
    user: null,
    authenticated: false,
  },

  reducers: {
    signin: (state, action) => {
      state.user = action.payload
      state.authenticated = true
    },
  },
})

export const { signin } = authApi.actions

export default authApi.reducer
