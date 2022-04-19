import { createSlice } from '@reduxjs/toolkit'

export const coreUi = createSlice({
  name: 'coreUi',

  initialState: {
    sidebarShow: true,
    sidebarUnfoldable: false,
  },

  reducers: {
    changeSidebar: (state, action) => {
      state.sidebarShow = action.payload
    },
    changeFold: (state, action) => {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const { changeSidebar, changeFold } = coreUi.actions

export default coreUi.reducer

// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
