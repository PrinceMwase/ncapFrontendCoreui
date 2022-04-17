import { useContext, createContext } from 'react'

const auth = {
  user: null,
  authenticated: false,
  userType: 'anon',
}

const AuthContext = createContext(auth)

export default AuthContext
