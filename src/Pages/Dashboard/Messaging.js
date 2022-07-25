import React, { Fragment, useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import axios from "axios";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
function Messaging() {
  const navigate = useNavigate()
  const { authState, setAuthState } = useContext(AuthContext);
  //end
  const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const [chatList, setchatList] = useState([])
  const [searchItem, setsearchItem] = useState("")
  // GET All CHAT DATA FROM DATABASE
  useEffect(() => {
    axios.post(`https://192.163.206.200:3001/chats/chats_by_agent`, { id: authState.LoggedUserData.id, client_status: authState.LoggedUserData.account_type, company_url: authState.LoggedUserData.company_url }).then(response => {
      setchatList((pre) => {
        console.log(response.data)
        return [...response.data]
      })
    })
  }, [authState])
  function compare(a, b) {
    if (a.is_end < b.is_end) {
      return -1;
    }
    if (a.is_end > b.is_end) {
      return 1;
    }
    return 0;
  }
  const getAllList = () => {
    axios.post(`https://192.163.206.200:3001/chats/chats_by_agent`, { id: authState.LoggedUserData.id, client_status: authState.LoggedUserData.account_type }).then(response => {
      setchatList((pre) => {
        console.log(response)
        return [...response.data]
      })
    })
  }
  const sortListDescending = () => {
    let sortList = chatList.sort((a, b) => {
      let da = new Date(a.created_date),
        db = new Date(b.created_date);
      return db - da
    })
    setchatList(pre => [...sortList])
  }
  const handlesortBy = (e) => {
    switch (e.target.value) {
      case 'date':
        sortListDescending()
        break;
      case 'status':
        const list = chatList.sort(compare)
        setchatList(pre => [...list])
        break;
      default:
        getAllList()
        // alert('other')
        // code block
        break;
    }
  }
  return (
    <Fragment>
      <DashboardHeader title='Messaging' />
      <div className="container-fluid  px-1 px-md-2 ps-lg-4 pe-lg-5 ">
        <div className="row px-1  py-2">
          <div className="col-12 col-xl-11">
            <div className="container-fluid mx-0 mx-md-3">
              <div className="row d-flex flex-wrap align-items-center my-3">
                <div
                  className="col-md-6 d-flex flex-wrap align-items-center"
                  style={{ gap: 40 }}
                >
                  <div
                    className="d-flex  align-items-center"
                    style={{ gap: 15 }}
                  >
                    <input
                      style={{ height: 33 }}
                      type="search"
                      className="form-control   rounded"
                      placeholder="Search By username/ID"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      onChange={(e) => setsearchItem(e.target.value)}
                      id="myInput"
                    />
                    <span
                      style={{ height: 33 }}
                      className="input-group-text px-4  bgMountainMeadow  border-0"
                      id="search-addon"
                    >
                      <i className="fas text-white fa-search"></i>
                    </span>
                  </div>
                </div>
                <div
                  className="col-md-5 d-flex flex-grow-1 justify-content-end align-items-center"
                  style={{ gap: 15 }}
                >
                  <span className="text-grey me-2">
                    {/* <MdKeyboardArrowDown className="ms-1" /> */}
                    <label>Sort by:</label>
                    <select onChange={(e) => handlesortBy(e)} defaultValue='default' className={`ms-1 ${styles.sortBydropdown}`} name="sortby" id="sortBy">
                      <option value="default">All</option>
                      <option onSelect={sortListDescending} value="date">Date</option>
                      <option value="status">Activity</option>
                    </select>
                  </span>
                  {/* <button className="btn-white    font-12 ">
                    {" "}
                    <img
                      className="mx-2"
                      src={require("../../assets/Images/filter.png")}
                      alt=""
                    />{" "}
                    Filter Visitors
                  </button> */}
                </div>
              </div>
              <div className={`row `}>
                <div className="col-12 table-responsive-lg">
                  <table
                    className={`${styles.messageingTable} table `}
                    style={{ maxWidth: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <span className=" badge badge-curious-bold">ID</span>
                        </th>
                        <th>Visitor ID</th>
                        <th>Messages</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th>Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chatList.filter((val) => {
                        console.log(val)
                        if (searchItem == '') return val
                        else if (val.agent_name?.toLowerCase().includes(searchItem.toLowerCase()) || val.id.toString().includes(searchItem)) {
                          return val
                        }
                      }).map((chat) => {

                        const chat_started = new Date(chat.created_date)
                        let showDate = chat_started.toLocaleDateString()
                        return (
                          <tr onClick={() => {
                            localStorage.setItem("selected_customer", chat.customer_id);
                            navigate("/dashboard/activeChat");
                          }} key={chat.id}>
                            <td>
                              <span className="badge badge-curious-bold">
                                {chat.id}
                              </span>
                            </td>
                            <td>{chat.customer_id}</td>
                            <td>{`${chat.count} Messages`}</td>
                            <td>
                              <span className="badge badge-grey-light-bold ">
                                {chat.agent_name}
                              </span>
                            </td>
                            <td>{showDate}</td>
                            <td>
                              {chat.is_end ? (
                                <span className="badge badge-grey-light-bold ">
                                  Closed
                                </span>
                              ) : (
                                <span className="badge bg-success ">open</span>
                              )}
                            </td>
                            <td>
                              <img
                                src={require("../../assets/Images/chatimg.png")}
                                alt=""
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Messaging;
