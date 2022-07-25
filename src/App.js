import Header from './Components/Layout/Header';
import Sidebar from './Components/Layout/Sidebar';
import Content from './Components/Layout/Content';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Components/Common/LoginForm';
import IndexPage from './Components/Common/IndexPage';
import { useEffect, useState } from 'react';

function App() 
{
     var userDetails=localStorage.getItem("userDetails");
     const[isLoggedIn,setIsLoggedIn]=useState("");
     useEffect(()=>{
       if(userDetails)
       {
           setIsLoggedIn("true") 
        }
       else
       {
          setIsLoggedIn("false")
       }
     },[isLoggedIn])
  return (
     <Router>
      {isLoggedIn!="" && isLoggedIn!="true" && <LoginForm/> }
      {isLoggedIn!="" && isLoggedIn=="true" && <IndexPage/> }
     </Router>
   
  );
}

export default App;
