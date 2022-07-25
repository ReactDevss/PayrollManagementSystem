import React from "react"
import Header from "../Layout/Header"
import Sidebar from "../Layout/Sidebar"
import Content from "../Layout/Content"
import { BrowserRouter as Router } from "react-router-dom"
export default function IndexPage()
{

    return(
       <>
        <Header/>
        <div id="layoutSidenav">
        <Sidebar/>
        <Content/> 
      
      </div>
      </> 
    )
}