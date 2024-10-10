import OrgLayout from '@/Layouts/OrgLayout'
import React from 'react'

const Dashboard = () => {
  return (
    <div>Hola org</div>
  )
}

Dashboard.layout = page => (
  <OrgLayout
    children={page}
  />
);

export default Dashboard