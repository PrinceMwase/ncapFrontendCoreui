import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signin } from './authenticationSlice'
import { Navigate } from 'react-router-dom'

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const getAuth = createApi({
  reducerPath: 'getAuth',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints(build) {
    return {
      login: build.mutation({
        query: ({ data }) => ({ url: '/ncapp/login', method: 'post', data: data }),
        async onCacheEntryAdded(
          arg,
          {
            dispatch,
            getState,
            extra,
            requestId,
            cacheEntryRemoved,
            cacheDataLoaded,
            getCacheEntry,
          },
        ) {
          cacheDataLoaded.then((response) => {
            dispatch(signin(response.data))
          })
        },
      }),
    }
  },
})

export const { useLoginMutation } = getAuth
