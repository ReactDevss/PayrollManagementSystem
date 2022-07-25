import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function AddEmployee()
{
    const[empDetails,setEmpDetails]=useState({});
    const[salaryData, setSalaryData]=useState([]);
    const[salaryDetails, setSalaryDetails]=useState([]);
    const[flg,setFlg]=useState("true");
    const[errorMsg,seterrorMsg]=useState("")

    const  {empId}  = useParams();
    

    var formTitle=empId?"Update Employee Details":"Add Employee Details";
    var btnTiltle=empId?"Update Employee":"Add Employee";
    var confirmBoxText=empId?"You want to update employee details":"You want to add employee details";
    var successBoxText=empId?"Employee Details has been updated.":"Employee Details has been saved.";

    var navigate=useNavigate();

    const phoneRegExp = /^[0-9\b]+$/;
    const  empNmRegExp= /^[a-zA-Z ]*$/;

   
    //To fetch employee details
    const fetchEmployeeDetails=async()=>
    {
        const {data} = await axios.get("https://localhost:7115/api/Employees/GetEmployee/"+empId);
        setEmpDetails(data);  
        fetchSalaryDetails(empDetails.classId)
    }

    const displayConfirm=()=>
    {
        Swal.fire({  
            title: 'Success',  
            icon: 'success',
            confirmButtonColor: '#3085d6',   
            confirmButtonText: successBoxText 
            
        }).then((result) => {
            if (result['isConfirmed']){
            if(empId)
            {
                navigate("/EmpDetailsTb");
            }else
            {
                navigate("/ManageEmpQuickLinks");
            }    
            }
        })
    }
    
    
    
    
    var myValues={
        empName: empDetails.empName,
        mobile: empDetails.mobile,
        emailAddress: empDetails.emailAddress,
        address: empDetails.address,
        accountNo:empDetails.accountNo,
        dob: empId?moment(moment(empDetails.dob).format('L')).format("yyyy-MM-DD"):"",
        doj: empId?moment(moment(empDetails.doj).format('L')).format("yyyy-MM-DD"):"",
        classId:empId && flg=="true"?empDetails.classId:"",
        userName: empDetails.userName,
        password: empDetails.password,
        confPassword:empDetails.password
        }
        var curr_date=moment(moment().format('L')).format("yyyy-MM-DD");
        var hide_date=moment(moment().subtract(16, 'years').calendar()).format("yyyy-MM-DD");
        
       
        let schema = yup.object().shape({
            empName         :    yup.string()
                                .matches(empNmRegExp, 'Must enters alphabets only')
                                .required("Employee Name is Required *"),
            mobile          :    yup.string()
                                .required("Mobile number is Required *")
                                .matches(phoneRegExp, 'Must enters digits only')
                                .min(10,"Must contains 10 digits")
                                .max(10,"Must contains 10 digits"),
            emailAddress    :    yup.string()
                                .email("Invalid email format")
                                .required("Email is Required *"),
            accountNo        :   yup.string()
                                .required("Account Number isRequired *")
                                .matches(phoneRegExp, 'Must enters digits only')
                                .min(9,"Must contains 9 digits")
                                .max(11,"Must contains 11 digits"),
            address         :    yup.string()
                                .required("Address is Required *"),
            dob             :    yup.string()
                                .required("Date of birth is Required *"),             
            doj             :    yup.string()
                                .required("Date of joining is Required *"),
            classId         :    yup.string()
                                .required("Designation is Required *"),
            userName         :   yup.string()
                                .required("Username is Required *"),
            password         :   yup.string()
                                .required("Password is Required *"),
            confPassword      :  yup.string()
                                .required("Confirm password isRequired *")
                                .oneOf([yup.ref("password"),''],"Confirm password must be match")

                                
          });

    //To fetch Classes in select class dropdown
    const getSalaryData = async() => {
        const {data} = await axios.get("https://localhost:7115/api/SalaryDetails/GetSalaryDetails");
        setSalaryData(data);
    }

     //To fetch selected class details
     const fetchSalaryDetails=async(salaryId)=>
     {
         const {data} = await axios.get("https://localhost:7115/api/SalaryDetails/GetSalaryDetails/"+salaryId);
         setSalaryDetails(data);
     }
    
    useEffect(()=>{
        if(empId)
        {
            fetchEmployeeDetails();
           
        }
        getSalaryData();
    },[])
    useEffect(()=>{
        if(empId)
        {
         fetchSalaryDetails(empDetails.classId)
        }
    },[empDetails])      
    
    const AddEmployee=async(values)=>
    {
        try 
        {
            //values.classId=selectedValue;
            
            console.log(values);
            const {response} = await axios.post("https://localhost:7115/api/Employees/AddEmployee", values, {headers: { "Content-Type": 'application/json'}})
            console.log(response)
            if(response!="")
            {
                displayConfirm();   
            }
        }catch(error) 
        {
          console.log(error)
        }
    }

    //To call update emp details api
    const updateEmpDetails = async(values) => {
        
        try 
        {

            var formdata={...values,empId:empId}
           
            const {response} = await axios.put("https://localhost:7115/api/Employees/UpdateEmployee/"+empId, formdata, {headers: { "Content-Type": 'application/json'}})
            console.log(response)
            if(response!="")
            {
                displayConfirm();  
            }
        }catch(error) 
        {
          console.log(error)
        }
    }
    
    const submitForm=(values)=>
    {
        Swal.fire({  
            title: 'Are you sure?',  
            text: 'To add employee details',  
            icon: 'warning',  
            showCancelButton: true,  
            confirmButtonColor: '#3085d6',  
            cancelButtonColor: '#d33',  
            confirmButtonText: 'Yes!'  
        }).then((result) => {
              if (result['isConfirmed']){
                if(empId)
                {
                    updateEmpDetails (values)   
                   
                }else
                {
                    AddEmployee(values)
                }
               
            }
        })
    }

    async  function isalreadyExist(uname,setFieldValue)
    {
        const {data} = await axios.get("https://localhost:7115/api/Employees/GetEmployeeByName/"+uname);
       
       if(data==0)
       { 
        setFieldValue("userName",uname);
        seterrorMsg("");
       }else{
        setFieldValue("userName","");
        seterrorMsg("User name already exist..");
       }
    }
    
    return(
        
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header frm-header"><h3 class="text-center my-4 frm-title"><b>{formTitle}</b></h3></div>
                        <div class="card-body">
                           {empId && myValues.empName || !empId ?
                           <>
                           
                            <Formik
                                  initialValues={myValues}
                                  onSubmit={(values)=>submitForm(values)}
                                  validationSchema={schema}
                            >
                                
                            {({ setFieldValue, values ,errors}) => ( 
                                <>
                              
                                
                            <Form>
                                <div class="form-floating mb-3">
                                    <Field class="form-control" id="empName"  type="text"  name="empName" placeholder="Employee Name" />
                                    <label for="empName">Employee name</label>
                                    <span className="text-danger"><ErrorMessage className="text-danger" name="empName"/></span>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <div class="form-floating mb-3 mb-md-0">
                                            <Field class="form-control" id="mobile" type="text"  name="mobile" placeholder="Mobile Number" />
                                            <label for="mobile">Mobile</label>
                                            <span className="text-danger"><ErrorMessage className="text-danger" name="mobile"/></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating mb-3 mb-md-0">
                                            <Field class="form-control" id="emailAddress" type="email" name="emailAddress" placeholder="Email Address" />
                                            <label for="emailAddress">Email Address</label>
                                            <span className="text-danger"><ErrorMessage className="text-danger" name="emailAddress"/></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-floating mb-3">
                                    <Field class="form-control" id="accountNo"  type="text"  name="accountNo" placeholder="Account Number" />
                                    <label for="accountNo">Account Number</label>
                                    <span className="text-danger"><ErrorMessage className="text-danger" name="accountNo"/></span>
                                </div>
                                <div class="form-floating mb-3">
                                    <Field class="form-control" id="address"  component="textarea" rows={85}  name="address" placeholder="Address" />
                                    <label for="address">Address</label>
                                    <span className="text-danger"><ErrorMessage className="text-danger" name="address"/></span>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <div class="form-floating mb-3 mb-md-0">
                                            <Field class="form-control" id="dob" type="date" name="dob"  max={hide_date} placeholder="" />
                                            <label for="dob">Date Of Birth</label>
                                            <span className="text-danger"><ErrorMessage className="text-danger" name="dob" /></span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating mb-3 mb-md-0">
                                            <Field class="form-control" id="doj" type="date"  name="doj" min={curr_date} placeholder="" />
                                            <label for="doj">Date of Joining</label>
                                            <span className="text-danger"><ErrorMessage className="text-danger" name="doj"/></span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-floating mb-3">
                                    <Field class="form-control" id="userName" type="text" name="userName"
                                     disabled={!empId?false:true}
                                    onBlur={(event)=>{
                                        
                                         isalreadyExist(event.target.value,setFieldValue);
                                    }
                                    }
                                     placeholder="User Name" />
                                    <label for="userName">User Name</label>
                                    <span className="text-danger"> {errorMsg=="" && <ErrorMessage class="text-danger" name="userName" />}{errorMsg && errorMsg}</span>
                                </div>
                                {!empId?
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <div class="form-floating mb-3 mb-md-0">
                                            <Field class="form-control" id="password" type="password" name="password" placeholder="Password" />
                                            <label for="password">Password</label>
                                            <span className="text-danger"> <ErrorMessage class="text-danger" name="password" /></span>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-floating mb-3 mb-md-0">
                                            <Field class="form-control" id="confPassword" type="password" name="confPassword" placeholder="Confirm Password" />
                                            <label for="confPassword">Confirm Password</label>
                                            <span className="text-danger"> <ErrorMessage class="text-danger" name="confPassword" /></span>
                                        </div>
                                    </div>     
                                </div>:""}
                                <div class="form-floating mb-3">
                                    <Field  id="classId" as="select" name="classId"   
                                    
                                     onChange={(event)=>
                                     {
                                         fetchSalaryDetails(event.target.value)
                                         setFlg("false");
                                         setFieldValue("classId",event.target.value);
                                     }}>
                                        <option value=" ">Select Class</option>
                                        {
                                            salaryData.map((data)=>(
      
                                                <option key={data.id} value={data.id}>{data.designation}</option>)
                                        )} 
                                    </Field>
                                    <span className="text-danger"> <ErrorMessage class="text-danger" name="classId" /></span>
                                </div>
                                {salaryDetails.salary && 
                                <>
                                <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <Field class="form-control" id="basicPay" type="text"  name="basicPay"  value={salaryDetails.basicPay?salaryDetails.basicPay:""} disabled placeholder="Basic Pay" />
                                                    <label for="basicPay">Basic Pay</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <Field class="form-control" id="salary" type="text"  value={salaryDetails.salary?salaryDetails.salary:""} disabled placeholder="Salary" />
                                                    <label for="salary">Salary</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <Field class="form-control" id="travelAllowance" type="text"  value={salaryDetails.travelAllowance?salaryDetails.travelAllowance:""} disabled placeholder="Travel Allowance" />
                                                    <label for="travelAllowance">Travel Allowance</label> 
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <Field class="form-control" id="medicalAllowance" type="text"  value={salaryDetails.medicalAllowance?salaryDetails.medicalAllowance:""} disabled placeholder="Medical Allowance" />
                                                    <label for="medicalAllowance">Medical Allowance</label>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-md-6">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <Field class="form-control" id="dailyAllowance" type="text"  value={salaryDetails.dailyAllowance?salaryDetails.dailyAllowance:""} disabled placeholder="Washing Allowance" />
                                                    <label for="dailyAllowance">Daily Allowance</label>
                                                </div>
                                            </div> 
                                            
                                            <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="totalSalary" type="text" name="totalSalary" disabled 
                                                         value={parseInt(salaryDetails.salary)+parseInt(salaryDetails.basicPay)+parseInt(salaryDetails.dailyAllowance)+parseInt(salaryDetails.medicalAllowance)+parseInt(salaryDetails.travelAllowance)}
                                                         placeholder="Total Salary" />
                                                        <label for="totalSalary">Total Salary</label>
                                                    </div>
                                                </div> 
                                         </div>
                                    </>
                                    }

                                <div class="mt-4 mb-0">
                                    <center>
                                        <button class="btn btn-warning  btn-block" type="submit">{btnTiltle}</button>
                                    </center>
                                </div>
                            </Form>
                            </>
                            )}
                        </Formik></>:""}
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
    );
}