import React, { Fragment, useContext, useState, useEffect } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import styles from "./styles.module.css";
import {
  MdOutlineKeyboardArrowDown,
  MdDisabledVisible,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import constants from '../../constants'
import { DiLinux } from "react-icons/di";
import { AiFillWindows } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import socket from "../../helpers/socket";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import axios from "axios";
import { tConvert } from '../../helpers/helperFunctions'
function Monitor() {
  const [ActiveCustomer, setActiveCustomer] = useState([]);
  const [UnAnsweredCustomer, setUnAnsweredCustomer] = useState([]);
  const [ServedCustomer, setServedCustomer] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [fetchingDataUnanswered, setfetchingUnanswered] = useState(false)
  const [fetchingDataActive, setfetchingActive] = useState(false)
  // get all unansered users from database
  const unAnsweredUsers = () => {
    setfetchingUnanswered(true)
    axios.get(`https://${constants.host}:3003/chats/unanswered`).then((res) => {
      setUnAnsweredCustomer([...res.data]);
      setfetchingUnanswered(false)
    });
  };
  // get all active users from database
  const ActiveUsers = () => {
    setfetchingActive(true)
    axios.get(`https://${constants.host}:3003/chats/active`).then((res) => {
      setActiveCustomer([...res.data]);
      setfetchingActive(false)
    });

  };
  useEffect(() => {

    ActiveUsers();
    unAnsweredUsers();

  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("agent active");
  });
  socket.on("NEW USER", (data) => {
    unAnsweredUsers();
  });
  // map all the active customers
  const ActiveList = ActiveCustomer.map((customer) => {
    if (authState.LoggedUserData.account_type == 'client') {
      if (authState.LoggedUserData.company_url !== customer.origin) {
        return null
      }
    }

    return (
      <ListCard
        newMessage={customer.new_message}
        key={customer.customer_id}
        id={customer.customer_id}
        country={customer.country}
        address={customer.address}
        origin={customer.origin}
        created_date={customer.created_date}
        plateform={customer.plateform}
        clickHandler={() => {
          localStorage.setItem("selected_customer", customer.customer_id);
          navigate("/dashboard/activeChat");
        }}
      />
    );
  });
  // map all the unanswered customers
  const UnAnsweredList = UnAnsweredCustomer.map((customer) => {
    if (authState.LoggedUserData.account_type == 'client') {
      if (authState.LoggedUserData.company_url !== customer.origin) {
        return null
      }
    }
    return (
      <ListCard
        newMessage={customer.new_message}
        key={customer.customer_id}
        id={customer.customer_id}
        country={customer.country}
        address={customer.address}
        origin={customer.origin}
        created_date={customer.created_date}
        plateform={customer.plateform}
        clickHandler={() => {
          socket.emit("remove chat from unanswered", customer.customer_id)
          console.log(authState)
          axios.post(`https://${constants.host}:3003/chats/status1`, {
            id: customer.customer_id,
          });
          axios.post(`https://${constants.host}:3003/chats/servedby/`, {
            chatID: customer.customer_id,
            agentID: authState.LoggedUserData.id,
            agentName:
              authState.LoggedUserData.f_name +
              " " +
              authState.LoggedUserData.l_name,
          }).then((res) => {
            localStorage.setItem("selected_customer", customer.customer_id);
            navigate("/dashboard/activeChat");
          });

        }}
      />
    );
  });
  return (
    <Fragment>
      <DashboardHeader title="Monitor" />
      <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 bg-grey ">
        <div className="row py-2">
          <div className="col-12  col-xl-11">
            {/* <div className="d-flex px-3 justify-content-between">
              <button className="btn-light-blue ">ID</button>
              <button className="btn-white  font-12 ">
                {" "}
                <img
                  className="mx-2"
                  src={require("../../assets/Images/filter.png")}
                  alt=""
                />{" "}
                Filter Visitors
              </button>
            </div> */}
            <div className="container-fluid">
              <StatusCard key={1} statusTitle="Served" statusColor="#855CF8" />
              <StatusCard
                key={2}
                statusTitle="Unanswered"
                statusColor="#F35454"
                list={
                  UnAnsweredList.length ? (
                    UnAnsweredList
                  ) : fetchingDataUnanswered ? (
                    <p className={`card ${styles.empty_list}`}>
                      Loading
                    </p>) : (
                    <p className={`card ${styles.empty_list}`}>
                      No UnAnswered Users
                    </p>
                  )
                }
              />
              <StatusCard
                key={3}
                statusTitle="Active"
                statusColor="#5CB85C"
                list={
                  ActiveList.length ? (
                    ActiveList
                  ) : (
                    <p className={`card ${styles.empty_list}`}>
                      No Active Users
                    </p>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Monitor;
const StatusCard = (props) => {
  const [listShow, setlistShow] = useState(false);
  const LIST = props.list ? props.list : <p>no users</p>;
  return (
    <div className="row mb-3" onClick={props.clickHandler}>
      <div className={`card ${styles.status_header}`}>
        <div className="d-flex align-items-center my-2">
          <div className="d-flex flex-grow-1">
            <span
              className={`${styles.status_circle}`}
              style={{ backgroundColor: props.statusColor }}
            ></span>
            <p className="mb-0 align-baseline ms-3 font-14  font-500">
              {" "}
              {props.statusTitle}
            </p>
            {/* <span className=" ms-2 ms-md-4 ms-lg-5 font-14 "> (1-1/1)</span> */}
          </div>
          <div>
            {listShow ? (
              <MdOutlineKeyboardArrowUp
                size={20}
                onClick={() => setlistShow(!listShow)}
              />
            ) : (
              <MdOutlineKeyboardArrowDown
                size={20}
                onClick={() => setlistShow(!listShow)}
              />
            )}
          </div>
        </div>
      </div>
      {listShow && LIST}
    </div>
  );
};
const ListCard = (props) => {
  const createdDate = new Date(props.created_date)
  const time = tConvert(createdDate.toLocaleTimeString())
  const date = createdDate.toLocaleDateString()
  const createddate = date + " " + time
  return (
    <div className="card border-top-0 rounded-0" onClick={props.clickHandler}>
      <div
        className="d-flex py-2 flex-wrap  align-items-center justify-content-between"
        style={{ gap: 10 }}
      >
        <button type="button" class="btn btn-light-blue position-relative">
          T
          {
            props.newMessage ? <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {props.newMessage}
              <span class="visually-hidden">unread messages</span>
            </span> : null
          }
        </button>
        <span>{props.id}</span>
        <span>{props.address}</span>
        {/* <a className="text-primary text-decoration-none" href="">
          https://linke123here/chat/210402098
        </a> */}
        <span className="text-blue text-decoration-none" >
          {props.origin}
        </span>
        <span>{createddate}</span>
        <div className="flex-shrink-0">
          {/* <span className="me-2">4</span>
          <span className="me-2">0</span> */}
          {props.plateform == '\"Windows\"' ? (
            <AiFillWindows color="#878787" size={20} className="me-2" />
          ) : (
            <DiLinux size={20} className="me-2" />
          )}
          {/* <BsFillEyeSlashFill color="#5494F3" size={20} className="me-2" />
          <MdDisabledVisible color="red" size={20} className="me-2" /> */}
          <img className="me-2 img-fluid" src={`https://countryflagsapi.com/png/${props.country}`} style={{ width: 20 }} />
        </div>
      </div>
    </div>
  );
};
