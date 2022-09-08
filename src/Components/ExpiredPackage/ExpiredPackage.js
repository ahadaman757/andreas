import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import axios from "axios";
// STEP 1: Extra leads get.
// STEP 2: Set quantity equal to the extra leads
// STEP 3: Redirect to success page
// STEP 4: Update paid to 0 in database

function ExpiredPackage() {
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [extraLeads, setextraLeads] = useState(null)
  const { authState, setAuthState } = useContext(AuthContext);
  useEffect(() => {
    console.log(authState.LoggedUserData);
    setextraLeads(authState.LoggedUserData.extra_leads)
  });
  return (
    <div className="container py-3">
      <h1>Due Charges for {extraLeads && extraLeads}</h1>
      <p className=" p-2 bg-danger text-white">
        Please pay for extra leads of previous month to enable your account
      </p>
      <form
        action={`https://3.14.27.53:3001/create-checkout-session2?extra=${extraLeads}`}
        method="POST"
      >
        <button className="btn bg-primary text-white"
          onClick={() => {
            localStorage.setItem("paymentMethodToken", makeid(30));
            localStorage.setItem("userId", authState.LoggedUserData.id);
          }}
        >Pay charges</button>
      </form>
    </div>
  );
}

export default ExpiredPackage;
