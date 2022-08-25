import React, { useState, Fragment } from 'react'
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { useFormik } from "formik";
import styles from './main.module.css'
import axios from 'axios'
import constants from '../../constants'
function ResetPassword(props) {
    const [CodeCheck, setCodeCheck] = useState(false)
    const [codeGenerating, setcodeGenerating] = useState(false)
    const [verificationCode, setverificationCode] = useState('');
    const { state, handleClose, handleOpen } = props
    // reset passowrd schema
    const resetPasswordSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        code: Yup.string().required("Required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Enter password to confirm"),
    });
    // formIk Password
    const formikPassword = useFormik({
        initialValues: {
            email: "",
            code: '',
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => {
            setCodeCheck(true)
            axios
                .post(`https://${constants.host}:3001/resetPassword`, { email: formikPassword.values.email, password: formikPassword.values.password, realCode: verificationCode, enteredCode: formikPassword.values.code }).catch(err => {
                    toast.error(`Error:${err}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setCodeCheck(false)
                })
                .then((res) => {
                    // alert(res.data)
                    if (res.data.Error) {
                        toast.error(`Error:${res.data.Error}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setCodeCheck(false)
                    }

                    if (res.data.success == 1) {
                        toast.success(`Password Reset Successfully`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // return navigate("/signin");
                        setCodeCheck(false)
                    }
                });
        },
    });

    // generate Code handler
    function generateCodeHandler(length) {
        setcodeGenerating(true)
        axios.post('https://3.14.27.53:3001/users/generateCode', { email: formikPassword.values.email, codeLength: length }).then(response => {
            setverificationCode(response.data.code)
            if (response.data.success)
                toast.success(`Code sent to your Email`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            setcodeGenerating(false)
        }).catch(error => {
            toast.error(`Error:${error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setcodeGenerating(false)
        })
        // return result;
    }
    // opem Modal for reset Pasword
    const resetPassword = () => {
        // open a modal
        handleOpen()
        // write code for sending the code to user email\
    }

    return (<Fragment>
        <Modal show={state} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Recover Your Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>Enter Your Email to Receive Code for Password change

                <form onSubmit={formikPassword.handleSubmit} method="post">
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className={` ${styles.formText} form-label`}
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            className={`form-control ${styles.input} `}
                            aria-describedby="email"
                            id="email"
                            name="email"
                            onChange={formikPassword.handleChange}
                            value={formikPassword.values.email}
                        />
                        {formikPassword.touched.email && formikPassword.errors.email ? (
                            <div className={`${styles.formError}`}>
                                {formikPassword.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="col-lg-6">
                        <label
                            htmlFor="password"
                            className={`form-label ${styles.inputLable_text}`}
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${styles.input}`}
                            id="password"
                            name="password"
                            onChange={formikPassword.handleChange}
                            value={formikPassword.values.password}
                        />
                        {formikPassword.touched.password && formikPassword.errors.password ? (
                            <div className={`${styles.formError}`}>
                                {formikPassword.errors.password}
                            </div>
                        ) : null}
                    </div>
                    <div className="col-lg-6">
                        <label
                            htmlFor="confirmPassword"
                            className={`form-label ${styles.inputLable_text}`}
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={formikPassword.handleChange}
                            value={formikPassword.values.confirmPassword}
                        />
                        {formikPassword.touched.confirmPassword &&
                            formikPassword.errors.confirmPassword ? (
                            <div className={`${styles.formError}`}>
                                {formikPassword.errors.confirmPassword}
                            </div>
                        ) : null}
                    </div>
                    <div className="col my-2">
                        {
                            codeGenerating ? <button disabled className={`${styles.generateCode} btn btn-primary`} type="button" onClick={() => generateCodeHandler(4)}>Verification Code is being sent</button> : <button className={`${styles.generateCode} btn btn-primary`} type="button" onClick={() => generateCodeHandler(4)}>Send Verification code to Email</button>
                        }
                    </div>
                    <div className="col-12">
                        <label
                            for="compnay"
                            className={`form-label ${styles.inputLable_text}`}
                        >
                            Enter Verification Code
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            id="code"
                            name="code"
                            onChange={formikPassword.handleChange}
                            value={formikPassword.values.code}
                        />
                        {formikPassword.touched.code && formikPassword.errors.code ? (
                            <div className={`${styles.formError}`}>
                                {formikPassword.errors.code}
                            </div>
                        ) : null}
                    </div>
                    <button className="btn bg-primary text-white my-2" type="submit">
                        Submit
                    </button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn bg-secondry" onClick={handleClose}>
                    Close
                </button>

            </Modal.Footer>
        </Modal>
        <ToastContainer />
    </Fragment>

    )
}

export default ResetPassword