import React from "react";

const Button = (props) => {
  const primary = {
    color: "white",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1BA160",
    paddingTop: "10px",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "10px",
  };
  const primaryFullWidth = {
    color: "white",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1BA160",
    paddingTop: "10px",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "10px",
    width: "100%",
  };
  const nobg = {
    color: "grey",
    border: "none",
    borderRadius: "5px",
    background: "none",
    paddingTop: "10px",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "10px",
  };
  return props.type == "primary" ? (
    <button
      style={primary}
      className={`${props.classes}`}
      onClick={props.click}
    >
      {props.title}
    </button>
  ) : props.type == "nobg" ? (
    <button style={nobg} onClick={props.click} className={`${props.classes}`}>
      {props.title}
    </button>
  ) : props.type == "primaryFullWidth" ? (
    <button
      style={primaryFullWidth}
      onClick={props.click}
      className={`${props.classes}`}
    >
      {props.title}
    </button>
  ) : null;
};

export default Button;
