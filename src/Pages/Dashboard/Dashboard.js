import React, {
  useState,
  Fragment,
  useContext,
  useEffect,
  useRef,
} from "react";
import styles from "./styles.module.css";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import LiveVisitorsChart from "../../Components/UI/Charts/LiveVisitors/LiveVisitors";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import { AuthContext } from "../../App";
import editIcon from "../../assets/Images/edit_icon.png";
import cancelIcon from "../../assets/Images/cancel.png";
import axios from "axios";
import ReactLoading from "react-loading";
import constants from "../../constants";
import SVG from "../../helpers/svgs";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [totalLeads, settotalLeads] = useState(0);
  const [totalChats, settotalChats] = useState(0);
  const tbody = useRef();
  useEffect(() => {
    axios
      .post(`https://${constants.host}:3001/chats/leads_by_id`, {
        id: authState.LoggedUserData.id,
        client_status: "owner",
      })
      .then((res) => {
        settotalLeads(res.data);
      });
  }, [authState]);
  useEffect(() => {
    axios
      .post(`https://${constants.host}:3001/chats/chats_by_agent`, {
        id: authState.LoggedUserData.id,
        client_status: "owner",
      })
      .then((res) => {
        settotalChats(res.data);
      });
  }, [authState]);
  console.log(tbody);
  return (
    <Fragment>
      <DashboardHeader title="Dashboard" />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2">
          <div className="col-12 my-2  ">
            {/* <div className="d-flex br-3 bg-primary align-items-center px-2 justify-content-between">
              <p className=" mb-0  text-white py-2">
                Click here to resume the setup wizard.
              </p>
              <AiOutlineClose color="white" size={25} />
            </div> */}
          </div>
          <div className="col-md-8">
            <div className={`${styles.live_now} p-3`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Leads History</h1>
              </div>
              <LiveVisitorsChart />
            </div>
          </div>
          <div className="col-md-4 flex-column d-flex flex-end justify-content-end ">
            <div
              className={`${styles.visitor} container-fluid p-3 ${styles.rightBoxes}`}
            >
              <div className="row">
                <div className="col-4">
                  <img src={SVG.TotalChats} />
                </div>
                <div className="col-8">
                  <p className="mb-0">Total Chats</p>
                  <span className="fw-bold" style={{ fontSize: 20 }}>
                    {totalChats.length}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.visitor} container-fluid p-3 ${styles.rightBoxes}`}
            >
              <div className="row">
                <div className="col-4">
                  <img src={SVG.TotalLeads} />
                </div>
                <div className="col-8">
                  <p className="mb-0">Total Leads</p>
                  <span className="fw-bold" style={{ fontSize: 20 }}>
                    {totalLeads.length}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
            <div className="d-flex justify-content-between">
              <h1 className="h4 fw-bold">Chat</h1>

              <span>
                {" "}
                <span className="me-1" style={{ fontWeight: 500 }}>
                  110
                </span>{" "}
                <BiStats size={30} />
              </span>
            </div>
            <ChatChart />
          </div> */}
          </div>
          <div className="col-12">
            <div className={`${styles.live_now} mt-3 p-3`}>
              <div className="table-responsive">
                <h1 className="h4 fw-bold">Chat History</h1>
                <table className={`table text-center ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col">Visitor ID</th>
                      <th scope="col">Company URL</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                    </tr>
                  </thead>
                  <tbody ref={tbody}>
                    {totalChats
                      ? totalChats.map((el) => {
                        const startdate = new Date(el.created_date);
                        const enddate = new Date(el.end_date);
                        const options = {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        const START_DATE = startdate.toLocaleTimeString(
                          undefined,
                          options
                        );
                        const END_DATE = enddate.toLocaleTimeString(
                          undefined,
                          options
                        );
                        return (
                          <tr key={el.id}>
                            <td>{el.customer_id}</td>
                            <td>{el.origin}</td>
                            <td>{START_DATE}</td>
                            <td>{END_DATE}</td>
                          </tr>
                        );
                      })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const AgentDashboard = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [totalLeads, settotalLeads] = useState(0);
  const [totalChats, settotalChats] = useState(0);
  useEffect(() => {
    axios
      .post(`https://${constants.host}:3001/chats/leads_by_id`, {
        id: authState.LoggedUserData.id,
        client_status: "agent",
      })
      .then((res) => {
        settotalLeads(res.data);
      })
      .then(() => {
        if (!totalChats) {
          console.log("total chat zero");
          axios
            .post(`https://${constants.host}:3001/chats/chats_by_agent`, {
              id: authState.LoggedUserData.id,
              client_status: "agent",
            })
            .then((res) => {
              console.log("res.data:" + res.data);
              settotalChats(res.data);
            });
        }
      });
  }, [authState]);

  return (
    <Fragment>
      <DashboardHeader title="Dashboard" />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2">
          <div className="col-12 my-2  ">
            {/* <div className="d-flex br-3 bg-primary align-items-center px-2 justify-content-between">
              <p className=" mb-0  text-white py-2">
                Click here to resume the setup wizard.
              </p>
              <AiOutlineClose color="white" size={25} />
            </div> */}
          </div>
          <div className="col-md-8">
            <div className={`${styles.live_now} p-3`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Leads Stats</h1>
              </div>
              <LiveVisitorsChart />
            </div>
          </div>
          <div className="col-md-4 flex-column d-flex flex-end justify-content-end ">
            <div
              className={`${styles.visitor} container-fluid p-3 ${styles.rightBoxes}`}
            >
              <div className="row">
                <div className="col-4">
                  <img src={SVG.TotalChats} />
                </div>
                <div className="col-8">
                  <p className="mb-0">Total Chats</p>
                  <span className="fw-bold" style={{ fontSize: 20 }}>
                    {totalChats.length}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.visitor} container-fluid p-3 ${styles.rightBoxes}`}
            >
              <div className="row">
                <div className="col-4">
                  <img src={SVG.TotalLeads} />
                </div>
                <div className="col-8">
                  <p className="mb-0">Total Leads</p>
                  <span className="fw-bold" style={{ fontSize: 20 }}>
                    {totalLeads.length}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className={`${styles.visitor} p-3 ${styles.rightBoxes}`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Chat</h1>

                <span>
                  {" "}
                  <span className="me-1" style={{ fontWeight: 500 }}>
                    110
                  </span>{" "}
                  <BiStats size={30} />
                </span>
              </div>
              <ChatChart />
            </div> */}
          </div>
          <div className="col-12">
            <div className={`${styles.live_now} mt-3 p-3`}>
              <div className="table-responsive">
                <h1 className="h4 fw-bold">Chat History</h1>
                <table className={`table text-center ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col">Visitor ID</th>
                      <th scope="col">Company URL</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalChats &&
                      totalChats.map((el) => {
                        const startdate = new Date(el.created_date);
                        const enddate = new Date(el.end_date);
                        const options = {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        const START_DATE = startdate.toLocaleTimeString(
                          undefined,
                          options
                        );
                        const END_DATE = enddate.toLocaleTimeString(
                          undefined,
                          options
                        );
                        return (
                          <tr key={el.id}>
                            <td>{el.customer_id}</td>
                            <td>{el.origin}</td>
                            <td>{START_DATE}</td>
                            {el.is_end ? <td>{END_DATE}</td> : <td>Not End</td>}
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
    </Fragment>
  );
};

const ClientDashboard = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [remianingLeads, setremianingLeads] = useState();
  const [showPlanWarning, setshowPlanWarning] = useState(true);
  // GET ALL LEADS
  useEffect(() => {
    setLeadsLoading(true);
    axios
      .post(`https://${constants.host}:3001/getleads`, {
        c_name: authState.LoggedUserData.c_name,
      })
      .then((response) => {
        setLeads((leads) => [...response.data]);
        setLeadsLoading(false);
      });
  }, [reload]);
  useEffect(() => {
    axios
      .post(`https://${constants.host}:3001/users/remaining-leads`, {
        c_name: authState.LoggedUserData.c_name,
      })
      .catch((error) => {
        alert(error);
      })
      .then((response) => {
        setremianingLeads(response.data[0].remaining_leads);
      });
  }, [authState]);
  return (
    <Fragment>
      <DashboardHeader title="Dashboard" />
      <div className="container-fluid px-1 px-md-2 px-lg-5 bg-grey ">
        <div className="row  pb-2">
          {showPlanWarning && (
            <div className="col-12 my-2  ">
              <div className="d-flex br-3 bg-danger align-items-center px-2 justify-content-between">
                <p className=" mb-0  text-white py-2 px-4">
                  {authState.LoggedUserData.membership == "0"
                    ? "Trial Account"
                    : remianingLeads == 0
                      ? "Trial Account"
                      : ""}{" "}
                  : {remianingLeads} leads remaining.
                </p>
                <AiOutlineClose
                  onClick={() => {
                    setshowPlanWarning(false);
                  }}
                  color="white"
                  size={25}
                />
              </div>
            </div>
          )}
          <div className="col-12 my-2">
            <div className="card">
              <div className="card-body">
                <div className="row px-4">
                  <div
                    className={`col-md-6 col-12 ${styles.clientCompanyNameContainer}`}
                  >
                    <h2>
                      <b>{authState.LoggedUserData.c_name}</b>
                    </h2>
                  </div>
                  <div
                    className={`col-md-6 col-12 ${styles.clientNameContainer}`}
                  >
                    <h2>
                      <b>
                        {authState.LoggedUserData.f_name +
                          " " +
                          authState.LoggedUserData.l_name}
                      </b>
                    </h2>
                  </div>
                </div>
                <div className="row px-4">
                  <div className="col-md-6 col-12">
                    <div className={`${styles.subAndLeadRow}`}>
                      <p>
                        Subscription:{" "}
                        {authState.LoggedUserData.membership == "0"
                          ? "Trial Account"
                          : remianingLeads == 0
                            ? "Trial Account"
                            : "Pro Member"}
                      </p>
                      <p>Leads: {remianingLeads}</p>
                    </div>
                    <p className={`${styles.clientSiteLink}`}>
                      <a
                        href={authState.LoggedUserData.company_url}
                        target="_blank"
                      >
                        {authState.LoggedUserData.company_url}
                      </a>
                    </p>
                  </div>
                  <div
                    className={`col-md-6 col-12 ${styles.clientCardButtonsContainer}`}
                  >
                    {remianingLeads == 0 ? (
                      <Link
                        to="/dashboard/setting"
                        className="btn btn-primary"
                        style={{ height: "40px" }}
                      >
                        Upgrade
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className={`${styles.live_now} p-3`}>
              <div className="d-flex justify-content-between">
                <h1 className="h4 fw-bold">Leads</h1>
                <button className={` px-2 ${styles.live_now_btn}`}>
                  <span>
                    {" "}
                    <AiOutlineCalendar />{" "}
                  </span>
                  Leads History
                </button>
              </div>
              <LiveVisitorsChart />
            </div>
            <h1 className="h4 fw-bold px-4 pt-4">Leads</h1>
            <div className="d-flex align-items-center">
              <button
                className="btn-primary"
                onClick={() => {
                  setReload(!reload);
                }}
              >
                Refresh
              </button>
              {leadsLoading ? (
                <ReactLoading
                  type="spin"
                  color="black"
                  height={30}
                  width={30}
                />
              ) : null}
            </div>

            <div className={`${styles.live_now} mt-3 p-3`}>
              <div className="table-responsive">
                <table className={`table text-center ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope="col badge badge-curious-bold">
                        <span className="badge badge-curious-bold">ID</span>
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Agent</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsLoading === true
                      ? "Loading"
                      : leads.map((element) => {
                        return (
                          <tr key={element.id} className="pt-2">
                            <td>
                              <span className="badge badge-curious-bold">
                                {element.id}
                              </span>
                            </td>
                            <td>
                              <p className="px-3 py-0">{element.lead_name}</p>
                            </td>
                            <td>{element.lead_email}</td>
                            <td>{element.lead_phone}</td>
                            <td>{element.agent_name}</td>
                            <td>{element.date}</td>
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
    </Fragment>
  );
};

function Content() {
  const { authState, setAuthState } = useContext(AuthContext);
  return authState.LoggedUserData.account_type == "client" ? (
    <ClientDashboard />
  ) : authState.LoggedUserData.account_type == "owner" ? (
    <OwnerDashboard />
  ) : (
    <AgentDashboard />
  );
}
export default Content;
