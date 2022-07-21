import React, { useState, createContext, useContext, useEffect } from "react";
import SVGS from "../../helpers/svgs";
import {
  BrowserRouter as Router,
  Link,
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom";
import styles from "./styles.module.css";
import { AuthContext } from "../../App";
const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  }
};
const UserContext = createContext();
function MainDashboard() {
  const { authState, setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ LoggedUserData: "", status: false });
    return navigate("/signin");
  };
  const [sideNav, setsideNav] = useState("d-block");
  const [SideBar, setSideBar] = useState("d-block");
  const [showActiveChat, setshowActiveChat] = useState(false)
  const [expand, setExpand] = useState(false);
  const togglerHandler = () => {
    if (sideNav === "d-block") {
      setsideNav("d-none");
    } else setsideNav("d-block");
  };
  // const [sidebar, setsidebar] = useState(true);
  const handleSidebar = () => {
    setSideBar("d-none");
  };
  useEffect(() => {

    asyncLocalStorage.getItem('selected_customer').then(value => {
      if (value) {
        setshowActiveChat(true)
      }
      else {
        setshowActiveChat(false)
      }
    })
  })

  return (
    <UserContext.Provider
      value={() => {
        if (sideNav === "d-block") {
          setsideNav("d-none");
        } else setsideNav("d-block");
      }}
    >
      <div className="container-fluid bg-grey p-0" style={{ minHeight: '100vh' }}>
        <div className="row flex-nowrap m-0 ">
          <div
            className={` ${sideNav}  ${expand ? "expand" : null
              }  text-center pt-3 sidebar  text-white ${styles.sidebar
              } col-md-3   ${SideBar}`}
          >
            <i
              onClick={() => {
                setExpand(!expand);
              }}
              className={`fas my-2 ms-auto fa-angle-double-up dashboard-toggler ${expand ? "expand" : "close"
                } `}
            ></i>
            <ul className="d-flex dashboard-nav flex-md-column border-bottom-grey justify-content-around pb-5  list-group">
              <NavLink
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinkActive} row navLinkActive   pe-3  mb-2`
                    : `${styles.navLink} row  navLink pe-3  mb-2`
                }
                to=""
              >
                <img
                  className={`${styles.iconImg} col-4 `}
                  src={SVGS.Dashboard}
                />{" "}
                <span className="col-8">Dashboard</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinkActive} row  navLinkActive pe-3  mb-2`
                    : `${styles.navLink} row navLink  pe-3  mb-2`
                }
                to="/dashboard/monitor"
              >
                <img
                  className={`${styles.iconImg} col-4 `}
                  src={SVGS.Monitor}
                />
                <span className="span col-8  ">Monitor</span>
              </NavLink>

              {
                showActiveChat ? <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLinkActive} row navLinkActive pe-3  mb-2`
                      : `${styles.navLink} row navLink  pe-3  mb-2`
                  }
                  to="/dashboard/activeChat"
                >
                  <img
                    className={`${styles.iconImg} col-4 `}
                    src={SVGS.ActiveChat}
                  />
                  <span className="col-8">Active Chat</span>
                </NavLink> : null
              }
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinkActive} row navLinkActive pe-3  mb-2`
                    : `${styles.navLink} row  navLink pe-3  mb-2`
                }
                to="/dashboard/messaging"
              >
                <img
                  className={`${styles.iconImg} col-4 `}
                  src={SVGS.Messaging}
                />
                <span className="col-8">Messaging</span>
              </NavLink>
              {authState.LoggedUserData.account_type == "owner" ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLinkActive} navLinkActive row  pe-3  mb-2`
                      : `${styles.navLink} row navLink  pe-3  mb-2`
                  }
                  to="/dashboard/users"
                >
                  <img
                    className={`${styles.iconImg} col-4 `}
                    src={SVGS.Messaging}
                  />
                  <span className="col-8">User Management</span>
                </NavLink>
              ) : null}
              {/* <li className='list-group-item my-3'>
                                <Link className='text-style-none' to={'/dashboard/products'}>
                                    Dashboard
                                </Link>
                            </li> */}
              <div className="grey-line mb-3"></div>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinkActive} navLinkActive row  pe-3  mb-2`
                    : `${styles.navLink} row navLink  pe-3  mb-2`
                }
                to="/dashboard/setting"
              >
                <img
                  className={`${styles.iconImg} col-4 `}
                  src={SVGS.Setting}
                />{" "}
                <span className="col-8">Settings</span>
              </NavLink>
              <button
                onClick={logoutHandler}
                className={`${styles.navLink}  navLink row  pe-3  mb-2 ${styles.logouttab} `}
              >
                <img className={`${styles.iconImg} col-4 `} src={SVGS.Logout} />{" "}
                <span className="col-8 text-danger">Logout</span>
              </button>
            </ul>
            {/* <ul className="d-flex pe-3 flex-column border-bottom-grey dashboard-nav justify-content-around pb-5 flex-grow-1 flex-row list-group"> */}
            {/* <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLinkActive} row  pe-3  mb-2`
                    : `${styles.navLink} row  pe-3  mb-2`
                }
                to="help"
              >
                <img className={`${styles.iconImg} col-4 `} src={SVGS.Help} />
                <span className="col-8">Help</span>
              </NavLink> */}
            {/* </ul> */}
            <div>
              <button
                onClick={logoutHandler}
                className=" text-light mt-auto"
                style={{
                  visibility: "hidden",
                  border: "0",
                  boxShadow: "0px",
                  backgroundColor: "#5CB85C",
                }}
              >
                {" "}
                Logout
              </button>
              <br />
              {/* <button onClick={()=>{
               setExpand(!expand)
              }}>Expand</button> */}
            </div>
          </div>
          <div
            className={`bg-grey  ${sideNav + "_outlet"}  ${expand ? "outlet_expand" : "outlet_closed"
              }  col px-0 bg-grey`}
            style={{ height: "100vh !important" }}
          >
            <Outlet toggler={() => alert("toggler presses")} />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
export default MainDashboard;
export { UserContext };
