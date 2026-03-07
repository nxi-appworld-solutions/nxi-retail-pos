import React from 'react'
import { Outlet } from 'react-router-dom'
import ThemeSettings from '../InitialPage/themeSettings'
import PosHeader from '../feature-module/pos/pages/posHeader'

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