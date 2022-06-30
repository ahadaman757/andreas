import React from "react";
import styles from "./styles.module.css";
const AgentMsg = () => {
  return (
    <div className={`${styles.agent_msg} my-4`}>
      <img
        className={`${styles.round_img}`}
        src={require("../../../assets/Images/chat_icon.png").default}
        alt=""
      />
      <p className={`${styles.chat_text} py-2 `}>
        Hello! Welcome to Chat-Reply, how may I help you?
      </p>
    </div>
  );
};
const AgentMsgSecond = () => {
  return (
    <div className={`${styles.agent_msg} my-4`}>
      <img
        className={`${styles.round_img}`}
        src={require("../../../assets/Images/chat_icon.png").default}
        alt=""
      />
      <p className={`${styles.chat_text} py-2 `}>
        Understood, we would need some data for authentication.
      </p>
    </div>
  );
};
const ClientMsg = () => {
  return (
    <div className={`${styles.client_msg} my-4 bg-primary`}>
      <p className={`mb-0 ps-3 ${styles.chat_text_agent}`}>
        {" "}
        Hi Sara. Thanks for joining in! I’d like to check my order status.
      </p>
    </div>
  );
};
const ClientMsgSecond = () => {
  return (
    <div className={`${styles.client_msg} my-4 bg-primary`}>
      <p className={`mb-0 ps-3 ${styles.chat_text_agent}`}>
        {" "}
        Sure thing! No problem Sara.
      </p>
    </div>
  );
};
function Chatbox() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.top} bg-primary px-2 py-3`}>
        <p className="fw-bold mb-0">We’re here to assist you 24/7</p>
        <p className="mb-0">We typically reply in few minutes</p>
      </div>
      <div className={`${styles.chat_box} text-dark py-3`}>
        <AgentMsg />
        <ClientMsg />
        <AgentMsgSecond />
        <ClientMsgSecond />
      </div>
    </div>
  );
}

export default Chatbox;
