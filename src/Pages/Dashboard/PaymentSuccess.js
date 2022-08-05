import React, { useEffect, useState, useContext } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import TickIcon from "../../assets/Images/tick_icon.png";
import axios from "axios";
import { AuthContext } from "../../App";
const PaymentSuccess = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [paymentStatus, setPaymentStatus] = useState();
  useEffect(() => {
    axios.post(`https://192.163.206.200:3001/updateuserplan`, {
      id: authState.LoggedUserData.id,
    })
      .then((response) => {
        if (localStorage.getItem("paymentMethodToken") === null) {

          setPaymentStatus(false);
        } else {

          localStorage.removeItem("paymentMethodToken");
          setPaymentStatus(true);
        }
      })

  }, [])
  return (
    <>
      <DashboardHeader />
      {paymentStatus === true ? (
        <div className="container">
          <br />
          <br />
          <div
            style={{
              backgroundColor: "#1BA160",
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
              paddingBottom: "50px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={TickIcon} />
            <h3 style={{ color: "white" }}>
              <b>Congratulations!</b>
            </h3>
            <h5 style={{ color: "white" }}>
              You have successfully purchased the plan.
            </h5>
          </div>
          <br />
          <div
            style={{
              backgroundColor: "#D7D7D7",
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              paddingBottom: "20px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5>
              {/* Now go to setting widget follow instructions and add widget to
              your website. */}
              <input
                value={
                  '<script src="https://cdn.jsdelivr.net/gh/ialiaman/123/chaty.js"></script>'
                }
                style={{ width: "100%" }}
              />
            </h5>
          </div>
        </div>
      ) : (
        <div className="container">
          <br />
          <br />
          <div
            style={{
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
              paddingBottom: "50px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="https://img.icons8.com/color-glass/344/multiply.png"
              width={100}
            />
            <h3 style={{ color: "white" }}>
              <b>Oops!</b>
            </h3>
            <h5 style={{ color: "white" }}>The payment was unsuccessful</h5>
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
