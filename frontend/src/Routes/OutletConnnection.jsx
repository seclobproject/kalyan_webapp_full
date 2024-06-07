import React, { useState } from 'react'
import Header from '../layouts/Header'
import Sidebar_left from '../layouts/Sidebar_left'
import { Outlet } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Rightbar from '../layouts/Rightbar'

function OutletConnnection({showSidebar}) {
  const [drawer,setDrawer]=useState(true)
console.log(showSidebar,"logging");


  return (
    <div>
        <div id="wrapper">
        <Header />
        <Sidebar_left showSidebar={showSidebar}/>
        <div className="content-page">
        <Outlet />
        </div>
        {/* <Rightbar/> */}
        {/* <Footer /> */}
        </div>
    </div>
  )
}

export default OutletConnnection