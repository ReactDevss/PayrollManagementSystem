import { useNavigate } from "react-router-dom";
export default function Logout()
{
    var navigate =useNavigate();
    var userDetails=localStorage.removeItem("userDetails");
    window.location.replace("http://localhost:3000/LoginForm");

}