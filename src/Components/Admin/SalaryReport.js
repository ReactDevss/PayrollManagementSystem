import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';



export default  function SalaryReport (){

  const[empDetails, setEmpDetails]=useState([]);
  const[search, setSearch]=useState("");
  const[filteredData, setFilteredData]=useState([]);


  const getEmpData = async() => {
    const {data} = await axios.get("https://localhost:7115/api/SalaryReport/GetSalaryReport");
    setEmpDetails(data);   
    setFilteredData(data);
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
            name: 'Salary',
            selector: row => row.salary,
            sortable: true,
          },
          {
            name: 'Basic Pay',
            selector: row => row.basicPay,
            sortable: true,
            
          },
          {
            name: 'DA',
            selector: row => row.dailyAllowance,
            sortable: true,
            
          },
          {
            name: 'MA',
            selector: row => row.medicalAllowance,
            sortable: true,
            
          },
          {
            name: 'TA',
            selector: row => row.travellingAllowance,
            sortable: true,
            
          },
          {
            name: 'Total Salary',
            selector: row => parseInt(row.salary)+parseInt(row.basicPay)+parseInt(row.dailyAllowance)+
                             parseInt(row.medicalAllowance)+parseInt(row.travellingAllowance),
            sortable: true,
            
          }
        ];
          
 return(
        
    <>
      <>
        <div class="container-fluid px-4">
        <center><h2 class="mt-4">Report</h2></center>
        <div class="card mb-4">
       <div class="card-header">
         <center><b>Salary Deatails Report</b></center>
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
           
        />:<center><p className="text-danger">No Any Salary Details Found....</p></center>}
        </div>
        </div>
        </div>
      </>
    </>

    );
};

