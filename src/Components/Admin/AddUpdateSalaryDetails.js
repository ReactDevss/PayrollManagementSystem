import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function AddUpdateSalaryDetails() {
    let navigate = useNavigate();

    //To fetch salaryId passed through url
    const { salaryId } = useParams();

    const [salaryDetails, setSalaryDetails] = useState({});
    const  isalphabets= /^[a-zA-Z ]*$/;

    var formTitle = salaryId ? "Update Salary Details" : "Add Salary Details";
    var btnTiltle = salaryId ? "Update Salary " : "Add Salary ";
    var confirmBoxText = salaryId ? "You want to Update salary details" : "You want to add salary details";
    var successBoxText = salaryId ? "Salary Details has been updated." : "Salary Details has been saved.";

    const displayConfirm = () => {
        Swal.fire({
            title: 'Success',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: successBoxText

        }).then((result) => {
            if (result['isConfirmed']) {
                if (salaryId) {
                    navigate("/SalaryDetailsTb");
                } else {
                    navigate("/SalaryDetailsQuickLinks");
                }

            }
        })
    }


    const getSalaryDetails = async () => {
        const { data } = await axios.get("https://localhost:7115/api/SalaryDetails/GetSalaryDetails/" + salaryId);
        setSalaryDetails(data);
    }

    var myValues = {
        designation: salaryDetails.designation,
        basicPay: salaryDetails.basicPay,
        salary: salaryDetails.salary,
        dailyAllowance: salaryDetails.dailyAllowance,
        medicalAllowance: salaryDetails.medicalAllowance,
        travelAllowance: salaryDetails.travelAllowance

    }

    //To call submit class details api
    const AddsalaryDetails = async (values) => {
        try {
            const { response } = await axios.post("https://localhost:7115/api/SalaryDetails/AddSalaryDetails", values, { headers: { "Content-Type": 'application/json' } })
            console.log(response)
            if (response != "") {
                displayConfirm();
            }
        } catch (error) {
            console.log(error)
        }
    }

    //To call update class details api
    const updatesalaryDetails = async (values) => {
        try {
            var formdata = { ...values, Id: salaryId }
            const { response } = await axios.put("https://localhost:7115/api/SalaryDetails/UpdateSalaryDetails/" + salaryId, formdata, { headers: { "Content-Type": 'application/json' } })
            console.log(response)
            if (response != "") {
                displayConfirm();
            }
        } catch (error) {
            console.log(error)
        }
    }

    //To confirm submit form
    function submitForm(values, resetForm) {
        Swal.fire({
            title: 'Are you sure?',
            text: confirmBoxText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result['isConfirmed']) {
                if (salaryId) {
                    updatesalaryDetails(values)
                } else {
                    AddsalaryDetails(values)
                }


            }
        })
    }

    
    let schema = yup.object().shape({
        designation: yup.string()
                    .required("Designation is Required *")
                    .matches(isalphabets, 'Must enters alphabets only'),
        salary: yup.number()
            .typeError('You must specify a number')
            .required("Salary is Required *")
            .positive(),
        basicPay: yup.number()
            .typeError('You must specify a number')
            .required("Basic pay is Required *")
            .positive()
            .max(yup.ref("salary"),"Basic Pay amount must be less than salary amount"),
        travelAllowance: yup.number()
            .typeError('You must specify a number')
            .required("Travel Allowance is Required *")
            .positive()
            .max(yup.ref("medicalAllowance"),"Travel Allowance amount must be less than Medical Allowance amount"),
        medicalAllowance: yup.number()
            .typeError('You must specify a number')
            .required("Medical Allowance is Required *")
            .positive()
            .max(yup.ref("dailyAllowance"),"Medical Allowance amount must be less than Daily Allowance amount"),
        dailyAllowance: yup.number()
            .typeError('You must specify a number')
            .required("Daily Allowance is Required *")
            .positive()
            .max(yup.ref("basicPay"),"Daily Allowance amount must be less than Basic Pay amount"),
    });

    useEffect(() => {
        getSalaryDetails();
    }, [])

    return (
        <>
            {salaryDetails.designation && salaryId || !salaryId ?
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header frm-header"><h3 class="text-center my-4 frm-title"><b>{formTitle}</b></h3></div>
                                <div class="card-body">
                                    <Formik
                                        initialValues={myValues}
                                        onSubmit={(values, { resetForm }) => submitForm(values, resetForm)}
                                        validationSchema={schema}>
                                             {formik =>
                                        <Form>
                                            <div class="form-floating mb-3">
                                           
                                                <Field class="form-control" id="designation" type="text" name="designation" 
                                                value={formik.values.designation} onChange={formik.handleChange} placeholder="Designation" />
                                                <label for="designation">Designation</label>
                                                <span className="text-danger"><ErrorMessage className="text-danger" name="designation" /></span>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="salary" type="text" name="salary"
                                                        value={formik.values.salary} onChange={formik.handleChange}
                                                            placeholder="Salary" />
                                                        <label for="salary">Salary</label>
                                                        <span className="text-danger"><ErrorMessage className="text-danger" name="salary" /></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="basicPay" type="text" name="basicPay"
                                                        value={formik.values.basicPay} onChange={formik.handleChange}
                                                            placeholder="Basic Pay" />
                                                        <label for="basicPay">Basic Pay</label>
                                                        <span className="text-danger"><ErrorMessage className="text-danger" name="basicPay" /></span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="dailyAllowance" type="text" name="dailyAllowance"
                                                        value={formik.values.dailyAllowance} onChange={formik.handleChange}
                                                            placeholder="Daily Allowance" />
                                                        <label for="dailyAllowance">Daily Allowance</label>
                                                        <span className="text-danger"> <ErrorMessage class="text-danger" name="dailyAllowance" /></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="medicalAllowance" type="text" name="medicalAllowance"
                                                        value={formik.values.medicalAllowance} onChange={formik.handleChange}
                                                            placeholder="Medical Allowance" />
                                                        <label for="medicalAllowance">Medical Allowance</label>
                            
                                                        <span className="text-danger"><ErrorMessage className="text-danger" name="medicalAllowance" /></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="travelAllowance" type="text" name="travelAllowance"
                                                        value={formik.values.travelAllowance} onChange={formik.handleChange}
                                                            placeholder="Travel Allownace" />
                                                        <label for="travelAllowance">Travel Allowance</label>
                                                        <span className="text-danger"><ErrorMessage className="text-danger" name="travelAllowance" /></span>
                                                    </div>
                                                </div>
                                               {formik.values.salary && formik.values.basicPay && formik.values.dailyAllowance && formik.values.medicalAllowance && formik.values.travelAllowance &&
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <Field class="form-control" id="totalSalary" type="text" name="totalSalary" disabled 
                                                         value={parseInt(formik.values.salary)+parseInt(formik.values.basicPay)+parseInt(formik.values.dailyAllowance)+parseInt(formik.values.medicalAllowance)+parseInt(formik.values.travelAllowance)}
                                                         placeholder="Total Salary" />
                                                        <label for="totalSalary">Total Salary</label>
                                                    </div>
                                                </div>}
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <center>
                                                    <button class="btn btn-warning  btn-block" type="submit">{btnTiltle}</button>
                                                </center>
                                            </div>
                                        </Form>
                                        }
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    );
}