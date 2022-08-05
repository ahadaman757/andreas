import React, { Fragment, useContext, useState, useEffect, memo } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import styles from "./styles.module.css";
import constants from '../../constants'
import { DiLinux } from "react-icons/di";
import { BiSort } from "react-icons/bi";
import { AiFillWindows } from "react-icons/ai";
import { BsFillEyeSlashFill, BsApple } from "react-icons/bs";
import { FcPhoneAndroid } from "react-icons/fc";
import { socket } from "../../App";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import axios from "axios";
import { tConvert } from '../../helpers/helperFunctions'
import { asyncLocalStorage } from '../../helpers/helperFunctions';
import useSort from "../../hooks/useSortLatest";
import regionNames from "../../hooks/useCountryName";

function Monitor() {

  const { Ascending, toggleAscending } = useSort(false)
  const [ActiveCustomer, setActiveCustomer] = useState([]);
  const [UnAnsweredCustomer, setUnAnsweredCustomer] = useState([]);
  // const [ServedCustomer, setServedCustomer] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [fetchingDataUnanswered, setfetchingUnanswered] = useState(false)
  const [fetchingDataActive, setfetchingActive] = useState(false)
  const [eventFired, seteventFired] = useState('')
  // get all unansered users from database
  const unAnsweredUsers = (cancelToken) => {
    setfetchingUnanswered(true)
    axios.get(`https://${constants.host}:3001/chats/unanswered`, { cancelToken: cancelToken }).then((res) => {
      setUnAnsweredCustomer([...res.data]);
      setfetchingUnanswered(false)
      console.log("axios received")
    }).catch(error => {
      console.log("catch eror:" + error)
    })
  };
  useEffect(() => {
    const myArray = UnAnsweredCustomer.filter(function (obj) {
      console.log(obj)
      console.log("id:" + eventFired)
      return obj.customer_id != eventFired;
    });
    setUnAnsweredCustomer([...myArray])
  }, [eventFired])
  // get all active users from database
  // const ActiveUsers = () => {
  //   socket.on("chat with id joined", (id) => {
  //     seteventFired(id)
  //   })
  //   setfetchingActive(true)
  //   axios.get(`https://${constants.host}:3001/chats/active`).then((res) => {
  //     setActiveCustomer([...res.data]);
  //     setfetchingActive(false)
  //   });
  // };
  useEffect(() => {
    const ourRequest = axios.CancelToken.source() // <-- 1st step
    // ActiveUsers();
    console.log("useefect empty")
    unAnsweredUsers(ourRequest.token);
    return () => {
      console.log("unmounted useeffect")
      ourRequest.cancel() // <-- 3rd step
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.LoggedUserData.account_type === 'agent')
      socket.emit("agent active")


  });
  useEffect(() => {
    const ourRequest = axios.CancelToken.source() // <-- 1st step

    console.log("socket:" + socket)
    socket.on("NEW USER", (data) => {
      unAnsweredUsers(ourRequest.token);
    });
    return () => {
      console.log("unmounted")
      ourRequest.cancel() // <-- 3rd step
    }
  }, [socket])
  // map all the active customers
  // const ActiveList = ActiveCustomer.map((customer) => {
  //   if (authState.LoggedUserData.account_type == 'client') {
  //     if (authState.LoggedUserData.company_url !== customer.origin) {
  //       return null
  //     }
  //   }
  //   return (
  //     <ListCard
  //       newMessage={customer.new_message}
  //       key={customer.customer_id}
  //       id={customer.customer_id}
  //       country={customer.country}
  //       address={customer.address}
  //       origin={customer.origin}
  //       created_date={customer.created_date}
  //       plateform={customer.plateform}
  //       clickHandler={() => {
  //         localStorage.setItem("selected_customer", customer.customer_id);
  //         navigate("/dashboard/activeChat");
  //       }}
  //     />
  //   );
  // });
  // map all the unanswered customers
  const UnAnsweredList = Ascending ? (UnAnsweredCustomer.map((customer) => {
    if (authState.LoggedUserData.account_type == 'client') {
      if (authState.LoggedUserData.company_url !== customer.origin) {
        return null
      }
    }
    return (
      <ListCard
        db_ID={customer.id}
        newMessage={customer.new_message}
        key={customer.customer_id}
        id={customer.customer_id}
        country={customer.country}
        address={customer.address}
        origin={customer.origin}
        created_date={customer.created_date}
        plateform={customer.plateform}
        clickHandler={() => {
          axios.post('https://192.163.206.200:3001/chats/checkchat', { id: customer.id }).then(res => {
            if (res.data[0].served_by > 0) {
              console.log(res.data[0].served_by)
              alert("already joined")
            }
            else {
              socket.emit("remove chat from unanswered", customer.customer_id)
              console.log(authState)
              axios.post(`https://${constants.host}:3001/chats/status1`, {
                id: customer.customer_id,
              });
              axios.post(`https://${constants.host}:3001/chats/servedby/`, {
                chatID: customer.customer_id,
                agentID: authState.LoggedUserData.id,
                agentName:
                  authState.LoggedUserData.f_name +
                  " " +
                  authState.LoggedUserData.l_name,
              }).then((res) => {
                console.log(res)
                asyncLocalStorage.getItem('JoinedClientList').then(response => {
                  console.log(response)
                  if (!response) {
                    var list = []

                    list.push(customer.customer_id)
                    asyncLocalStorage.setItem('JoinedClientList', JSON.stringify(list))
                  }
                  else {
                    var list = JSON.parse(response)
                    list.push(customer.customer_id)

                    asyncLocalStorage.setItem('JoinedClientList', JSON.stringify(list))
                  }


                })
                localStorage.setItem("selected_customer", customer.customer_id);

                navigate("/dashboard/activeChat");
              });
            }
          })
        }}
      />
    );
  })) : (UnAnsweredCustomer.slice(0).reverse().map((customer) => {
    if (authState.LoggedUserData.account_type == 'client') {
      if (authState.LoggedUserData.company_url !== customer.origin) {
        return null
      }
    }
    return (
      <ListCard
        db_ID={customer.id}
        newMessage={customer.new_message}
        key={customer.customer_id}
        id={customer.customer_id}
        country={customer.country}
        address={customer.address}
        origin={customer.origin}
        created_date={customer.created_date}
        plateform={customer.plateform}
        clickHandler={() => {
          axios.post('https://192.163.206.200:3001/chats/checkchat', { id: customer.id }).then(res => {
            if (res.data[0].served_by > 0) {
              console.log(res.data[0].served_by)
              alert("already joined")
            }
            else {
              socket.emit("remove chat from unanswered", customer.customer_id)
              console.log(authState)
              axios.post(`https://${constants.host}:3001/chats/status1`, {
                id: customer.customer_id,
              });
              axios.post(`https://${constants.host}:3001/chats/servedby/`, {
                chatID: customer.customer_id,
                agentID: authState.LoggedUserData.id,
                agentName:
                  authState.LoggedUserData.f_name +
                  " " +
                  authState.LoggedUserData.l_name,
              }).then((res) => {
                console.log(res)
                asyncLocalStorage.getItem('JoinedClientList').then(response => {
                  console.log(response)
                  if (!response) {
                    var list = []

                    list.push(customer.customer_id)
                    asyncLocalStorage.setItem('JoinedClientList', JSON.stringify(list))
                  }
                  else {
                    var list = JSON.parse(response)
                    list.push(customer.customer_id)

                    asyncLocalStorage.setItem('JoinedClientList', JSON.stringify(list))
                  }


                })
                localStorage.setItem("selected_customer", customer.customer_id);

                navigate("/dashboard/activeChat");
              });
            }
          })
        }}
      />
    );
  }));
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
              {/* <StatusCard key={1} statusTitle="Served" statusColor="#855CF8" /> */}
              <h1>New Chats</h1>

              <StatusCard
                toggleAscending={toggleAscending}
                Ascending={Ascending}
                key={2}
                statusTitle="Unanswered"
                statusColor="#F35454"
                list={
                  UnAnsweredList.length ? (
                    <div className="table-responsive-lg " style={{ padding: 0 }}>
                      <table className={`${styles.messageingTable} table `}
                        style={{ maxWidth: "100%" }}>
                        <thead>
                          <tr>
                            <th>
                              <span className="badge badge-curious-bold">ID</span>
                            </th>
                            <th>Visitor ID</th>
                            <th>IP Address</th>
                            <th>Company Website</th>
                            <th>Date</th>
                            <th>OS/State</th>
                          </tr>
                        </thead>
                        {UnAnsweredList}

                      </table> </div>) : fetchingDataUnanswered ? (
                        <p className={`card ${styles.empty_list}`}>
                          Loading
                        </p>) : (
                    <p className={`card ${styles.empty_list}`}>
                      No UnAnswered Users
                    </p>
                  )
                }
              />
              {/* <StatusCard
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
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Monitor;
const StatusCard = (props) => {
  const [listShow, setlistShow] = useState(true);
  const LIST = props.list ? props.list : <p>no users</p>;
  return (
    <div className="row mb-3" >
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
            {/* {listShow ? (
              <MdOutlineKeyboardArrowUp
                size={20}
                onClick={() => setlistShow(!listShow)}
              />
            ) */}
            {
              props.Ascending ? <span className="fw-bold text-primary">Oldest First</span> : <span className="fw-bold text-primary">Latest First</span>
            }

            <BiSort onClick={() => props.toggleAscending()} size={20} className="me-2 ms-2 pointer" />
          </div>
        </div>
      </div>
      {listShow && LIST}
    </div>
  );
};
const ListCard = memo((props) => {
  const createdDate = new Date(props.created_date)
  const time = tConvert(createdDate.toLocaleTimeString())
  const date = createdDate.toLocaleDateString()
  const createddate = date + " " + time
  return (
    <tr className=" border-top-0 rounded-0" onClick={props.clickHandler}>

      <td>
        <button type="button" className="btn btn-light-blue position-relative">
          <span className="badge badge-curious-bold">
            {props.db_ID}
          </span>
          {
            props.newMessage ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {props.newMessage}
              <span className="visually-hidden">unread messages</span>
            </span> : null
          }
        </button>
      </td>
      <td>
        <span>{props.id}</span>
      </td>

      <td>
        <span>{props.address}</span>
      </td>
      <td>
        <span className="text-blue text-decoration-none" >
          {props.origin}
        </span>
      </td>
      <td>
        <span>{createddate}</span>
      </td>
      <td>
        <div className="flex-shrink-0" title={props.plateform}>
          {/* <span className="me-2">4</span>
          <span className="me-2">0</span> */}
          {props.plateform.includes("Windows") ? (
            <AiFillWindows color="#878787" size={20} className="me-2" />
          ) : props.plateform.includes("Android") ? <FcPhoneAndroid size={20} className="me-2" /> : props.plateform.includes("Mac") ? <BsApple size={20} className="me-2" /> : (
            props.plateform.includes("Linux") ? <DiLinux size={20} className="me-2" /> : 'N/A'
          )}
          {/* <BsFillEyeSlashFill color="#5494F3" size={20} className="me-2" />
          <MdDisabledVisible color="red" size={20} className="me-2" /> */}

          /<img title={regionNames.of(`${props.country}`)} className="me-2 img-fluid" src={`https://countryflagsapi.com/png/${props.country}`} style={{ width: 20 }} />
        </div>
      </td>


    </tr>
  );
});
