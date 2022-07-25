import { Formik, Form, Field, ErrorMessage } from "formik"
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
export default function ApplyLeave(props) {
    var navigate=useNavigate();
    const[fromDate,setFromDate]=useState("");
    const[toDate,setToDate]=useState("");
  
    let curnt_year =  new Date().getFullYear();
    const[leaveData, setLeaveData]=useState([]);
    var curr_date=moment(moment().format('L')).format("yyyy-MM-DD");
   
     //To Calculate No Of days
     var fromdate=moment(fromDate).format("DD.MM.YYYY");
     var todate=moment(toDate).format("DD.MM.YYYY");
     fromdate=moment(fromdate,"DD.MM.YYYY")
     todate=moment(todate,"DD.MM.YYYY")
     var noOfDays=todate.diff(fromdate, 'days')
    
    var myValues = {
        fromDate:"",
        toDate:"",
        reason:"",
        leaveType:"",
        days:"",
        year:""
    }
    let schema = yup.object().shape({
        reason: yup.string()
                .required("Required *"),
                    
        leaveType: yup.string()
                .required("Required *")
            
       
    });
    const submitForm=(values, resetForm)=>
    { 
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to apply for leave",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async(result) => {
            if(result['isConfirmed'])
            {
                
            try {
                const { response } = await axios.post("https://localhost:7115/api/LeaveDetails/PostLeaveDetails", values, { headers: { "Content-Type": 'application/json' } })
                console.log(response)
                if (response != "") {
                    displayConfirm();
                }
            } catch (error) {
                console.log(error)
            }
            }
        })
        
    }
    const displayConfirm = () => {
        Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: "You are successfully applied for leave"

        }).then((result) => {
            if (result['isConfirmed']) {
                    navigate("/leavesDetailsTb");
            }
        })
    }
    useEffect(()=>
    {
       getLeaveTypeData()
    },[])
     const getLeaveTypeData = async() => {
           const {data} = await axios.get("https://localhost:7115/api/LeavesMasters/GetLeavesMasters");
           setLeaveData(data);
    }

   

   
    return (
        <>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header frm-header"><h3 class="text-center my-4 frm-title"><b>Apply For Leave</b></h3></div>
                            <div class="card-body">
                                <Formik
                                    initialValues={myValues}
                                    onSubmit={(values, { resetForm }) => submitForm(values, resetForm)}
                                    validationSchema={schema}
                                >
                                   {({setFieldValue, values}) => ( 
                                        

                                        <Form>
                                         
                                            <div class="form-floating mb-3">
                                                <Field class="form-control" id="userId" type="hidden" name="userId"  value={values.userId=props.userId}/>
                                            </div>

                                            <div class="form-floating mb-3">
                                                <Field class="form-control" id="userId" type="text" name="empName"  disabled value={props.userName}/>
                                                <label for="designation"> Name</label>
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="fromDate" type="date" name="fromDate" min={curr_date}
                                                        onChange={(event)=>{
                                                            setFieldValue("fromDate",event.target.value)
                                                            setFromDate(event.target.value)
                                                            if(event.target.value>values.toDate)
                                                            setFieldValue("toDate","")
                                                        }
                                                        } placeholder="" />
                                                        <label for="fromDate">From Date</label>
                                                        <span className="text-danger"><ErrorMessage className="text-danger"  name="fromDate" /></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="toDate" type="date" name="toDate" 
                                                        min={values.fromDate}
                                                        
                                                        onChange={(event)=>{
                                                            setFieldValue("toDate",event.target.value)
                                                            setToDate(event.target.value)
                                                        }
                                                        } 
                                                        placeholder=""/>
                                                        <label for="toDate">To Date</label>
                                                        <span className="text-danger"><ErrorMessage className="text-danger" name="toDate" /></span>
                                                    </div>
                                                </div>
                                            </div>

                                            {values.fromDate &&  values.toDate && values.fromDate<=values.toDate &&
                                            <>
                                            <div class="form-floating mb-3">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <Field class="form-control" id="days" type="text" name="days" disabled placeholder="No of days" 
                                                    value={values.days=noOfDays}/>
                                                    <label for="days">No of days</label>
                                                </div>
                                            </div>
                                            

                                            <div class="form-floating mb-3">
                                            <Field class="form-control" id="reason" type="textarea" name="reason" placeholder="Enter Reason" />
                                                <label for="reason">Leave Reason</label>
                                                <span className="text-danger"><ErrorMessage className="text-danger" name="reason" /></span>
                                            </div>

                                            <div class="form-floating mb-3">
                                                <Field   id="leaveType" as="select" name="leaveType">
                                                <option value="">Select Leave Type</option>
                                                {
                                                    leaveData.map((data)=>
                                                    (
                                                        <option value={data.id}>{data.leaveType}</option>
                                                    ))
                                                }
                                                </Field>
                                                <span className="text-danger"><ErrorMessage className="text-danger" name="leaveType" /></span>
                                            </div>
                                             
                                            <div class="row mb-3">
                                            
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="year" type="hidden" name="year" value={values.year=curnt_year} placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div class="mt-4 mb-0">
                                                <center>
                                                    <button class="btn btn-warning  btn-block" type="submit">Apply Leave</button>
                                                </center>
                                            </div>
                                            </>
                                        }
                                        </Form>
                                   )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}