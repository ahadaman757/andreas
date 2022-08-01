import React, { useState, useContext, Fragment } from "react";
import Navbar from "../../Components/UI/Header/Header";
import Constant from "../../assets/Constants/ui_constants";
import Footer from "../../Components/UI/Footer/Footer";
import styles from "./main.module.css";
import { LinksNav } from "../../Components/UI/MiniComponents/MiniComponent";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../App";
import constants from '../../constants'
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrimaryButton, Fullpage } from "../../Components/styledComponents.js/shared";
import SVG from '../../helpers/svgs'
const SignInNew = () => {
  const resetPasswordSchema = Yup.object().shape({

    email: Yup.string().email("Invalid email").required("Required"),
    code: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Enter password to confirm"),
  });
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
            return navigate("/signin");
            setCodeCheck(false)
          }
        });
    },
  });
  function generateCodeHandler(length) {
    setcodeGenerating(true)
    axios.post('https://192.163.206.200:3001/users/generateCode', { email: formikPassword.values.email, codeLength: length }).then(response => {
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
  const sendCode = () => {
    {

    }
  }
  const resetPassword = () => {
    // open a modal
    handleShow()
    // write code for sending the code to user email\
  }
  const [CodeCheck, setCodeCheck] = useState(false)
  const [codeGenerating, setcodeGenerating] = useState(false)
  const [verificationCode, setverificationCode] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { authState, setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();
  const [ServerMsg, setServerMsg] = useState("");
  const [ServerError, setServerError] = useState("");
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Password is required"),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      axios
        .post(`https://${constants.host}:3001/signin`, values)
        .catch((error) => {
          alert(error);
        })
        .then((res) => {
          const t = res ?? false;
          if (t) {
            if (res.data.error) {
              setServerError(res.data.error);
              return;
            } else {
              setTimeout(() => {
                setServerMsg("");
              }, 2000);
              localStorage.setItem("accessToken", res.data.token);

              setAuthState({ LoggedUserData: res.data.userData, status: true });

              return navigate("/dashboard");
            }
          }
        });
    },
  });
  return (
    <Fullpage>
      <Modal show={show} onHide={handleClose}>
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
          {/* {
            codeGenerating ? <button disabled className={`${styles.generateCode} btn btn-primary`} type="button" onClick={() => generateCodeHandler(4)}>Verification Code is being sent</button> : <button className={`${styles.generateCode} btn btn-primary`} type="button" onClick={() => generateCodeHandler(4)}>Send Verification code to Email</button>
          } */}
          <button className="btn bg-secondry" onClick={handleClose}>
            Close
          </button>

        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className={`col-md-5 d-md-block d-none p-0 ${styles.leftBackground}`}>

          </div>
          <div className={`col-md-7 p-0 ${styles.rightColumn}`} >
            <div>
              <div className="d-flex align-items-center">
                <img
                  className={`${styles.iconImg} mt-3 mt-md-0 col-4 `}
                  src={SVG.NewLogo}
                /> <span className={`${styles.logotext}`}>ChatReply</span>
              </div>

            </div>
            <div className={`${styles.formWrapper}`}>
              <div>
                <form className={`${styles.signInForm}`} onSubmit={formik.handleSubmit} method="post">
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
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className={`${styles.formError}`}>
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className={` ${styles.formText} form-label`}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${styles.input} `}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className={`${styles.formError}`}>
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <button
                      onClick={() => resetPassword()}
                      id="emailHelp"
                      className={` btn float-end my-2 ${styles.formText}`}
                    >
                      Lost Your Password?
                    </button>
                  </div>
                  {ServerMsg && (
                    <p className={`${styles.successmsg}`}>{ServerMsg}</p>
                  )}
                  {ServerError && (
                    <p className={`${styles.formError}`}>{ServerError}</p>
                  )}
                  <PrimaryButton
                    type="submit"
                    color='white'
                    weight={500}
                    alignSelf='center'
                  >
                    Sign In
                  </PrimaryButton>

                </form>
                <p className={`${styles.formText} my-2 mx-auto text-center`}>
                  Don't have an account?{" "}
                  <NavLink
                    to="/signup"
                    className={`text-decoration-none  fw-bold ${styles.greentext}`}
                  >
                    Sign Up{" "}
                  </NavLink>{" "}
                  .
                </p>
              </div>


            </div>

          </div>
        </div>
      </div>

    </Fullpage>

  )
}


function SignIn() {
  const resetPasswordSchema = Yup.object().shape({

    email: Yup.string().email("Invalid email").required("Required"),
    code: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Enter password to confirm"),
  });
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
            return navigate("/signin");
            setCodeCheck(false)
          }
        });
    },
  });
  function generateCodeHandler(length) {
    setcodeGenerating(true)
    axios.post('https://192.163.206.200:3001/users/generateCode', { email: formikPassword.values.email, codeLength: length }).then(response => {
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
  const sendCode = () => {
    {

    }
  }
  const resetPassword = () => {
    // open a modal
    handleShow()
    // write code for sending the code to user email\
  }
  const [CodeCheck, setCodeCheck] = useState(false)
  const [codeGenerating, setcodeGenerating] = useState(false)
  const [verificationCode, setverificationCode] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { authState, setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();
  const [ServerMsg, setServerMsg] = useState("");
  const [ServerError, setServerError] = useState("");
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Password is required"),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      axios
        .post(`https://${constants.host}:3001/signin`, values)
        .catch((error) => {
          alert(error);
        })
        .then((res) => {
          const t = res ?? false;
          if (t) {
            if (res.data.error) {
              setServerError(res.data.error);
              return;
            } else {
              setTimeout(() => {
                setServerMsg("");
              }, 2000);
              localStorage.setItem("accessToken", res.data.token);

              setAuthState({ LoggedUserData: res.data.userData, status: true });

              return navigate("/dashboard");
            }
          }
        });
    },
  });

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
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
          {/* {
            codeGenerating ? <button disabled className={`${styles.generateCode} btn btn-primary`} type="button" onClick={() => generateCodeHandler(4)}>Verification Code is being sent</button> : <button className={`${styles.generateCode} btn btn-primary`} type="button" onClick={() => generateCodeHandler(4)}>Send Verification code to Email</button>
          } */}
          <button className="btn bg-secondry" onClick={handleClose}>
            Close
          </button>

        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <div
        className=" flex-column d-flex contianer-fluid"
        style={{ height: "100vh" }}
      >
        <LinksNav bgColor={Constant.colors.mirage} />
        <div
          className="container-fluid flex-grow-1 mb-auto"
          style={{ backgroundColor: "#E5E5E5" }}
        >
          <div className="row py-5">
            <div className=" mx-auto col-md-4">
              <div className={`${styles.loginForm} pb-5`}>
                <div className={`${styles.loginForm_header} p-4`}>
                  <h3 className={`${styles.formHeader_text}`}>
                    Login To My Account
                  </h3>
                </div>
                <div className="fields px-3 pt-4 pb-3">
                  <form onSubmit={formik.handleSubmit} method="post">
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
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className={`${styles.formError}`}>
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className={` ${styles.formText} form-label`}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${styles.input} `}
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className={`${styles.formError}`}>
                          {formik.errors.password}
                        </div>
                      ) : null}
                      <button
                        onClick={() => resetPassword()}
                        id="emailHelp"
                        className={` btn float-end my-2 ${styles.formText}`}
                      >
                        Lost Your Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className={`btn btn-primary bg-primary  text-white w-100 ${styles.formText}`}
                      style={{ fontWeight: 500 }}
                    >
                      Login
                    </button>
                  </form>
                  {ServerMsg && (
                    <p className={`${styles.successmsg}`}>{ServerMsg}</p>
                  )}
                  {ServerError && (
                    <p className={`${styles.formError}`}>{ServerError}</p>
                  )}
                </div>
              </div>

              <p className={`${styles.formText} text-center`}>
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-decoration-none text-primary fw-bold "
                >
                  Register here{" "}
                </NavLink>{" "}
                .
              </p>
            </div>
          </div>
        </div>
        <div className="div">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export default SignInNew;
