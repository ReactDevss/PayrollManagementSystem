import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';

import * as Yup from 'yup'
import axios from 'axios';

function LoginForm() {

    
    const[errorMsg,setErrormsg]=useState("");
    const myValues = {
        userName: '',
        password: ''
    }

    const schema = Yup.object({
        userName: Yup.string().required('User Name is Required'),
        password: Yup.string().required('Password is Required')
    })

    const submitForm = async(values) => {
        const {data} = await axios.post("https://localhost:7115/api/Auth/login", values, {headers: { "Content-Type": 'application/json'}})
       
        if(data.token!="")
        {
          localStorage.setItem("userDetails",JSON.stringify(data))
          window.location.replace("http://localhost:3000/IndexPage");
        }else
        {
            setErrormsg("Invalid Username or Password");
        }
    }
    
       

    return(
        <>
     
        <section id="signin_container">
            <br/>
            <center><p id="title">Payroll Management System</p></center>
            <div className="container-fluid h-custom">
                <div className='container'>
                    <div className="row text-center mb-5">
                        <div className="container mb-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5 mb-5 signin_frm" style={{width:"28rem"}}>
                            <div className="card-header frm-header"><h3 className="text-center my-4 frm-title" style={{textShadow:"1px 2px 3px"}}><b>Sign In</b></h3></div>
                                <div className="card-body">
                                    <Formik
                                     initialValues={myValues}
                                     onSubmit={(values)=>submitForm(values)}
                                     validationSchema={schema}
                                    >
                                    <Form>
                                        <div className="form-floating mb-3">
                                            <Field className="form-control" id="userName"  type="text"  name="userName" placeholder="User Name" />
                                            <label for="className">User Name</label>
                                            <span className="text-danger "><ErrorMessage className="text-danger" name="userName"/></span>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <Field className="form-control" id="password"  type="password"  name="password" placeholder="Password" />
                                            <label for="password">Password</label>
                                            <span className="text-danger "><ErrorMessage className="text-danger" name="password"/></span>
                                        </div>
                                        <div class="mt-4 mb-0">
                                          <span className="text-danger "> {errorMsg}</span>
                                        </div>
                                        
                                        <div className="mt-4 mb-0">
                                            <center>
                                                <button className="btn btn-warning  btn-block" type="submit">Sign In</button>
                                            </center>
                                        </div>
                                        <br/><br/>
                                    </Form>
                                </Formik>
                                    </div>   
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
         </section>
       
        </>
       
    )
}


export default LoginForm