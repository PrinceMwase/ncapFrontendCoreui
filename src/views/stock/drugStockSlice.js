import { createSlice } from '@reduxjs/toolkit'

/**add A global store for current drug stock information */
export const DrugStockApi = createSlice({
  name: 'DrugStockApiStore',

  initialState: {
    drug: null,
  },

  reducers: {
    setDrugStock: (state, action) => {
      state.drug = action.payload
    },
  },
})

export const { setDrugStock } = DrugStockApi.actions

export default DrugStockApi.reducer
