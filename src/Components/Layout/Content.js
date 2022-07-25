import { Routes, Route } from "react-router-dom";
import Dashboard from "../Admin/Dashboard";
import AddUpdateSalaryDetails from "../Admin/AddUpdateSalaryDetails";
import SalaryDetailsQuickLinks from "../Admin/SalaryDetailsQuickLinks";
import ManageEmpQuicKLinks from "../Admin/ManageEmpQuickLinks";
import SalaryDetailsTb from "../Admin/SalaryDetailsTb";
import AddEmployee from "../Admin/AddEmployee";
import EmpDetailsTb from "../Admin/EmpDetailsTb";
import LeavesDetail from "../Admin/LeaveDetail";
import SalaryReport from "../Admin/SalaryReport";
import LoginForm from "../Common/LoginForm";
import ApplyLeave from "../Employee/ApplyLeave";
import LeavesDetailsTb from "../Employee/LeavesDetailsTb";
import EmployeeDashboard from "../Employee/EmployeeDashboard";

import Logout from "./Logout";
import SalarySlip from "../Employee/SalarySlip";

export default function Content()
{  
    var userDetails=JSON.parse(localStorage.getItem("userDetails"));
    var userRole=userDetails.userRole;
    var userId=userDetails.userId;
    var userName=userDetails.employeeName;

    return(
        <div id="layoutSidenav_content">
        <main>
            
            <Routes>
            {userRole=="admin" &&
            <>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/IndexPage" element={<Dashboard/>} />
            <Route path="/Dashboard" element={<Dashboard />} />
            </>
            }
            {userRole=="user" &&
            <>
             <Route path="/employeeDashboard" element={<EmployeeDashboard/>} />
            <Route path="/IndexPage" element={<EmployeeDashboard/>} />
            <Route path="/Dashboard" element={<EmployeeDashboard />} />
            </>
            }
            <Route path="/AddUpdateSalaryDetails/:salaryId" element={<AddUpdateSalaryDetails />} />
            <Route path="/AddUpdateSalaryDetails/" element={<AddUpdateSalaryDetails />} />
            <Route path="/SalaryDetailsQuickLinks" element={<SalaryDetailsQuickLinks />} />
            <Route path="/ManageEmpQuickLinks" element={<ManageEmpQuicKLinks />} />
            <Route path="/ManageEmpQuickLinks/:msg" element={<ManageEmpQuicKLinks />} />
            <Route path="/SalaryDetailsTb" element={<SalaryDetailsTb/>} />
            <Route path="/AddEmployee" element={<AddEmployee/>} />
            <Route path="/AddEmployee/:empId" element={<AddEmployee/>} />
            <Route path="/EmpDetailsTb" element={<EmpDetailsTb/>} />
            <Route path="/SalaryReport" element={<SalaryReport/>}/>
            <Route path="/LoginForm" element={<LoginForm/>} />
            <Route path="/Logout" element={<Logout/>} />
            <Route path="/applyLeave" element={<ApplyLeave userName={userName} userId={userId}/>} />
            <Route path="/leavesDetailsTb" element={<LeavesDetailsTb userId={userId}/>}/>
            <Route path="/leaveDetails" element={<LeavesDetail/>} />
            <Route path="/salarySlip" element={<SalarySlip userId={userId}/>} />
            <Route/>
            </Routes>
        </main>
        </div>
    )
} 