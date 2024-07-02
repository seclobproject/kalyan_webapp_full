import React, { useState } from 'react'
import Header from '../layouts/Header'
import Sidebar_left from '../layouts/Sidebar_left'
import { Outlet } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Rightbar from '../layouts/Rightbar'

function OutletConnnection() {

  const [drawer,setDrawer]=useState(false)


  const toggleSidebar = () => {
    setDrawer(!drawer);
  };

  return (
    <div>
        <div id="wrapper">
        <Header toggleSidebar={toggleSidebar} drawer={drawer}/>
        <Sidebar_left drawer={drawer}/>
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