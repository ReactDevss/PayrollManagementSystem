import { Link } from "react-router-dom";
import SalaryDetailsTb from "./SalaryDetailsTb";
export default function SalaryDetailsQuickLinks()
{
  
    return(
        <div class="container-fluid px-4">
         <center><h2 class="mt-4">Manage Salary Details</h2></center>
        <br/>
        <div class="card mb-4">
          <div class="card-header"><center><b>Quick Links</b></center></div>
          <div class="card-body">
          <div className="row">
          <div class="col-xl-6 col-md-6">
            <div class="card bg-warning text-white mb-6">
              <div class="card-body">Add Salary Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/AddUpdateSalaryDetails">Add Salary Details</Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-md-6">
            <div class="card bg-danger text-white mb-6">
              <div class="card-body">Update, Delete Salary Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/SalaryDetailsTb">
                Update, Delete Salary Details
                </Link>
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
        <SalaryDetailsTb isShowClmn="false" />
        </div>
    </div>
    )
}