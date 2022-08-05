import "./styles.css";
import { NavLink } from "react-router-dom";
import React from "react";

const data = [
  {
    cardName: "Free Trail",
    cardPrice: "Free",
    cardDuration: "8 Days",
    cardDisceription: "Best for learning and chatting with customers",
    benefits: [
      "Track up to 50 leads",
      "Unlimeted Chat history",
      "Customization",
      "Analytics",
    ],
  },
  {
    cardName: "Starter",
    cardPrice: "$16",
    cardDuration: "Monthly",
    cardDisceription: "Full Customization,Targeting,and Team Managment",
    benefits: [
      "Track up to 50 leads",
      "Unlimeted Chat history",
      "Customization",
      "Analytics",
      "Software Engineer Support",
      "Multiple Website Support",
      "LiveChat Dashboard",
    ],
  },
  {
    cardName: "Addons",
    cardPrice: "$10",
    cardDuration: "/per Lead",
    cardDisceription: "Best for learning and chatting with customers",
    benefits: ["Unlimeted Chat history", "Customization", "Analytics"],
  },
];
const Card = () => {
  return data.map((item) => {
    return (
      <div className="card_main">
        <div className="main_container">
          <div className="inner_card_container">
            <h1 className="card_heading">{item.cardName}</h1>
            <h1 className="card_price">{item.cardPrice}</h1>
            <h2 className="card_duration">{item.cardDuration}</h2>
            <p className="card_discreption">{item.cardDisceription}</p>
          </div>
          <div className="inner_details">
            <ul>
              {item.benefits.map((b) => {
                return <li className="detail_list">{b}</li>;
              })}
            </ul>
          </div>
        </div>
        <NavLink to='/signup' className={`nav-link active`} aria-current="page" href="#"> <button className="card_btn">Get Started</button></NavLink>

      </div>
    );
  });
};
export default Card;
