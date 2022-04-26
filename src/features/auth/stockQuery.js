import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from 'src/utils/useAxios'

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
    }
  },
})

export const { useGetStockQuery, useGetDrugQuery } = stockApi
