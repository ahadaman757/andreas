import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
  memo
} from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { FaUser } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillSave, AiFillInfoCircle } from "react-icons/ai";
import styles from "./styles.module.css";
import colors from "../../../src/assets/Constants/ui_constants";
import { DiLinux } from "react-icons/di";
import { GrNote } from "react-icons/gr";
import { AiFillWindows, AiFillPrinter, AiFillAndroid } from "react-icons/ai";
import { MdOutlineContentCut } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import socket from "../../helpers/socket";
import { AuthContext } from "../../App";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { tConvert } from "../../helpers/helperFunctions";
import "./styles.css";
import { useFormik } from "formik";
import constants from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};


function ActiveChat(props) {

  const loc = useLocation()
  console.log(loc.pathname)
  const [othersChat, setothersChat] = useState(false);
  const [customerID, setcustomerID] = useState("");
  const [chatData, setchatData] = useState("");
  const [allMessages, setallMessages] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [currentAgentMessage, setcurrentAgentMessage] = useState("");
  const [agentName, setagentName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loggedAgent, setloggedAgent] = useState("");
  const [chatEnd, setchatEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  // handle lead form


  const formik = useFormik({
    initialValues: {
      agent: loggedAgent,
      customer_name: "",
      c_name: "",
      email: "",
      phone: "",
      company_url: "",
      agent_id: authState.LoggedUserData.id,
    },
    onSubmit: (values) => {
      setLoading(true);
      values.agent = loggedAgent;
      values.company_url = chatData.origin;
      const date = new Date();
      const month = date.getMonth() + 1;
      const inputDate = date.getFullYear() + "-" + month + "-" + date.getDate();
      // check whether to add leads or not
      axios
        .post(`https://${constants.host}:3001/users/remaining-leads`, {
          c_name: values.c_name,
        })
        .then((res) => {
          if (res.data[0].remaining_leads > 0) {
            axios
              .post(`https://${constants.host}:3001/chats/addleads`, {
                ...values,
                date: inputDate,
                chat: JSON.stringify(allMessages),
              })
              .catch((error) => {
                setLoading(false);
                if (error) {
                  toast.error(`Error:Lead Not Added`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              })
              .then((addLeadResponse) => {
                setLoading(false);
                
                if (addLeadResponse.data.status) {
                  formik.resetForm()
                  toast.success("🦄 Lead Added", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              });
          } else
            toast.error(`Cant Add More Leads for this Company`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        });
    },
  });
  // match agent to show message area
  useEffect(() => {
    if (authState.LoggedUserData.f_name && authState.LoggedUserData.l_name) {
      const curretUser =
        authState.LoggedUserData.f_name?.toUpperCase() +
        " " +
        authState.LoggedUserData.l_name?.toUpperCase();
      setloggedAgent(curretUser);
      if (chatData.served_by != authState.LoggedUserData.id) {
        setothersChat(true);
      } else {
        setothersChat(false);
      }
    }
  });
  // fetch all messages handler
  const LoadMessagesHandler = () => {
    if (customerID)
      axios
        .post(`https://${constants.host}:3001/chats/messages`, { id: customerID })
        .then((response) => {
          const messages = response.data;
          // push all messages from database to all messages state
          setallMessages((prev) => [...messages]);
        })
        .then(() => {
          axios
            .post(`https://${constants.host}:3001/chats/markchatRead`, {
              id: customerID,
            })
            .then((res) => {
              console.log("marked messages read successfully");
            });
        });
  };
  const AgentMessageHandler = () => {
    // setallMessages([...allMessages, { source: 'agent', message: currentAgentMessage, }])
    socket.emit("NEW_MESSAGE", {
      id: customerID,
      message: currentAgentMessage,
    });
    axios
      .post(`https://${constants.host}:3001/chats/addmessage`, {
        id: customerID,
        message: currentAgentMessage,
      })
      .then((response) => {
        LoadMessagesHandler();
      });
    setcurrentAgentMessage("");
  };
  useEffect(() => {
    asyncLocalStorage.getItem("selected_customer").then((value) => {
      setcustomerID(value);
      // Get record for   about the chat
      axios
        .post(`https://${constants.host}:3001/chats/chat`, { id: value })
        .then((response) => {
          setchatData(response.data[0]);
          if (response.data[0].is_end) {
            setchatEnd(true);
          }
          // get agent info for this active chat
        });
      socket.emit("join room", {
        id: value,
        agent:
          authState.LoggedUserData.f_name +
          " " +
          authState.LoggedUserData.l_name,
        image: authState.LoggedUserData.image,
      });
    });
  }, []);
  useEffect(() => {
    chatData &&
      axios
        .post(`https://${constants.host}:3001/chats/agent`, {
          id: chatData.served_by,
        })
        .then((res) => {
          setagentName(
            res.data.f_name?.toUpperCase() +
            " " +
            res.data.l_name?.toUpperCase()
          );
        })
        .catch((error) => {
          alert(error);
        });
  });
  // get all messages from database on first render
  useEffect(() => {
    LoadMessagesHandler();
  }, [customerID]);
  useEffect(() => {
    chatarea.current.scrollTop =
      chatarea.current.scrollHeight - chatarea.current.clientHeight;
  });
  useEffect(() => {
    const companyOptions = [];
    axios.get(`https://${constants.host}:3001/chats/companies`).then((res) => {
      res.data.map((company) => {
        companyOptions.push({ value: company.c_name, label: company.c_name });
      });
      setCompanies((pre) => [...pre, ...companyOptions]);
    });
  }, []);
  useEffect(() => {
    return () => {
      // Store All Messages on UnMounting
    };
  }, []);
  const chatarea = useRef();
  useEffect(() => {
    socket.on("NEW MESSAGE", (msg) => {
      console.log("socket.id" + socket.id)
      const time = new Date()
      console.log("new message arrived")
      setallMessages(pre => {
        return [...pre, { message: msg, date: time, id: msg, source: "customer", id: time },]
      })
      // LoadMessagesHandler()
    });
  }, [socket])
  socket.on("LEAVE ROOM", () => {
    setchatEnd(true);
  });
  return (
    <Fragment>
      <DashboardHeader title="ActiveChat" />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2">
          <div className="   col-md-8">
            <div className="card mt-9 mb-9">
              <div className="d-flex  py-9 px-13 justify-content-between">
                <div className="d-flex   flex-grow-1" style={{ gap: 10 }}>
                  <ToastContainer />
                  {agentName ? <span className="font-500 font-18">{agentName}</span> : <span className="font-500 font-18">Loading</span>}
                </div>
                <div className="d-flex flex-grow-1">
                  <span className="font-18">
                    {/* {chatData.created_date.slice(11,-5)} */}
                  </span>
                </div>
              </div>
            </div>
            <div className="card pb-4 px-9 mt-0">
              <div className={`${styles.chatarea}`} ref={chatarea}>
                {allMessages.map((message, index) => {
                  if (message.source == "customer") {
                    return (
                      <MessageBoxClient
                        key={message.date}
                        id={customerID}
                        message={message.message}
                        time={message.date}
                      />
                    );
                  } else if (message.source == "Agent") {
                    return (
                      <MessageBoxAgent
                        key={message.date}
                        agentName={agentName}
                        message={message.message}
                      />
                    );
                  }
                })}
              </div>
              {!othersChat && !chatEnd ? (
                <div
                  className="msg_area flex-wrap d-flex mt-3"
                  style={{ gap: 20 }}
                >
                  <div className="d-flex " style={{ flexGrow: 10 }}>
                    <textarea
                      onKeyPress={(event) => {
                        if (event.key == "Enter") {
                          AgentMessageHandler();
                        }
                      }}
                      value={currentAgentMessage}
                      placeholder="Type Here.."
                      className="w-100 active-chat-msg-area"
                      onChange={(e) => {
                        setcurrentAgentMessage(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className=" d-flex  flex-column"
                    style={{ gap: 10, flexGrow: 2 }}
                  >
                    <button
                      className=" py-3 btn-grey-action"
                      onClick={() => {
                        AgentMessageHandler();
                      }}
                    >
                      Message
                    </button>
                    {/* <button className=" py-3 btn-grey-action">Whisper</button> */}
                  </div>
                </div>
              ) : null}
              {chatEnd ? (
                <div className="bg-secondary text-white px-3 py-2 mx-3 rounded-bottom">
                  Customer Has Ended this Chat
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-4">
            {!othersChat ? (
              <div className="card  mt-9">
                <Tabs
                  defaultActiveKey="details"
                  id="uncontrolled-tab-example"
                  className="mb-3 active-chat-tabs"
                  onSelect={(event, e) => { }}
                >
                  <Tab
                    eventKey="details"
                    title={
                      <>
                        {" "}
                        {<BsFillInfoCircleFill className="icon" size={20} />}
                        <span className="ms-2 text"> Details </span>
                      </>
                    }
                  >
                    <div className={`${styles.details_body}`}>
                      <div className={`${styles.details_field_card}  bg-grey`}>
                        <span>{chatData.customer_id}</span>
                        <span color={colors.colors.green}>
                          <AiFillSave />
                        </span>
                      </div>
                      <div className={`${styles.details_field_card} bg-grey`}>
                        <span>Visiter Email</span>
                        <span color={colors.colors.green}>
                          <AiFillSave />
                        </span>
                      </div>
                      <div className={`${styles.details_field_card} bg-grey`}>
                        <span>{`${chatData.city} ${chatData.country}`}</span>
                        <span color={colors.colors.green}>
                          {chatData.address}
                        </span>
                      </div>
                      <div className={`${styles.details_field_card} bg-grey`}>
                        <span>Plateform</span>
                        <span>
                          {chatData.plateform === '"Windows"' ? (
                            <AiFillWindows color="#878787" size={20} />
                          ) : chatData.plateform === '"Android"' ? (
                            <AiFillAndroid size={20} />
                          ) : (
                            <DiLinux size={20} />
                          )}
                        </span>
                      </div>
                      <div className="d-flex flex-column" style={{ gap: 10 }}>
                        <div
                          className="d-flex align-items-center "
                          style={{ gap: 10 }}
                        >
                          <button className="btn-light-blue py-1">
                            {chatData.created_date && chatData.created_date}
                          </button>
                          <span>Chat Started</span>
                        </div>
                        <div
                          className="d-flex flex-wrap align-items-center "
                          style={{ gap: 10 }}
                        >
                          {/* <button className="btn-light-blue py-1">
                                                </button> */}
                          <span className="font-12">
                            Visitor navigated to <br />
                            {/* <a className='font-12 blue-link text-blue text-decoration-none' href="">
                                                        https://linke123here/chat/
                                                        210402098
                                                    </a> */}
                          </span>
                        </div>
                        <div className="d-flex " style={{ gap: 10 }}>
                          <IoIosArrowForward />
                          <a
                            style={{ color: "#5494F3" }}
                            className="font-12 blue-link text-blue text-decoration-none"
                            href=""
                          >
                            {chatData.origin}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    eventKey="leads"
                    title={
                      <>
                        {" "}
                        {<FaUserPlus className="me-2" />}
                        <span className="text m">Leads</span>{" "}
                      </>
                    }
                  >
                    <div>
                      <Card>
                        <form onSubmit={formik.handleSubmit} method="post">
                          <Card.Body>
                            <div className="mb-3">
                              <label htmlFor="c_name" className="form-label">
                                Company Name
                              </label>
                              <select
                                id="c_name"
                                name="c_name"
                                onChange={formik.handleChange}
                                value={formik.values.c_name}
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option>Open this select menu</option>
                                {companies.map((c) => {
                                  return (
                                    <option key={c.value} value={c.value}>
                                      {c.label}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Customer Name
                              </label>
                              <input
                                type="text"
                                placeholder="John Doe."
                                className="form-control"
                                id="customer_name"
                                name="customer_name"
                                onChange={formik.handleChange}
                                value={formik.values.customer_name}
                                disabled={loading}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Customer Email
                              </label>
                              <input
                                type="email"
                                placeholder="john@gmail.com"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                disabled={loading}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Customer Mobile Number
                              </label>
                              <input
                                type="phone"
                                placeholder="+1 456 ... ...."
                                className="form-control"
                                id="phone"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                disabled={loading}
                              />
                            </div>
                          </Card.Body>
                          <Card.Footer className="d-flex justify-content-between">
                            <Button type="button" style={{ border: 0 }} variant="secondary" onClick={() => {
                              formik.resetForm()
                            }}>
                              Cancel
                            </Button>
                            <button
                              type="submit"
                              className={`text-decoration-none ${styles.payment_save_btn}`}
                              variant="secondary"
                              disabled={loading}
                            >
                              { loading === true ? 'Adding, Please wait...' : "Add Lead" }
                            </button>
                          </Card.Footer>
                        </form>
                      </Card>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default ActiveChat;
const MessageBoxClient = memo((props) => {
  const { time } = props;
  const localtime = new Date(time);
  const messageTime =
    localtime.getHours() +
    ":" +
    localtime.getMinutes() +
    ":" +
    localtime.getSeconds();
  const converted = tConvert(messageTime);
  const messageDate =
    localtime.getDate() +
    "  " +
    localtime.toLocaleString("default", { month: "long" }) +
    " " +
    localtime.getFullYear();
  return (
    <div className="msg mt-4 pt-15 dotted-border-top">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center" style={{ gap: 15 }}>
          <span>
            <FaUser color={colors.colors.green} />
          </span>
          <span style={{ color: colors.colors.green }}>{props.id}</span>
        </div>
        <div className="span text-primary">
          {messageDate}
          <br />
          {converted}
        </div>
      </div>
      <p className="mt-2 font-16 fw-300">{props.message} </p>
    </div>
  );
});
const MessageBoxAgent = (props) => {
  return (
    <div className="msg mt-4 pt-15 dotted-border-top">
      <div className="d-flex">
        <div className="d-flex align-items-center" style={{ gap: 15 }}>
          <span className="font-500">{props.agentName}</span>
        </div>
      </div>
      <p className="mt-2 font-16 fw-300">{props.message} </p>
    </div>
  );
};
