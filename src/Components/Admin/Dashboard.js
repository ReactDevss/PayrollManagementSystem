import { Link } from "react-router-dom";

export default function Dashboard()
{
    return (
        <div class="container-fluid px-4">
        <center><h2 class="mt-4">Welcome To Payroll Management System</h2></center>
        <br/>
        <div class="card mb-4">
          <div class="card-header"><center><b>Quick Links</b></center></div>
          <div class="card-body">
          <div className="row">
          <div class="col-xl-4 col-md-6">
            <div class="card bg-primary text-white mb-4">
              <div class="card-body">Manage Employee Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/ManageEmpQuickLinks">Manage Employee Details</Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6">
            <div class="card bg-warning text-white mb-4">
              <div class="card-body">Manage Salary Details</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/SalaryDetailsQuickLinks">
                Manage Salary Details
                </Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6">
            <div class="card bg-danger text-white mb-4">
              <div class="card-body"> Salary Report</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <Link class="small text-white stretched-link" to="/SalaryReport">Report</Link>
                <div class="small text-white">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      
      
        {/* <div class="card mb-4">
          <div class="card-header">
            <center><b>Employee Details</b></center>
          </div>
          <div class="card-body">
          <EmpDetailsTb/>
          </div>
        </div> */}
      </div>
    );
}