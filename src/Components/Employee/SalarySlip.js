import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf"
export default function SalarySlip(props) {
    const [empDetails, setEmpDetails] = useState({});
    const [salaryDetails, setSalaryDetails] = useState([]);
    const[accountNo,setAccountNo]=useState("");
    let curnt_year =  new Date().getFullYear();
    let curnt_month =new Date();
    //To fetch employee details
    const fetchEmployeeDetails = async () => {
        const { data } = await axios.get("https://localhost:7115/api/Employees/GetEmployee/" + props.userId);
        setEmpDetails(data);
        setAccountNo(empDetails.accountNo)
        fetchSalaryDetails(empDetails.classId)
    }

    //To fetch selected class details
    const fetchSalaryDetails = async (salaryId) => {
        const { data } = await axios.get("https://localhost:7115/api/SalaryDetails/GetSalaryDetails/" + salaryId);
        setSalaryDetails(data);
    }

    useEffect(() => {
        fetchEmployeeDetails()
    }, [empDetails])

    const downLoadPdf=()=>
    {
        const input = document.getElementById("salary-slip");
        const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        
        pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
          pdf.save("salaryslip.pdf");
        })
    }
    return (
        <>
    {empDetails.length!=0 && salaryDetails.length!=0 &&
        <div class="container-fluid px-4">
            <center><h2 class="mt-4">Salary Slip</h2></center>
            <button onClick={()=>{downLoadPdf() }} className="btn btn-primary" style={{marginBottom:5}}> Download Payslip</button>
            <div class="card mb-4">
                <div class="card-header" >
                    <center><b>Salary Slip</b></center>
                </div>
                <div class="card-body" id="salary-slip">
                    <div class="container mt-5 mb-5">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="text-center lh-1 mb-2">

                                    <h6 class="fw-bold">Payslip</h6> <span class="fw-normal">Payment slip for the month of {curnt_month.toLocaleString('default', { month: 'long' })},{curnt_year}</span>
                                </div>
                               
                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div> <span class="fw-bolder">EMP Code</span> <small class="ms-3">{empDetails.empId}</small> </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div> <span class="fw-bolder">EMP Name</span> <small class="ms-3">{empDetails.empName}</small> </div>
                                            </div>
                                        </div>
                                       
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div> <span class="fw-bolder">Designation</span> <small class="ms-3">{salaryDetails.designation}</small> </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div> <span class="fw-bolder">Ac No.</span> <small class="ms-3">{accountNo.length==9?"*****":"*******"}{accountNo.substr(-4, 4)}</small> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <table class="mt-4 table table-bordered">
                                        <thead class="bg-dark text-white">
                                            <tr>
                                                <th scope="col">Earnings</th>
                                                <th scope="col">Amount</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Salary</th>
                                                <td>{salaryDetails.salary}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Basic Pay</th>
                                                <td>{salaryDetails.basicPay}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">DA</th>
                                                <td>{salaryDetails.dailyAllowance}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">MA</th>
                                                <td>{salaryDetails.medicalAllowance}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">TA</th>
                                                <td>{salaryDetails.travelAllowance}</td>
                                            </tr>
                                            <tr class="border-top">
                                                <th scope="row">Total Earning</th>
                                                <td>{parseInt(salaryDetails.salary)+parseInt(salaryDetails.basicPay)+parseInt(salaryDetails.dailyAllowance)+parseInt(salaryDetails.medicalAllowance)+parseInt(salaryDetails.travelAllowance)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="col-md-4"> <br /> <span class="fw-bold">Net Pay : </span> {parseInt(salaryDetails.salary)+parseInt(salaryDetails.basicPay)+parseInt(salaryDetails.dailyAllowance)+parseInt(salaryDetails.medicalAllowance)+parseInt(salaryDetails.travelAllowance)}</div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <div class="d-flex flex-column mt-2">  <span class="mt-4"><b>Authorised Signatory</b></span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}</>)
}