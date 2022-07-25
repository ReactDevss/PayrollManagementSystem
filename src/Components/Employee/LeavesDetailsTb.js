import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom"
import moment from "moment";
export default function LeavesDetailsTb(props)
{
    
    const[leavesDetails, setLeavesDetails]=useState([]);
    const[search, setSearch]=useState("");
    const[filteredData, setFilteredData]=useState([]);
    const[flg, setFlg]=useState("");
   
    let navigate= useNavigate();
    
    
    const getLeavesDetails = async() => {
        const {data} = await axios.get("https://localhost:7115/api/LeaveDetails/GetLeaveDetailsbyUserId/"+props.userId);
        setLeavesDetails(data);   
        setFilteredData(data);
        if(leavesDetails.length==0)
        {
          setFlg("false")
        }
    };

   


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
          grow:3
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