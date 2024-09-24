
import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

const Dashboard = () => {
  return (
    <div>Hola Admin</div>
  )
}

Dashboard.layout = (page) => <AdminLayout children={page}/>;
export default Dashboard