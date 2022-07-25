import { Link } from "react-router-dom";
import EmpDetailsTb from "../Admin/EmpDetailsTb";
export default function ManageEmpQuicKLinks()
{
    return(
        <div class="container-fluid px-4">
            <center><h2 class="mt-4">Manage Employee Details</h2></center>
        <br/>
        <div class="card mb-4">
          <div class="card-header"><center><b>Quick Links</b></center></div>
          <div class="card-body">
          <div className="row">
          <div class="col-xl-4 col-md-4">
            <div class="card bg-warning text-white mb-4">
              <div class="card-body">Add Employee Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/AddEmployee">Add Employee Details</Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="card bg-danger text-white mb-4">
              <div class="card-body">Update, Delete Employee Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/EmpDetailsTb">
                Update, Delete Employee Details
                </Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="card bg-success text-white mb-4">
              <div class="card-body">Leave Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/leaveDetails">View, Approve Leave Details</Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>

        <div class="card mb-4">
        <EmpDetailsTb isShowClmn="false"/>
        </div>
    </div>
    )
}