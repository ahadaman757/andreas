import React, { useEffect, useState, useContext } from "react";
import { DashboardHeader } from "../../Components/UI/MiniComponents/MiniComponent";
import TickIcon from "../../assets/Images/tick_icon.png";
import axios from "axios";
import { AuthContext } from "../../App";
const PaymentSuccess = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [paymentStatus, setPaymentStatus] = useState();
  useEffect(() => {
    if ("paymentMethodToken" in localStorage) {
      const query = new URLSearchParams(window.location.search);
      axios
        .post(`https://3.14.27.53:3001/getSubDetail`, {
          id: query.get("session_id"),
        })
        .then((response) =>
          axios
            .post(`https://3.14.27.53:3001/insertPaymentData`, {
              userId: localStorage.getItem("userId"),
              customerId: response.data.id,
            })
            .then((response) => {
              console.log(response.data[0]);
              // axios.post(`https://3.14.27.53:3001/deleteStripe`, {
              //   id: response.data[0].id,
              // });
            })
        );
      axios.post("https://3.14.27.53:3001/updateuserplan", {
        id: localStorage.getItem("userId"),
      });
      localStorage.removeItem("paymentMethodToken");
      setPaymentStatus(true);
    } else {
      setPaymentStatus(false);
    }
  }, []);

  const cancelAccount = () => {
    axios
      .post(`https:/3.14.27.53:3001/deleteStripe`, {
        id: "sub_1LUTVsEb5uZNNRFpjv2J0cjo",
      })
      .then((response) => console.log(response));
  };
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
            <small>
              Copy the code below and paste the code in your head tags
            </small>
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
