import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export default  function EmpDetailsTb (props){

  const[empDetails, setEmpDetails]=useState([]);
  const[search, setSearch]=useState("");
  const[filteredData, setFilteredData]=useState([]);
  const navigate=useNavigate();

  const getEmpData = async() => {
    const {data} = await axios.get("https://localhost:7115/api/Employees/GetEmployees");
    setEmpDetails(data);   
    setFilteredData(data);
  }
  const loadEditEmp=(empId)=>
  {
    navigate("/AddEmployee/"+empId);
  }
  const confirmDelete=async(empId)=>
  {

    Swal.fire({  
      title: 'Are you sure?',  
      text: 'You want to delete class details',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonColor: '#3085d6',  
      cancelButtonColor: '#d33',  
      confirmButtonText: 'Yes!'  
    }).then((result) => {
        if (result['isConfirmed']){
          deleteEmp(empId)
        }
    });
  }
  const deleteEmp=async(empId)=>
  {
    const {status} = await axios.delete("https://localhost:7115/api/Employees/DeleteEmployee/"+empId);
    if(status==204)
     {
        Swal.fire({  
        title: 'Success',  
        icon: 'success',
        text: 'Employee Details has been deleted.'
        });  
     }
     getEmpData();
  }
  useEffect(()=>
    { 
      getEmpData();
    },[])
    useEffect(()=>
    { 
      const res=empDetails.filter((empDetails)=>
      {
        return empDetails.empName.toLowerCase().match(search.toLowerCase());
       
      })
        setFilteredData(res)
    },[search])
  var columns = 
        [
          {
            name: 'Employee Name',
            selector: row => row.empName,
            sortable: true,
            grow: 3,
          },
          {
            name: 'Email Address',
            selector: row => row.emailAddress,
            sortable: true,
          },
          {
            name: 'Mobile Number',
            selector: row => row.mobile,
            sortable: true,
            
          },
          {
            name: 'Date Of Joining',
            selector: row => row.doj,
            sortable: true,
            
          }
        ];
          columns =props.isShowClmn!=="false"?[...columns,{
          name:"Action",
          grow: 2,
          cell: (row) => 
        
          <div className="row">
          <div className="col-md-4">
          <button type="button" id={row.empId}  className="btn btn-primary" onClick={()=>loadEditEmp(row.empId)}>Edit</button>
          </div>
          <div className="col-md-2">
          <button type="button" id={row.empId}   className="btn btn-danger" onClick={()=>confirmDelete(row.empId)}>Delete</button>
          </div>
          </div> 
        }]:columns;
 return(
        
    <>
      <>
        <div class="container-fluid px-4">
        <center><h2 class="mt-4">{props.isShowClmn!="false"?"Employee Details":""}</h2></center>
        {props.isShowClmn!="false"?<br/>:""}
        <div class="card mb-4">
       <div class="card-header">
         <center><b>{props.isShowClmn!="false"?"Update, Delete Employee Details":"Employee Details"}</b></center>
       </div>
       <div class="card-body">
    
     {empDetails.length !=0 ?
       
      <DataTable
            data={filteredData}
            columns={columns}
            striped
            pagination
            subHeader
            pagination
            subHeaderComponent={
              <>
              <b>Search Text</b>&nbsp;
              <input type="text" name="serach" placeholder="Search" 
              onChange={(e)=>setSearch(e.target.value)} value={search}/>
              </>
            }
            subHeaderAlign="left"
           
        />:<center><p className="text-danger">No Any Employee Details Found....</p></center>}
        </div>
        </div>
        </div>
      </>
    </>

    );
};

