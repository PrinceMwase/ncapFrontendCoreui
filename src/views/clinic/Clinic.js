import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setClinic } from 'src/store/slices/supportGroupSlice'
import { useGetPatientBySupportGroupMutation, useGetPatientsQuery } from 'src/features/auth/patient'
import { setGroupFilter } from 'src/store/slices/patientSlice'
import { useGetSupportGroupsQuery } from 'src/features/auth/supportGroup'

const Dashboard = () => {
  const currentClinic = useSelector((state) => state.SupportGroupApiStore.name)
  const filteredPatients = useSelector((state) => state.PatientsGroupApiStore.patients)
  const filteredPatientsCheck = useSelector((state) => state.PatientsGroupApiStore.filterd)
  const { data, isLoading } = useGetSupportGroupsQuery()
  const patients = useGetPatientsQuery()
  const dispatch = useDispatch()
  const [getPatientBySupportGroup, { isSuccess }] = useGetPatientBySupportGroupMutation()
  const progressExample = [
    { title: 'Males', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Females', value: '24.093 Users', percent: 20, color: 'info' },
    {
      title: isLoading ? 'loading...' : currentClinic ? currentClinic : 'Support Group',
      value: '78.706 Views',
      percent: 60,
      color: 'warning',
    },
    { title: 'Active', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const currentPatients = (patient) => (
    <CTableRow key={patient.id}>
      <CTableHeaderCell scope="row">{patient.id}</CTableHeaderCell>

      <CTableDataCell>{patient.uuid}</CTableDataCell>

      <CTableDataCell>{patient.sex}</CTableDataCell>

      <CTableDataCell>{patient.date_of_birth}</CTableDataCell>

      <CTableDataCell>
        {patient.clinic_set && patient.clinic_set.length > 0
          ? patient.clinic_set[0].visit_date
          : null}
      </CTableDataCell>
      <CTableDataCell>
        {patient.clinic_set && patient.clinic_set.length > 0
          ? patient.clinic_set[0].visit_date
          : null}
      </CTableDataCell>
      <CTableDataCell>
        {patient.clinic_set && patient.clinic_set.length > 0
          ? patient.clinic_set[0].next_appointment
          : null}
      </CTableDataCell>
    </CTableRow>
  )
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="patients" className="card-title mb-0">
                Patients
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-md-block">
              <CButton color="primary" className="float-end" size="sm">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CDropdown className="float-end me-3">
                <CDropdownToggle href="#" color="secondary" size="sm">
                  {isLoading ? 'loading...' : currentClinic ? currentClinic : 'Support Group'}
                </CDropdownToggle>

                <CDropdownMenu>
                  {data
                    ? data.results.map((group) => (
                        <CDropdownItem
                          key={group.id}
                          onClick={async () => {
                            dispatch(setGroupFilter())
                            dispatch(setClinic({ name: group.name, id: group.id }))
                            await getPatientBySupportGroup({ name: group.name, id: group.id })
                          }}
                        >
                          {group.name}
                        </CDropdownItem>
                      ))
                    : null}
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
        </CCardBody>
        {/* insert table here */}
        <CTable borderless hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>

              <CTableHeaderCell scope="col">Name</CTableHeaderCell>

              <CTableHeaderCell scope="col">Gender</CTableHeaderCell>

              <CTableHeaderCell scope="col">Age</CTableHeaderCell>

              <CTableHeaderCell scope="col">last vl regimen</CTableHeaderCell>
              <CTableHeaderCell scope="col">last appointment</CTableHeaderCell>
              <CTableHeaderCell scope="col">next appointment</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {patients.data && !filteredPatientsCheck
              ? patients.data.results.map(currentPatients)
              : null}
            {isSuccess ? filteredPatients.results.map(currentPatients) : null}
          </CTableBody>
        </CTable>
        {/* end table */}
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Dashboard
