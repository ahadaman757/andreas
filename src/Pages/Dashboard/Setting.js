import React, { useContext, useEffect, useState } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { Fragment } from "react";
import styles from "./styles.module.css";
import Button from "../../Components/Buttons/Button";
import { AuthContext } from "../../App";
import axios from "axios";
import * as Yup from "yup";
import constants from "../../constants";
import { loadStripe } from "@stripe/stripe-js";
import Loading from '../Loading/Loading'
import { useFormik } from "formik";
import { default as Buttons } from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { asyncLocalStorage } from "../../helpers/helperFunctions";
import { socket } from "../../App";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
// STRIPE CONFIGURATION
const stripePromise = loadStripe(
  "pk_test_51KrpCtAGfLyluyxLjKxj7EtTSmRe6bo0ecNMicW0ISmzoxff6U94mdzxiUvBXeClaUpEz1kPAkv0u2H3jWfdH8wG00fGbTa2WF"
);

const EditPlans = () => {
  const [planSelected, setPlanSelected] = useState(1);
  const [planPrice, setPlanPrice] = useState(0);
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const changePlan = (e) => {
    setPlanSelected(e);
  };

  useEffect(() => {
    axios
      .post(`https://${constants.host}:3001/ownergetplans`, {
        type: planSelected,
      })
      .then((response) => {
        setPlanPrice(response.data[0].price);
        setPlanName(response.data[0].name);
        setPlanDescription(response.data[0].description);
        setLoading(false);
      });
  }, [planSelected, loading]);

  const saveChanges = () => {
    axios
      .post(`https://${constants.host}:3001/updateplan`, {
        price: planPrice,
        name: planName,
        description: planDescription,
        type: planSelected,
      })
      .then((response) => {
        setLoading(true);
      });
  };

  const price = {
    color: "#5CB85C",
    fontSize: "30px",
  };
  return (
    <div className="container">
      <h3>Subscriptions</h3>
      <p>Choose your plan</p>
      <div className="card">
        <div className="card-body">
          <label>Select a plan to edit</label>
          <select
            className="form-select"
            onChange={(val) => {
              changePlan(val.target.value);
            }}
          >
            <option value="1">Free</option>
            <option value="2">Starter</option>
            <option value="3">Business</option>
          </select>
          <hr />
          <div className="row">
            <div className="col-md-6 col-12">
              <label>Package Name</label>
              <input
                className="form-control"
                value={planName}
                onChange={(val) => {
                  setPlanName(val.target.value);
                }}
              />
            </div>
            <div className="col-md-6 col-12">
              <label>Package Price</label>
              <input
                className="form-control"
                value={planPrice}
                onChange={(val) => {
                  setPlanPrice(val.target.value);
                }}
              />
            </div>
            <div className="col-md-12 col-12" style={{ marginTop: "20px" }}>
              <label>Package Description</label>
              <input
                className="form-control"
                value={planDescription}
                onChange={(val) => {
                  setPlanDescription(val.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-outline-primary"
            onClick={(event) => {
              event.preventDefault();
              saveChanges();
            }}
            disabled={loading == true ? true : false}
          >
            {loading == true ? "Updating" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsButton = (props) => {
  return (
    <button
      className={`${styles.SettingsLeftNavButton}`}
      onClick={() => {
        props.changeHandler(props.value);
      }}
    >
      {props.value}
    </button>
  );
};
const LeftSideBar = ({ changeHandler }) => {
  const { authState, setAuthState } = useContext(AuthContext);
  return (
    <div className={`${styles.clientSetingsLeftSideContainer}`}>
      <SettingsButton value="Overview" changeHandler={changeHandler} />
      {/* <div className={`accordion accordion-flush`} id="accordionFlushExample">
        <div className={`accordion-item  ${styles.settingsAccordions}`}>
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className={`accordion-button collapsed`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Channels
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> className. This is the
              first item's accordion body.
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className={`accordion accordion-flush`} id="accordionFlushExample">
        <div className={`accordion-item  ${styles.settingsAccordions}`}>
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className={`accordion-button collapsed`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Settings
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> className. This is the
              first item's accordion body.
            </div>
          </div>
        </div>
      </div> */}
      <div className={`accordion accordion-flush`} id="accordionThree">
        <div className={`accordion-item  ${styles.settingsAccordions}`}>
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className={`accordion-button collapsed`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Account
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionThree"
          >
            <div className="accordion-body">
              <button
                style={{ border: "none", background: "none" }}
                onClick={() => {
                  changeHandler("Subscription");
                }}
              >
                Subscriptions
              </button>{" "}
              <br />
              {/* <button style={{ border: "none", background: "none" }}>
                Account Details
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* {authState.LoggedUserData.account_type == "owner" ? (
        <div className={`accordion accordion-flush`} id="accordionFour">
          <div className={`accordion-item  ${styles.settingsAccordions}`}>
            <h2 className="accordion-header" id="flush-headingFour">
              <button
                className={`accordion-button collapsed`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
                Membership Plans
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFour"
            >
              <div className="accordion-body">
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => {
                    changeHandler("editplans");
                  }}
                >
                  Subscriptions
                </button>{" "}
                <br />
                <button style={{ border: "none", background: "none" }}>
                  Membership Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};
const Overview = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [editable, setEditable] = useState(0);
  const [isSucces, setSuccess] = useState(null);
  const [ProfileUpdating, setProfileUpdating] = useState(false)
  const [PhotoChanged, setPhotoChanged] = useState(false)
  const [profileData, setprofileData] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profileUpdated, SetProfileUpdated] = useState(false)
  const [ServerMsg, setServerMsg] = useState("");
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
      setProfileUpdating(true)
      axios
        .post(`https://${constants.host}:3001/signin`, values)
        .catch((error) => {
          alert(error);
        })
        .then((res) => {
          const t = res ?? false;
          if (t) {
            if (res.data.error) {
              setServerMsg(res.data.error)
              setProfileUpdating(false)
              return;
            } else {
              setServerMsg(res.data.error)
              console.log(res)
              submit(values)
            }
          }
        });
    },
  });
  // convert authState data to object notation
  useEffect(() => {
    setprofileData((pre) => {
      return {
        firstName: authState.LoggedUserData.f_name,
        lastName: authState.LoggedUserData.l_name,
        email: authState.LoggedUserData.email,
      }
    })
  }, [authState])
  // console.log(person)
  const handleFormData = (e) => {
    console.log(e)
    setprofileData(pre => {
      return {
        ...pre, [e.target.name]: e.target.value
      }
    })
  }
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const handleInputChange = (event) => {
    setPhotoChanged(true)
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const UpdateHandler = (values) => {

    console.log(values)
    const ID = authState.LoggedUserData.id;
    axios.post(`https://${constants.host}:3001/updateuser`, {
      id: authState.LoggedUserData.id,
      firstname: profileData.firstName,
      lastname: profileData.lastName,
      email: profileData.email,
    }).catch(error => {
      console.log(error)
    }).then(res => {
      axios
        .post(`https://${constants.host}:3001/signin`, values)
        .catch((error) => {
          alert(error);
        })
        .then((res) => {
          const t = res ?? false;
          if (t) {
            if (res.data.error) {
              return;
            } else {
              localStorage.setItem("accessToken", res.data.token);
              setAuthState({ LoggedUserData: res.data.userData, status: true });
            }
          }
        });
      setProfileUpdating(false)
      SetProfileUpdated(true)
      setShow(false)
    })
      ;
  };
  useEffect(() => {

    NotifyClient()
  }, [authState])
  const NotifyClient = () => {

    asyncLocalStorage.getItem("JoinedClientList").then((value) => {
      var list = JSON.parse(value)
      list.map((id) => {
        socket.emit("profile changed", {
          id: id,
          agent:
            authState.LoggedUserData.f_name +
            " " +
            authState.LoggedUserData.l_name,
          image: authState.LoggedUserData.image,
        });
      })

    });
  }

  const submit = async (values) => {
    console.log(values)

    if (PhotoChanged) {
      const formdata = new FormData();
      formdata.append("avatar", userInfo.file);
      formdata.append("UID", authState.LoggedUserData.id);
      axios
        .post(`https://${constants.host}:3001/imageupload`, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          // then print response status
          console.warn(res);
          if (res.data.success === 1) {
            UpdateHandler(values)
          }
        });
    }
    else {
      UpdateHandler(values)
    }

  };

  if (!ProfileUpdating)
    return (
      <div>
        <h3>Account Details</h3>
        <div className="row">
          <div className=" col-12">
            <div className="card">
              <div className="card-body">
                <b>
                  <h5>Account Owner</h5>
                </b>
                <div className={`${styles.accountDetailsContainer} row`}>
                  <div className="col-md-6 ">
                    <img
                      style={{
                        width: 200,
                        height: 200,
                        border: "1px solid black",
                        borderRadius: "50%",
                      }}
                      className=" img-fluid align-middle m-2"
                      src={`https://${constants.host}:3001/images/${authState.LoggedUserData.image}`}
                    />
                    {editable ? (
                      <>
                        <div className="form-row">
                          <span className="font-weight-bold">Update Image</span>
                          <input
                            type="file"
                            className="form-control "
                            name="upload_file"
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="col-md-6 ">
                    <div>
                      {editable == 0 ? (
                        <div>
                          <span className="fw-bold">User Name</span>
                          <br />
                          {authState.LoggedUserData.f_name +
                            " " +
                            authState.LoggedUserData.l_name}
                        </div>
                      ) : (
                        <>
                          <p className="mt-3 mb-0 text-primary">More Info</p>
                          <div className="mb-3">
                            <label htmlFor="">First Name</label>
                            <input
                              name='firstName'
                              className="form-control"
                              onChange={handleFormData}
                              value={profileData.firstName}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="">Last Name</label>
                            <input
                              name="lastName"
                              className="form-control"
                              onChange={handleFormData}
                              value={profileData.lastName}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    {editable == 0 ? (
                      <div>
                        {" "}
                        <span className="fw-bold">User Email</span> <br /> (
                        {authState.LoggedUserData.email})
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input
                          name="email"
                          className="form-control "
                          onChange={handleFormData}
                          value={profileData.email}
                        />
                      </div>
                    )}
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Profile Update</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Please Enter Email and password to save your Changes

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

                          </div>

                          <button
                            type="submit"
                            className={`btn btn-primary bg-primary  text-white w-100 ${styles.formText}`}
                            style={{ fontWeight: 500 }}
                          >
                            Save Changes
                          </button>
                          {ServerMsg && (
                            <p className={`${styles.successmsg}`}>{ServerMsg}</p>
                          )}
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Buttons variant="secondary" onClick={handleClose}>
                          Close
                        </Buttons>

                      </Modal.Footer>
                    </Modal>
                    <div className="my-3" style={{ display: "block" }}>
                      {editable == 1 ? (
                        <button
                          onClick={() => setShow(true)}
                          className={`my-3 p-2  ${styles.payment_save_btn}`}
                        >
                          {" "}
                          Save Changes
                        </button>
                      ) : null}
                      {editable == 1 ? (
                        <button
                          className={`${styles.cancelBtn} p-2  mx-2`}
                          onClick={() => setEditable(!editable)}
                        >
                          Cancel{" "}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                {editable == 0 ? (
                  <i
                    className="fas fa-edit float-end "
                    style={{ marginLeft: "10px" }}
                    onClick={() => setEditable(!editable)}
                  ></i>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* <div className="row">
        <div className="col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              <b>
                <h5 className="mb-3">Billing Details</h5>
              </b>
              <Button
                type="primary"
                title="Add Billing Details"
              // click={clickEvent}
              />
            </div>
          </div>
        </div>
      </div> */}
        <br />
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="card">
              <div className="card-body">
                <b>
                  <h5 className="mb-3">Cancel Account</h5>
                </b>
                <p className="mb-2">
                  You can cancel anytime and you won't be charged again. We don't
                  offer refunds for unused time in the billing cycle.
                  <br />
                </p>
                <a href="#" className="mt-4">
                  Continue to the Cancel page
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-12">
            <br />
            <Button title="Save" type={`primary`} classes="mr-2" />
            <Button title="Cancel" type="nobg" classes="mx-2" />
          </div>
        </div>
      </div>
    );
  else
    return <Loading />
};
const ProductDisplay = () => <section></section>;
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
const Subscriptions = () => {
  const [message, setMessage] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [freePrice, setFreePrice] = useState(0);
  const [freeActivate, setFreeActivated] = useState(0);

  // GENERATE RANDOM TOKEN
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  useEffect(() => {
    // GET CURRENT PLAN
    axios
      .post(`https://192.163.206.200:3001/getcurrentplan`, {
        id: authState.LoggedUserData.id,
      })
      .then((response) => {
        setFreeActivated(response.data[0].free_activated);
      });
  }, []);
  const price = {
    color: "#5CB85C",
    fontSize: "30px",
  };
  return (
    <div className="container">
      {message ? <Message message={message} /> : <ProductDisplay />}
      <h3>Subscriptions</h3>
      <p>Choose your plan</p>
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Free Trial</b>
              </h1>
              <p>Best for learning and chatting with customers.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>Free</span>
                <span>8 days</span>
              </div>
              {freeActivate == "0" ? (
                <Button title="Current Plan" type="primaryFullWidth" />
              ) : (
                <form
                  action="https://192.163.206.200:3001/create-checkout-session1"
                  method="POST"
                >
                  <Button title="Subscribe Now" type="primaryFullWidth" />
                </form>
              )}
              <br />
              <br />
              <p>Track up to 50 leads</p>
              <p>Unlimited chat history</p>
              <p>Customization</p>
              <p>Analytics</p>
            </div>
          </div>
          <br />
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Starter</b>
              </h1>
              <p>Full customization, targeting, and team management.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>$16</span>
                <span>Monthly</span>
              </div>
              <form
                action="https://192.163.206.200:3001/create-checkout-session1"
                method="POST"
                onClick={() => {
                  localStorage.setItem("paymentMethodToken", makeid(30));
                  localStorage.setItem("planId", 2);
                }}
              >
                <Button title="Subscribe Now" type="primaryFullWidth" />
              </form>
              <br />
              <br />
              <p>Track up to 200 Leads</p>
              <p>Unlimited chat history</p>
              <p>Customization</p>
              <p>Analytics</p>
              <p>Software engineer support</p>
              <p>Multiple website support</p>
              <p>LiveChat Dashboard</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <h1>
                <b>Addons</b>
              </h1>
              <p>Best for learning and chatting with customers.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={price}>10$</span>
                <span>Per lead</span>
              </div>
              <Button title="Add Now" type="primaryFullWidth" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const RightSideBar = ({ currentPage }) => {
  return currentPage == "Overview" ? (
    <Overview />
  ) : currentPage == "Subscription" ? (
    <Subscriptions />
  ) : currentPage == "editplans" ? (
    <EditPlans />
  ) : null;
};
function Setting() {
  const [currentPage, setCurrentPage] = useState("Overview");
  const changeHandler = (e) => {
    setCurrentPage(e);
  };
  return (
    <Fragment>
      <DashboardHeader title="Settings" />
      <br />
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-md-3 col-12">
            <LeftSideBar changeHandler={changeHandler} />
          </div>
          <div className="col-md-9 col-12">
            <RightSideBar currentPage={currentPage} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Setting;
