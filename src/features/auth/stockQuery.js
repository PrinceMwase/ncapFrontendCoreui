import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'src/utils/useAxios'
import { setDrugStock } from 'src/views/stock/drugStockSlice'

/** implement rtkq for support groups */
export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints(build) {
    return {
      getDrug: build.query({
        query: () => ({ url: '/drug_fillable/', method: 'get' }),
      }),
      getStock: build.query({
        query: () => ({ url: `/stock/`, method: 'get' }),
      }),
      getDrugStock: build.mutation({
        query: (id) => ({ url: `/stock/${id}/`, method: 'get' }),
        async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
          cacheDataLoaded.then((response) => {
            dispatch(setDrugStock(response.data))
          })
        },
      }),
    }
  },
})

export const { useGetStockQuery, useGetDrugQuery, useGetDrugStockMutation } = stockApi
