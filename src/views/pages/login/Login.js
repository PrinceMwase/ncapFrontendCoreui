import React, { useContext, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { signin } from 'src/features/auth/authenticationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from 'src/features/auth/authQuery'
import { Navigate } from 'react-router-dom'
import error from './toast'

function Login() {
  const authstatus = useSelector((state) => state.authApi.authenticated)

  // const { push } = Navigate()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  const [login, { isLoading }] = useLoginMutation()

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {authstatus && <Navigate to="/dashboard" replace={true} />}

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>NCAPP</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={async () => {
                            // Execute the trigger with the `id` and updated `name`
                            try {
                              await login({
                                data: {
                                  username,
                                  password,
                                },
                              })
                            } catch (e) {}
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password? {isLoading ? 'loading .... ' : 'idle'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
