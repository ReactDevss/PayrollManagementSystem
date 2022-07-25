import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
export default function LeavesDetail()
{
    
    const[leavesDetails, setLeavesDetails]=useState([]);
    const[search, setSearch]=useState("");
    const[filteredData, setFilteredData]=useState([]);
    const[flg, setFlg]=useState("");
   
    let navigate= useNavigate();
    
    
    const getLeavesDetails = async() => {
        const {data} = await axios.get("https://localhost:7115/api/LeaveDetails/GetLeaveDetails/");
        setLeavesDetails(data);   
        setFilteredData(data);
        if(leavesDetails.length==0)
        {
          setFlg("false")
        }
    };

    const updateLeaveConfirm=(id,status)=>
    {
        var confirmText=status==1?"You want to approve leave":"You want to Reject leave";
        Swal.fire({
            title: 'Are you sure?',
            text: confirmText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result['isConfirmed']) {
              updateLeaveStatus(id,status)
            }
        })
       
    }

    const updateLeaveStatus=async(id,status)=>
    {
        const {data} = await axios.get("https://localhost:7115/api/LeaveDetails/GetLeaveDetails/"+id);
        data.approved=status;
        const { response } = await axios.put("https://localhost:7115/api/LeaveDetails/PutLeaveDetails/" + id, data, { headers: { "Content-Type": 'application/json' } })
        if (response != "") {
            Swal.fire({
                title: 'Success',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: "Leave Status Update Successfully"
    
            }).then((result) => {
                if (result['isConfirmed']) {
                    getLeavesDetails();
                }
            })
        }
        
    }

      var columns = 
      [
        {
          name: 'From Date',
          selector: row =>moment(row.fromDate).format("MMMM Do YYYY"),
          sortable: true,
          grow: 1,
        },
        {
          name: 'To Date',
          selector: row => moment(row.toDate).format("MMMM Do YYYY"),
          sortable: true,
          grow:1,
        },
        {
          name: 'Leave Reason',
          selector: row => row.reason,
          sortable: true,
          
        },
        {
          name: 'No of Days Leave Taken',
          selector: row => row.days,
          sortable: true,
          
        },
        {
            name: 'Leave Status',
            cell: (row) =><b> <p class={row.approved=="0"?"text-warning": row.approved=="1" ?"text-success":"text-danger"}>{row.approved=="0"?"Pending": row.approved=="1" ?"Approved":"Rejected"}</p></b>,
            sortable: true,
            
        },
        {
            name:"Approve/Reject Leave",
            grow: 2,
            cell: (row) => 
            
            <div className="row">
            {row.approved=="0" &&
            <>
            <div className="col-md-6">
            <button type="button" id={row.id}  className="btn btn-primary" onClick={()=>updateLeaveConfirm(row.id,1)}>Approve </button>
            </div>
            <div className="col-md-4">
            <button type="button" id={row.id}   className="btn btn-danger" onClick={()=>(updateLeaveConfirm(row.id,2))}>Reject  </button>
            </div>
            </>
            }
            {row.approved!="0" &&
            <b><p class={row.approved=="1"?"text-success":"text-danger"}>{row.approved=="1"?"Approved":"Rejected"}</p></b>
            }
            </div> 
          }
        
       ];
      
    

    useEffect(()=>
    { 
        getLeavesDetails();
    },[])
    
    useEffect(()=>
    { 
      const res=leavesDetails.filter((leavesDetails)=>
      {
        return leavesDetails.reason.toLowerCase().match(search.toLowerCase());
       
      })
        setFilteredData(res)
    },[search])

    return(
      <>
        <div class="container-fluid px-4">
        <center><h2 class="mt-4">Leaves Details</h2></center>
        <br/>
        <div class="card mb-4">
       <div class="card-header">
         <center><b>Leaves Details</b></center>
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
        <center><p className="text-danger">No Any Leaves Details Found....</p></center>}
        </div>
        </div>
        </div>
      </>
    )
}