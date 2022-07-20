import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../Components/UI/Header/Header";
import Constant from "../../assets/Constants/ui_constants";
import Hero from "../../Components/UI/Hero/Hero";
import main from "./main.module.css";
import { RightShape } from "../../Components/UI/MiniComponents/MiniComponent";
import Footer from "../../Components/UI/Footer/Footer";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useSound from 'use-sound'
import mySound from '../../assets/audio/Message Tone.mp3'
import { socket } from '../../App'
const Policy = () => {
  const [show, setShow] = useState(false);
  const [propmtPolicy, setpropmtPolicy] = useState(true)


  const handleClose = () => {
    setShow(false)

  };
  const handleCloseDiscard = () => {
    setShow(false)
    setpropmtPolicy(true)
  };

  const handleCloseAccept = () => {
    setShow(false)
    setpropmtPolicy(false)
  };
  const handleShow = () => setShow(true);
  if (propmtPolicy)
    return <div className={`${main.policyContianer}`}>
      This site uses Cookies for more information and to manage cookies read our <button className={`${main.policyOpen} `} onClick={handleShow}>Privacy policy</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PRIVACY POLICY</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <bold>PRIVACY POLICY</bold>
          <br />
          <p>
            We are committed to protecting our users' privacy. Keeping the information you share with us on the site, secure and ensuring your understanding of how we collect, use and maintain your information is important to us at Chat-Reply. We maintain physical, electronic and procedural safeguards to protect your information and while no data transmission over the Internet is 100% secure from intrusion, we have used and will continue to use commercially reasonable efforts to ensure the protection of your information. We continually assess new technology for protecting information and, when appropriate, we upgrade our information security systems.

            Because of its importance and to make it easier for you to find and review it, we have made this Privacy Policy into a separate document on the site. However, bear in mind it is a part of our agreement with you and when we may make changes to these statements and terms, and how they become binding upon you. We reserve the right to modify this policy. Any changes to the policy will be posted on this page. Users are encouraged to check the page regularly as they will be bound by the changes once posted on the site.

            Please read this Privacy Policy before using this service or submitting personal information to us.
          </p>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDiscard}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleCloseAccept}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  else
    return null
}
const Features = (props) => {
  return (
    <div className="d-flex">
      <img
        src={
          props.img == "1"
            ? require(`../../assets/Images/track.svg`).default
            : props.img == "2"
              ? require(`../../assets/Images/increase-sales.svg`).default
              : require(`../../assets/Images/track.svg`).default
        }
        alt=""
        style={{ alignSelf: "baseline", width: 90, marginRight: 20 }}
      />
      <div className="d-flex flex-column">
        <p style={{ fontSize: 18, fontWeight: 600, paddingLeft: "10px" }}>
          {props.title}
        </p>
        <p style={{ color: "#565962", paddingLeft: "10px" }}>{props.detail}</p>
      </div>
    </div>
  );
};
const FeatureSection = (props) => {
  const { reverse = "row" } = props;
  return (
    <div className="row d-flex my-5" style={{ flexDirection: reverse }}>
      <div className="col-md-6 d-flex justify-content-center ">
        {reverse != "row-reverse" ? (
          <img className="img-fluid" src={props.img} />
        ) : (
          <img className="img-fluid" src={props.img} />
        )}
        {/* {reverse != 'row-reverse' ? <div className={`${main.backgroundBox} bg-primary`}>
          <div className={`${main.frontBox} `}>
          </div>
        </div> : <div className={`${main.blueBackground} bg-blue`}>
          <div className={`${main.white} `}>
          </div>
        </div>} */}
      </div>
      <div
        className={`col-md-6 d-flex flex-column justify-content-center  py-5 px-5 ${reverse}`}
      >
        <h1 className=".h2 fw-bold">{props.title}</h1>
        <p style={{ color: "#6A6D77" }}>{props.description}</p>
        <a
          className="text-decoration-none"
          href="
        "
        >
          {props.showSignupbtn === true ? (
            <p className="text-primary">
              <NavLink
                to="/signup"
                style={{ textDecoration: "none", }}
              >
                Start a free trail <i className="fas text-primary ms-2 fa-arrow-right"></i>
              </NavLink>
            </p>
          ) : (
            ""
          )}
        </a>
      </div>
    </div>
  );
};
function Home() {

  const [playSound] = useSound(mySound)
  useEffect(() => {

    console.log("socket:" + socket)
    socket.on("NEW MESSAGE", (msg, id) => {
      console.log("socket.id" + socket.id)



    });
  }, [socket])

  return (
    <Fragment>
      <Policy />
      <div className={`${main.dashboard_header} bg-blue`}>
        <Navbar bgColor={Constant.colors.mirage} />
        <Hero />
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <Features
              title="Proactive chat"
              detail={`A feature in which your operators start the conversation and give immediate assistance to your website users.`}
              img="1"
            />
          </div>
          <div className="col-md-4">
            <Features
              title="Increasing Sales"
              detail={`Live chat may assist improve customer experience, generate leads, and raise sales income.`}
              img="2"
            />
          </div>
          <div className="col-md-4">
            <Features
              title="Track Progress Fast"
              detail={`This is a thorough tracking tool that gives you a better understanding of your website visitors acitivty.`}
              img="3"
            />


          </div>
        </div>

      </div>

      <div
        className="container-fluid pb-4"
        style={{ backgroundColor: "#E5E5E5" }}
      >
        <div className="container py-5">
          <FeatureSection
            img="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            title="Get more visitors, get more sales."
            description="We share common trends and strategies for improving your rental income and making sure you stay in high demand."
          />
          <FeatureSection
            img="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
            reverse="row-reverse"
            title="Easy to use"
            description="Chat Reply is a customer service chat software that helps businesses provide excellent customer service. It is reliable, easy to use, and affordable."
          />
          <FeatureSection
            img={require("../../assets/Images/thirdRow.png").default}
            title="Easy Integration"
            description="Integrate Chat Reply with any platform easily. Try Chat Reply today and see how easy it is to manage all your customer questions in one place!"
            showSignupbtn={true}
          />
        </div>
        <div className="container text-center">
          <p className="h2" style={{ color: "#161C2D" }}>
            Pricing Plans
          </p>
        </div>
        <div className="container mt-3">
          <div className="row pricing-plan-row">
            <div className="col-12 col-md-4 mb-1 mb-md-0">
              <div className="card h-100 ">
                <div className="card-body text-center">
                  <h1>
                    <b>Free Trial</b>
                  </h1>
                  <p>Best for learning and chatting with customers.</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className={main.price}>Free</span>
                    <span>8 days</span>
                  </div>
                  {/* {freeActivate == "0" ? (
                <Button title="Current Plan" type="primaryFullWidth" />
              ) : (
                <form
                  action="http://${constants.host}:3001/create-checkout-session1"
                  method="POST"
                >
                  <Button title="Subscribe Now" type="primaryFullWidth" />
                </form>
              )} */}
                  <br />
                  <br />
                  <p>Track up to 50 leads</p>
                  <p>Unlimited chat history</p>
                  <p>Customization</p>
                  <p>Analytics</p>
                </div>
              </div>
              <br />
            </div>
            <div className="col-12 col-md-4 mb-1 mb-md-0">
              <div className="card h-100 ">
                <div className="card-body">
                  <h1>
                    <b>Starter</b>
                  </h1>
                  <p>Full customization, targeting, and team management.</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className={main.price}>$16</span>
                    <span>Monthly</span>
                  </div>

                  <br />
                  <br />
                  <p>Track up to 200 Leads</p>
                  <p>Unlimited chat history</p>
                  <p>Customization</p>
                  <p>Analytics</p>
                  <p>Software engineer support</p>
                  <p>Multiple website support</p>
                  <p>LiveChat Dashboard</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-1 mb-md-0">
              <div className="card h-100 ">
                <div className="card-body">
                  <h1>
                    <b>Addons</b>
                  </h1>
                  <p>Best for learning and chatting with customers.</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className={main.price}>10$</span>
                    <span>Per lead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid pe-0 py-4"
        style={{ position: "relative" }}
      >
        <div className="row me-0">
          <div className=" mx-auto text-center col-md-8">
            <h2 className="h2 text-blue">
              Add Live Chat to Your Website Today
            </h2>
            <p className="text-blue">
              Start chatting to convert more leads, close more deals, and
              provide better real-time support.
            </p>
            <span>
              <button className={`btn-primary bg-primary px-3 py-2  `}>
                <NavLink
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Get Started
                </NavLink>
              </button>
            </span>
          </div>
          <RightShape />
          {/* <div className={` ${main.right_shape}  float-end`} style={{ position: 'absolute', right: 0, top: 50,padding:0 }}>
            <div className={`${main.first_shape}`}>
            </div>
            <div className={`${main.second_shape}`}>
            </div>
            <div className={`${main.third_shape}`}>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Home;
