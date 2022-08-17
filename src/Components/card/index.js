import "./styles.css";
import { NavLink } from "react-router-dom";
import React from "react";

const data = [
  {
    id: 1,
    cardName: "Free Trail",
    cardPrice: "Free",
    cardDuration: "20 leads or 8 Days",
    cardDisceription: "Best for learning and chatting with customers",
    benefits: ["Track up to 20 leads", "Unlimited Chat history", "Analytics"],
  },
  {
    id: 2,
    cardName: "Premium",
    cardPrice: "$39 monthly / 10 leads",
    cardDuration: "$9 per lead onwards",
    cardDisceription:
      "Best for emerging platforms / websites with medium to high traffic and support requests.",
    benefits: [
      "Track up to 10 leads",
      "Unlimited Chat history",
      "Analytics",
      "Software Engineer Support",
      "LiveChat Dashboard",
      "Technical Support",
    ],
  },
  {
    id: 3,
    cardName: "Enterprise",
    cardDisceription:
      "Large Companies have their Own Chat Agents",
    benefits: [
      "All basic features",
      "ChatReply expert technical support",
      "Advance analytics",
      "Customization as per requirement",
      "... much more!",
    ],
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
        <NavLink
          to={item.id == 3 ? "/contactus" : "/signup"}
          className={`nav-link active`}
          aria-current="page"
          href="#"
        >
          {" "}
          <button className="card_btn">
            {item.id == 3 ? "Book a Call" : "Get Started"}
          </button>
        </NavLink>
      </div>
    );
  });
};
export default Card;
