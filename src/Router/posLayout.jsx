import React from 'react'
import { Outlet } from 'react-router-dom'
import ThemeSettings from '../InitialPage/themeSettings'
<<<<<<< HEAD
import PosHeader from '../features/pos/pages/posHeader'
=======
import PosHeader from '../feature-module/pos/pages/posHeader'
>>>>>>> 1c9ca8c (again post)

const PosLayout = () => {
  return (
    <>
        <PosHeader />
        <Outlet />
        {/* <ThemeSettings /> */}
    </>
  )
}

export default PosLayout