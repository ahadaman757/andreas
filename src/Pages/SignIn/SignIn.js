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
function SignIn() {
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
        .post(`https://${constants.host}:3003/signin`, values)
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
                      <div
                        id="emailHelp"
                        className={`form-text float-end my-2 ${styles.formText}`}
                      >
                        Lost Your Password?
                      </div>
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

export default SignIn;
