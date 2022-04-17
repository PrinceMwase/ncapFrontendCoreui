import { Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))
const Login = React.lazy(() => import('../views/pages/login/Login'))

const PrivateRoute = () => {
  let { user } = useContext(AuthContext)
  return <Route path="*" name="Home" element={!user ? <Login /> : <DefaultLayout />} />
}

export default PrivateRoute
