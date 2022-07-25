import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

export default function SalaryDetailsTb(props)
{
    
    const[salaryDetails, setsalaryDetails]=useState([]);
    const[search, setSearch]=useState("");
    const[filteredData, setFilteredData]=useState([]);
    const[flg, setFlg]=useState("");
   
    let navigate= useNavigate();
    
    const editSalary=(salaryId)=>
    {
      var route="/AddUpdateSalaryDetails/"+salaryId;
      navigate(route);
    }
    const getSalaryDetails = async() => {
        const {data} = await axios.get("https://localhost:7115/api/SalaryDetails/GetSalaryDetails/");
        setsalaryDetails(data);   
        setFilteredData(data);
        if(salaryDetails.length==0)
        {
          setFlg("false")
        }
    };

    const deleteClass=async(salaryId)=>{
      const {status} = await axios.delete("https://localhost:7115/api/SalaryDetails/DeleteSalaryDetails/"+salaryId);
       if(status==204)
        {
          Swal.fire({  
            title: 'Success',  
            icon: 'success',
            text: 'Salary Details has been deleted.'
          });  
        }
      getSalaryDetails(); 
    }

    const confirmDelete=(salaryId)=>
    {
      Swal.fire({  
        title: 'Are you sure?',  
        text: 'You want to delete salary details',  
        icon: 'warning',  
        showCancelButton: true,  
        confirmButtonColor: '#3085d6',  
        cancelButtonColor: '#d33',  
        confirmButtonText: 'Yes!'  
      }).then((result) => {
          if (result['isConfirmed']){
            deleteClass(salaryId)
          }
      })
    }

      var columns = 
      [
        {
          name: 'Designation',
          selector: row => row.designation,
          sortable: true,
          grow: 1,
        },
        {
          name: 'Basic Pay',
          selector: row => row.basicPay,
          sortable: true,
        },
        {
          name: 'Salary',
          selector: row => row.salary,
          sortable: true,
          
        },
        {
          name: 'Daily Allowance',
          selector: row => row.dailyAllowance,
          sortable: true,
          
        },
        {
          name: 'Medical Allowance',
          selector: row => row.medicalAllowance,
          sortable: true,
          
        },
        {
          name: 'Travelling Allowance',
          selector: row => row.travelAllowance,
          sortable: true,
          
        }
       ];
        columns =props.isShowClmn!="false"?[...columns,{
        name:"Action",
        grow: 2,
        cell: (row) => 
        <div className="row">
        <div className="col-md-4">
        <button type="button" id={row.id}  className="btn btn-primary" onClick={()=>editSalary(row.id)}>Edit</button>
        </div>
        <div className="col-md-2">
        <button type="button" id={row.id}   className="btn btn-danger" onClick={()=>(confirmDelete(row.id))}>Delete</button>
        </div>
        </div> 
      }]:columns;
    

    useEffect(()=>
    { 
      getSalaryDetails();
     
    },[])
    
    useEffect(()=>
    { 
      const res=salaryDetails.filter((salaryDetails)=>
      {
        return salaryDetails.designation.toLowerCase().match(search.toLowerCase());
       
      })
        setFilteredData(res)
    },[search])

    return(
      <>
        <div class="container-fluid px-4">
        <center><h2 class="mt-4">{props.isShowClmn!="false"?"Salary Details":""}</h2></center>
        {props.isShowClmn!="false"?<br/>:""}
        <div class="card mb-4">
       <div class="card-header">
         <center><b>{props.isShowClmn!="false"?"Update, Delete Salary Details":"Salary Details"}</b></center>
       </div>
       <div class="card-body">
    
     {flg!=""  && flg=="false"  &&
       
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
           
        />}
        {flg!=""  && flg!="false" &&
        <center><p className="text-danger">No Any Salary Details Found....</p></center>}
        </div>
        </div>
        </div>
      </>
    )
}