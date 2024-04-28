'use client'
import {
  getAllUsersAction,
  getUnverifiedUsersAction
} from '@/actions/admin/getAllUserAction'
import TablaHeader from '@/components/Admin/TablaHeader'
import TablaUsuarios from '@/components/Admin/Users/TablaUsuarios'
import { useEffect, useState } from 'react'

const STATUS_PRIORITY = ['u', 'v', 'b']
const ROLE_PRIORITY = ['owner', 'admin', 'user']

const AdminUsuariosPanel = ({ home = false }) => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  const updateData = () => {
    ;(home ? getUnverifiedUsersAction() : getAllUsersAction()).then(
      (response) => {
        const nuevosUsuarios = JSON.parse(response)
        nuevosUsuarios.sort((a, b) => {
          if (a.status != b.status) {
            return (
              STATUS_PRIORITY.findIndex((val) => val == a.status) -
              STATUS_PRIORITY.findIndex((val) => val == b.status)
            )
          }
          if (a.role != b.role) {
            return (
              ROLE_PRIORITY.findIndex((val) => val == a.role) -
              ROLE_PRIORITY.findIndex((val) => val == b.role)
            )
          }
          return a.username.toLowerCase() < b.username.toLowerCase()
            ? -1
            : b.username.toLowerCase() < a.username.toLowerCase()
              ? 1
              : 0
        })
        console.log(nuevosUsuarios)
        setUsuarios(nuevosUsuarios)
        setLoading(false)
      }
    )
  }

  useEffect(updateData, [home])
  return (
    <TablaHeader
      title={home ? 'Usuarios (sin verificar)' : 'Usuarios'}
      buttons={
        home
          ? []
          : [
              {
                text: 'Refresh',
                handleClick: updateData
              }
            ]
      }
    >
      <TablaUsuarios
        usuarios={usuarios}
        updateData={updateData}
        loading={loading}
      />
    </TablaHeader>
  )
}

export default AdminUsuariosPanel
