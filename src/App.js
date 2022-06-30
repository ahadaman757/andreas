import React, { createContext, useState, useEffect } from "react";
import Home from "../src/Pages/Home/Home";
import SignIn from "../src/Pages/SignIn/SignIn";
import SignUp from "../src/Pages/SignUp/SignUp";
import MainDashboard from "./Pages/Dashboard/main";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardContent from "./Pages/Dashboard/Dashboard";
import Monitor from "./Pages/Dashboard/Monitor";
import ActiveChat from "./Pages/Dashboard/ActiveChat";
import Messaging from "./Pages/Dashboard/Messaging";
import axios from "axios";
import Loading from "../src/Pages/Loading/Loading";
import Setting from "./Pages/Dashboard/Setting";
import UserManagement from "./Pages/Dashboard/UserManagement";
import constants from "../src/constants";
import PaymentSuccess from "./Pages/Dashboard/PaymentSuccess";
const AuthContext = createContext("");
function App() {
  const [authState, setAuthState] = useState({
    LoggedUserData: "",
    status: false,
  });
  const [loading, setloading] = useState(true);
  console.log(authState.LoggedUserData);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../../chat-module/chat.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`https://${constants.host}:3003/signin/verifyToken`, {
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
            console.log(response.data.userData);
            setAuthState({
              LoggedUserData: response.data.userData,
              status: true,
            });
          }
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path="/" element={<Home />} />
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
        ) : authState ? (
          <Route path="/dashboard" element={<MainDashboard />}>
            <Route path="" element={<DashboardContent />} />
            <Route path="monitor" element={<Monitor />} />
            <Route path="activechat" element={<ActiveChat />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="setting" element={<Setting />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="paymentSuccess" element={<PaymentSuccess />} />
          </Route>
        ) : (
          <Route
            path="/dashboard"
            element={<p className="h1">Please login First</p>}
          />
        )}
        <Route
          path="*"
          element={
            <p className="h1 mx-auto">
              {" "}
              404 Error <br /> page not found
            </p>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}
export default App;
export { AuthContext };
