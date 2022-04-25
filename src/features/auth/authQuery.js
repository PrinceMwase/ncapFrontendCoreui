import { createApi } from '@reduxjs/toolkit/query/react'

import { signin } from './authenticationSlice'
import axiosBaseQuery from 'src/utils/useAxios'

export const getAuth = createApi({
  reducerPath: 'getAuth',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints(build) {
    return {
      login: build.mutation({
        query: ({ data }) => ({
          url: 'login/login/',
          method: 'post',
          data: data,
        }),
        async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
          console.log('prince')
          cacheDataLoaded.then((response) => {
            console.log('prince2')
            dispatch(signin(response.data))
          })
        },
      }),
    }
  },
})

export const { useLoginMutation } = getAuth
