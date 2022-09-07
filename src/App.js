import React, { createContext, useState, useEffect } from "react";
import Home from "../src/Pages/Home/index";
import SignIn from "../src/Pages/SignIn/SignIn";
import SignUp from "../src/Pages/SignUp/SignUp";
import MainDashboard from "./Pages/Dashboard/main";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import DashboardContent from "./Pages/Dashboard/Dashboard";
import Monitor from "./Pages/Dashboard/Monitor";
import ActiveChat from "./Pages/Dashboard/ActiveChat";
import Messaging from "./Pages/Dashboard/Messaging";
import axios from "axios";
import useSound from 'use-sound'
import Loading from "../src/Pages/Loading/Loading";
import Setting from "./Pages/Dashboard/Setting";
import UserManagement from "./Pages/Dashboard/UserManagement";
import constants from "../src/constants";
import PaymentSuccess from "./Pages/Dashboard/PaymentSuccess";
import PaymentSuccessFull from "./Pages/Dashboard/PaymentSuccessful";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { io } from "socket.io-client";
import mySound from './assets/audio/Message Tone.mp3'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactUs from '../src/Pages/contact-us/ContactUs'
import AboutUs from "./Pages/about-us/AboutUs";
import Expiredpackage from './Components/ExpiredPackage/ExpiredPackage'

var socket = io(`https://${constants.host}:3001`, {
  transports: ["websocket"],
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
console.log(socket)
const AuthContext = createContext("");
function App() {

  const [playSound] = useSound(mySound)
  const loc = useLocation()
  console.log("location:" + loc.pathname)
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    LoggedUserData: '',
    status: false,

  });

  const [loading, setloading] = useState(true);
  const [pageLoaded, setpageLoaded] = useState(true);
  console.log(authState.LoggedUserData);

  useEffect(() => {

    socket.onAny(e => {
      switch (e) {
        case 'new Message':
          return null
          break;
        case 'room joined':
          return null
          break;
        case 'NEW USER':
          toast.success(`Message from New Customer`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        case 'NEW MESSAGE':
          toast.success(`New Message from Customer`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        default:
        // code block
      }
      if (e == 'new Message')
        return null
      if (e == 'room joined')
        return null

    })
  }, [socket])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../../chat-module/chat.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  // console.log("expired" + authState.LoggedUserData.paid)
  useEffect(() => {
    setpageLoaded(false)
    console.log("requesting")
    axios
      .get(`https://${constants.host}:3001/profile`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // https.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
      .then((response) => {
        if (response) {
          setloading(false);
          if (response.data.error) {
            setAuthState(false);
          } else {
            console.log(response.data);
            setAuthState({
              LoggedUserData: response.data,
              status: true,
            });

          }
        }
        setpageLoaded(true)
      });
  }, []);


  return (

    <AuthContext.Provider value={{ authState, setAuthState }}>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        {!authState.status ? (
          <Route path="/signin" element={<SignIn />} />
        ) : (
          <Route
            path="/signin"
            element={<Navigate replace to="/dashboard" />}
          />
        )}
        {!authState.status ? (
          <Route path="/signup" element={<SignUp />} />
        ) : (
          <Route
            path="/signup"
            element={<Navigate replace to="/dashboard" />}
          />
        )}
        <Route path="signup" element={<SignUp />} />
        {loading ? (
          <Route path="/dashboard" element={<Loading />} />
        ) : authState ? (authState.LoggedUserData.paid == '1') ? (<><Route path="/dashboard" element={<Expiredpackage />} /> <Route path="/dashboard/paymentSuccessful" element={<PaymentSuccessFull />} /> </>) : (
          <Route path="/dashboard" element={<MainDashboard />}>
            <Route path="" element={<DashboardContent />} />
            <Route path="monitor" element={<Monitor />} />
            <Route path="activechat" element={<ActiveChat />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="setting" element={<Setting />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
            <Route path="paymentSuccessful" element={<PaymentSuccessFull />} />
          </Route>
        ) : (
          <Route
            path="/dashboard"
            element={<Navigate replace to="/signin" />}
          />
        )}
        {
          authState.status ? <Route
            path="*"
            element={
              <p className="h1 mx-auto">
                {" "}
                404 Error <br /> page not found
              </p>
            }
          /> : null
        }
      </Routes>
    </AuthContext.Provider >
  );
}
export default App;
export { AuthContext, socket };
