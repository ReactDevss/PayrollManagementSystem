import { Link } from "react-router-dom";
export default function Sidebar()
{
    var userDetails=JSON.parse(localStorage.getItem("userDetails"));
    var userRole=userDetails.userRole;
   
    return(
            <div id="layoutSidenav_nav">
                 <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            {userRole=="admin" &&
                                <Link class="nav-link" to="/Dashboard">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </Link>
                            }
                            {userRole!="admin" &&
                            <>
                                <Link class="nav-link" to="/employeeDashboard">
                                    <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </Link>
                                <Link class="nav-link" to="/applyLeave">
                                    <div class="sb-nav-link-icon"><i class="fas fa-file"></i></div>
                                    Apply For Leave
                                </Link>
                                <Link class="nav-link" to="/leavesDetailsTb">
                                    <div class="sb-nav-link-icon"><i class="fas fa-file"></i></div>
                                    Leave Details
                                </Link>
                                <Link class="nav-link" to="/salarySlip">
                                    <div class="sb-nav-link-icon"><i class="fas fa-file"></i></div>
                                    View Salary Slip
                                </Link>
                            </>
                            }
                            {userRole=="admin" &&
                            <>
                            <div class="sb-sidenav-menu-heading">Admin Actions</div>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseEmployee" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div class="sb-nav-link-icon"><i class="fa fa-edit"></i></div>
                                    Manage Employees
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="collapseEmployee" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/AddEmployee">Add Employee Details</Link>
                                    <Link class="nav-link" to="/EmpDetailsTb">Update, Delete Employee Details</Link>
                                    <Link class="nav-link" to="/leaveDetails">Leave Details</Link>
                                </nav>
                                </div>

                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseClass" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                    Manage Salary Details
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="collapseClass" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <Link class="nav-link" to="/AddUpdateSalaryDetails">Add Salary Details</Link>
                                    <Link class="nav-link" to="/SalaryDetailsTb">Update, Delete Salary Details</Link>
                                </nav>
                                </div>
                            </>}
                          
                        </div>
                    </div>
                </nav>
            </div>
    );
}