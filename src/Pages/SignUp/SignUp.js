import React, { Fragment, useState } from "react";
import { SignUpNav } from "../../Components/UI/MiniComponents/MiniComponent";
import styles from "./main.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import constants from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivacyModal from "../../Components/UI/Modal/PrivacyModal";
import SVG from "../../helpers/svgs";
import {
  PrimaryButton,
  Fullpage,
} from "../../Components/styledComponents.js/shared";
const SignUp = () => {
  const navigate = useNavigate();
  const [serverError, setserverError] = useState("");
  const [AccountCreation, setAccountCreation] = useState(false);
  const [codeGenerating, setcodeGenerating] = useState(false);
  const [verificationCode, setverificationCode] = useState();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const handleClose = () => {
    setShowPrivacyModal(!showPrivacyModal);
  };
  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    code: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Enter password to confirm"),
    companyUrl: Yup.string().required("Website URL is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You Must be agree with terms to Sign up"
    ),
  });
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      company: "",
      password: "",
      confirmPassword: "",
      companyUrl: "",
      terms: false,
      code: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setAccountCreation(true);
      setserverError("");
      axios
        .post(`https://${constants.host}:3001/signup`, {
          ...values,
          realCode: verificationCode,
          enteredCode: formik.values.code,
        })
        .catch((err) => {
          toast.error(`Error:${err}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setAccountCreation(false);
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
            setAccountCreation(false);
          }
          setserverError(res.data.message);
          if (res.data.success == 1) {
            toast.success(`Account Created successfully`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return navigate("/signin");
            setAccountCreation(false);
          }
        });
    },
  });
  function generateCodeHandler(length) {
    setcodeGenerating(true);
    axios
      .post("https://18.224.107.246:3001/users/generateCode", {
        email: formik.values.email,
        codeLength: length,
      })
      .then((response) => {
        setverificationCode(response.data.code);
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
        setcodeGenerating(false);
      })
      .catch((error) => {
        toast.error(`Error:${error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setcodeGenerating(false);
      });
    // return result;
  }
  return (
    <Fullpage>
      <PrivacyModal open={showPrivacyModal} handleClose={handleClose} />
      <div className="container my-5">
        <div className=" row justify-content-between">
          <div className="d-flex align-items-center justify-content-center  flex-wrap justify-content-sm-between">
            <div className="d-flex   align-items-center  ">
              <img
                className={`${styles.iconImg} mt-3 mt-md-0 col-4 `}
                src={SVG.NewLogo}
              />{" "}
              <span className={`${styles.logotext}`}>ChatReply</span>
            </div>
            <div>
              <p className={`${styles.actionText} mb-0`}>
                Start your free Company trial
              </p>
              <p className={`${styles.greentext} text-end mb-0 fw-600`}>
                Free 20 leads trial
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <form
            className="row gx-5 g-3 px-3 py-4"
            onSubmit={formik.handleSubmit}
            method="post"
          >
            <div className="col-lg-6">
              <label
                htmlFor="fname"
                className={`form-label ${styles.inputLable_text}`}
              >
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputField} `}
                id="fname"
                name="fname"
                onChange={formik.handleChange}
                value={formik.values.fname}
              />
              {formik.touched.fname && formik.errors.fname ? (
                <div className={`${styles.formError}`}>
                  {formik.errors.fname}
                </div>
              ) : null}
            </div>
            <div className="col-lg-6">
              <label
                htmlFor="lname"
                className={`form-label ${styles.inputLable_text}`}
              >
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputField} `}
                id="lname"
                name="lname"
                onChange={formik.handleChange}
                value={formik.values.lname}
              />
              {formik.touched.lname && formik.errors.lname ? (
                <div className={`${styles.formError}`}>
                  {formik.errors.lname}
                </div>
              ) : null}
            </div>
            <div className="col-12">
              <label
                htmlFor="email"
                className={`form-label ${styles.inputLable_text}`}
              >
                Business Email
              </label>
              <input
                type="email"
                className={`form-control ${styles.inputField} `}
                placeholder=""
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
            <div className="col-lg-6">
              <label
                htmlFor="password"
                className={`form-label ${styles.inputLable_text}`}
              >
                password
              </label>
              <input
                type="password"
                className={`form-control ${styles.inputField} `}
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
            </div>
            <div className="col-lg-6">
              <label
                htmlFor="confirmPassword"
                className={`form-label ${styles.inputLable_text}`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${styles.inputField} `}
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                <div className={`${styles.formError}`}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label
                htmlFor="compnay"
                className={`form-label ${styles.inputLable_text}`}
              >
                Company Name
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputField} `}
                placeholder=""
                id="compnay"
                name="company"
                onChange={formik.handleChange}
                value={formik.values.company}
              />
            </div>
            <div className="col-md-6">
              <label
                htmlFor="compnayUrl"
                className={`form-label ${styles.inputLable_text}`}
              >
                Website URL
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputField} `}
                placeholder=""
                id="companyUrl"
                name="companyUrl"
                onChange={formik.handleChange}
                value={formik.values.companyUrl}
              />
              {formik.touched.companyUrl && formik.errors.companyUrl ? (
                <div className={`${styles.formError}`}>
                  {formik.errors.companyUrl}
                </div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label
                for="v-code"
                className={`form-label ${styles.inputLable_text}`}
              >
                Send Verification Code
              </label>
              <br />
              {codeGenerating ? (
                <button
                  disabled
                  className={`${styles.generateCode} btn form-control btn-primary`}
                  type="button"
                  onClick={() => generateCodeHandler(4)}
                >
                  Verification Code is being sent
                </button>
              ) : (
                <button
                  style={{ width: "max-content" }}
                  className={`${styles.generateCode} btn form-control btn-secondary mt-auto`}
                  type="button"
                  onClick={() => generateCodeHandler(4)}
                >
                  Send
                </button>
              )}
            </div>
            <div className="col-md-6">
              <label
                for="v-code"
                className={`form-label ${styles.inputLable_text}`}
              >
                Enter Verification Code
              </label>
              <input
                type="text"
                className={`form-control ${styles.inputField} `}
                placeholder=""
                id="code"
                name="code"
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              {formik.touched.code && formik.errors.code ? (
                <div className={`${styles.formError}`}>
                  {formik.errors.code}
                </div>
              ) : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  onChange={formik.handleChange}
                  value={formik.values.terms}
                />
                <label className="form-check-label" htmlFor="terms">
                  I accept that this site stores my submitted information so
                  that it can respond to my request
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms ? (
                <div className={`${styles.formError}`}>
                  {formik.errors.terms}
                </div>
              ) : null}
            </div>
            <div className="col-md-8 col-12 ms-auto text-center d-flex justify-content-end">
              <p className={`${styles.formText} my-2 me-2  text-center`}>
                Already have an account ?
                <NavLink
                  to="/signin"
                  className={`text-decoration-none ms-1  fw-bold ${styles.greentext}`}
                >
                  Sign In{" "}
                </NavLink>{" "}
              </p>
              {AccountCreation ? (
                <button
                  disabled
                  className={`btn w-100 mx-auto bg-primary  btn-primary ${styles.createBtn}`}
                >
                  Account is being Created
                </button>
              ) : (
                <button
                  type="submit"
                  className={`btn  bg-primary  btn-primary ${styles.createBtn}`}
                >
                  Create for FREE
                </button>
              )}
            </div>
            <ToastContainer />
            {serverError && (
              <div className={`${styles.formError}`}>{serverError}</div>
            )}
          </form>
        </div>
      </div>
    </Fullpage>
  );
};
function SignUpd() {
  const navigate = useNavigate();
  const [serverError, setserverError] = useState("");
  const [AccountCreation, setAccountCreation] = useState(false);
  const [codeGenerating, setcodeGenerating] = useState(false);
  const [verificationCode, setverificationCode] = useState();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const handleClose = () => {
    setShowPrivacyModal(!showPrivacyModal);
  };
  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    code: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Enter password to confirm"),
    companyUrl: Yup.string().required("Website URL is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You Must be agree with terms to Sign up"
    ),
  });
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      company: "",
      password: "",
      confirmPassword: "",
      companyUrl: "",
      terms: false,
      code: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setAccountCreation(true);
      setserverError("");
      axios
        .post(`https://${constants.host}:3001/signup`, {
          ...values,
          realCode: verificationCode,
          enteredCode: formik.values.code,
        })
        .catch((err) => {
          toast.error(`Error:${err}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setAccountCreation(false);
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
            setAccountCreation(false);
          }
          setserverError(res.data.message);
          if (res.data.success == 1) {
            toast.success(`Account Created successfully`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return navigate("/signin");
            setAccountCreation(false);
          }
        });
    },
  });
  function generateCodeHandler(length) {
    setcodeGenerating(true);
    axios
      .post("https://18.224.107.246:3001/users/generateCode", {
        email: formik.values.email,
        codeLength: length,
      })
      .then((response) => {
        setverificationCode(response.data.code);
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
        setcodeGenerating(false);
      })
      .catch((error) => {
        toast.error(`Error:${error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setcodeGenerating(false);
      });
    // return result;
  }
  return (
    <Fragment>
      <PrivacyModal open={showPrivacyModal} handleClose={handleClose} />
      <div className={`container-fluid  ${styles.back}  d-flex  `}>
        <div className="container d-flex">
          <div className={`row  ${styles.row} `}>
            <div className={` col-12  d-md-flex flex-column  col-lg-9`}>
              <SignUpNav bgColor="transparent" />
              <div
                className="contianer-fluid  d-md-flex flex-column justify-content-md-center"
                style={{ flexGrow: 1 }}
              >
                <div
                  className="container-lg d-md-flex flex-column justify-content-md-end "
                  style={{ flexGrow: 1 }}
                >
                  <div className="row">
                    <div className=" col-12 d-flex flex-column justify-content-between col-md-7 col-lg-10 ">
                      <h2
                        className={`px-2   me-md-5 mt-md-0 mt-4 text-white ${styles.h2}`}
                      >
                        From there it only takes 5 minutes to get started. It is
                        free and without obligation to start your trial period.
                      </h2>
                    </div>
                  </div>
                  <ul className={`${styles.terms} d-flex text-white`}>
                    <li
                      className="me-3"
                      onClick={() => {
                        setShowPrivacyModal(!showPrivacyModal);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Privacy & Terms
                    </li>
                    {/* <li>Contact Us</li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className={` col-10 mb-md-0 mb-5  col-md-5 ${styles.formCol}`}>
              <div
                className={`${styles.loginForm_header} row d-flex justify-content-between align-items-center py-4 px-3 `}
              >
                <div className="col-lg-7">
                  <h3
                    className={`${styles.formHeader_text} mb-0 d-inline-block`}
                  >
                    Start your free Company trial
                  </h3>
                </div>
                <div className="col-lg-5 d-flex   mt-2  text-bold justify-content-center text-end">
                  Free 8-day trial
                </div>
              </div>
              <form
                className="row g-3 px-3 py-4"
                onSubmit={formik.handleSubmit}
                method="post"
              >
                <div className="col-lg-6">
                  <label
                    htmlFor="fname"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    id="fname"
                    name="fname"
                    onChange={formik.handleChange}
                    value={formik.values.fname}
                  />
                  {formik.touched.fname && formik.errors.fname ? (
                    <div className={`${styles.formError}`}>
                      {formik.errors.fname}
                    </div>
                  ) : null}
                </div>
                <div className="col-lg-6">
                  <label
                    htmlFor="lname"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    onChange={formik.handleChange}
                    value={formik.values.lname}
                  />
                  {formik.touched.lname && formik.errors.lname ? (
                    <div className={`${styles.formError}`}>
                      {formik.errors.lname}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <label
                    htmlFor="email"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    Business Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder=""
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
                <div className="col-lg-6">
                  <label
                    htmlFor="password"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${styles.input}`}
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
                </div>
                <div className="col-lg-6">
                  <label
                    htmlFor="confirmPassword"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                    <div className={`${styles.formError}`}>
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <label
                    htmlFor="compnay"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="compnay"
                    name="company"
                    onChange={formik.handleChange}
                    value={formik.values.company}
                  />
                </div>
                <div className="col-12">
                  <label
                    htmlFor="compnay"
                    className={`form-label ${styles.inputLable_text}`}
                  >
                    Website URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    id="companyUrl"
                    name="companyUrl"
                    onChange={formik.handleChange}
                    value={formik.values.companyUrl}
                  />
                  {formik.touched.companyUrl && formik.errors.companyUrl ? (
                    <div className={`${styles.formError}`}>
                      {formik.errors.companyUrl}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      onChange={formik.handleChange}
                      value={formik.values.terms}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I accept that this site stores my submitted information so
                      that it can respond to my request
                    </label>
                  </div>
                  {formik.touched.terms && formik.errors.terms ? (
                    <div className={`${styles.formError}`}>
                      {formik.errors.terms}
                    </div>
                  ) : null}
                </div>
                <div className="col-2">
                  {codeGenerating ? (
                    <button
                      disabled
                      className={`${styles.generateCode} btn btn-primary`}
                      type="button"
                      onClick={() => generateCodeHandler(4)}
                    >
                      Verification Code is being sent
                    </button>
                  ) : (
                    <button
                      className={`${styles.generateCode} btn btn-primary`}
                      type="button"
                      onClick={() => generateCodeHandler(4)}
                    >
                      Send Verification code to Email
                    </button>
                  )}
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
                    onChange={formik.handleChange}
                    value={formik.values.code}
                  />
                  {formik.touched.code && formik.errors.code ? (
                    <div className={`${styles.formError}`}>
                      {formik.errors.code}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 text-center d-flex justify-content-center">
                  {AccountCreation ? (
                    <button
                      disabled
                      className={`btn w-100 mx-auto bg-primary  btn-primary ${styles.createBtn}`}
                    >
                      Account is being Created
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`btn w-100 mx-auto bg-primary  btn-primary ${styles.createBtn}`}
                    >
                      Create for FREE
                    </button>
                  )}
                </div>
                <ToastContainer />
                {serverError && (
                  <div className={`${styles.formError}`}>{serverError}</div>
                )}
              </form>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default SignUp;
