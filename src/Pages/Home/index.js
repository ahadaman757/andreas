import React, { useState } from "react";
import main from "./main.module.css";
import Navbar from "../../Components/navbar";
import bg1 from "../../assets/Images/Vector1.png";
import mobile from "../../assets/logos/Vector.svg";
import { Modal, Button } from "react-bootstrap";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Wrapper from "../../Components/wapper";
import Vector1 from "../../assets/logos/Vector2.svg";
import Vector2 from "../../assets/logos/Group1.svg";
import Vector3 from "../../assets/logos/Group2.svg";
import illustration from "../../assets/Images/illustration.svg";
import done from "../../assets/Images/Done.svg";
import BG1 from "../../assets/Images/bg2.gif";
import BG2 from "../../assets/Images/bg3.svg";
import arrow from "../../assets/Images/arrow.svg";
import Screen from "../../assets/Images/screen.svg";
import Animation from "../../assets/Images/animation.svg";
import Card from "../../Components/card";
import addLogo from "../../assets/logos/Vector3.svg";
import Gif from "../../assets/Images/gif.gif";
import Footer from "../../Components/UI/Footer/Footer";
import ControlledAccordions from "../../Components/accordion";
import Header from "../../Components/UI/Header/NewHeader";
import { Link } from "react-router-dom";
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
const Home = () => {
  return (
    <div>
      <Policy />
      <div className="contentdisplay">
        <Header bgColor="transparent" />
        <Wrapper bgInvisible>
          <div className="section1">
            <div className="contenttext">
              <h1 className="contenttexth1">
                Speak to your customers in real time.
              </h1>
              <p className="contenttextp">
                Everything your customers need to chat with you, self serve and
                chat with your customers in real time and get more leads
              </p>
            </div>
            <div className="contentmob">
              <img src={mobile} />
            </div>
          </div>
        </Wrapper>
      </div>
      <Wrapper bgInvisible>
        <div className="cardcon">
          <div className="card-home">
            <div className="cardlogo">
              <img className="cardlog" src={Vector1} />
              <h1 className="cardh1">Proactive chat</h1>
            </div>
            <p className="cardp">
              A feature in which your operators start the conversation and give
              immediate assistance to your website users.{" "}
            </p>
          </div>
          <div className="card-home">
            <div className="cardlogo">
              <img className="cardlog" src={Vector2} />
              <h1 className="cardh1">Increasing Sales</h1>
            </div>
            <p className="cardp">
              Live chat may assist improve customer experience, generate leads,
              and raise sales income.
            </p>
          </div>
          <div className="card-home">
            <div className="cardlogo">
              <img className="cardlog" src={Vector3} />
              <h1 className="cardh1">Track progress fast</h1>
            </div>
            <p className="cardp">
              This is a thorough tracking tool that gives you a better
              understanding of your website's visitors' activity.
            </p>
          </div>
        </div>
        <div className="invert">
          <div className="vertcon">
            <h1 className="vertconh1">Our Vision</h1>
            <p className="vertconp">
              Chat-Reply aims at providing 24 / 7 chat support to your customers
              without you being in a hassle. Additionally, providing a great
              opportunity for lead generation. Chat-Reply is a process
              automation, chat support and lead generation platform with
              multi-purpose use depending on your needs.
            </p>
          </div>
          <div className="vertcon2">
            <img className="vertconimg" src={illustration} />
          </div>
        </div>
        <div class="custom-shape-divider-bottom-1658834088">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="fixleaks">
          <div className="fixleakscon">
            <h1 className="fixleaksh1">Fix the leaks, get more leads</h1>
            <div className="fixleakschild">
              <img className="fixleakschildimg" src={done} />
              <p className="fixleakschildp">
                Reach out to prospects on high-intent pages in real time.
                Provide them with tailored engagement based on customer data.
              </p>
            </div>
            <div className="fixleakschild">
              <img className="fixleakschildimg" src={done} />
              <p className="fixleakschildp">
                Nurture your leads using automation and asynchronous
                communication. Provide support around the clock.
              </p>
            </div>
            <div className="fixleakschild">
              <img className="fixleakschildimg" src={done} />
              <p className="fixleakschildp">
                Increase lead-to-customer conversion using smart chat tools that
                improve your responsiveness in crucial moments.
              </p>
            </div>
            <div className="fixleaks__child">
              {/* <p className="fixleakschildp2">Discover how to grow your sales</p>
              <img className="fixleakschildimg2" src={arrow} /> */}
            </div>
          </div>
          <div className="fixleakschild2">
            <img className="fixleakschild2img" src={BG1} />
          </div>
        </div>
        <div>
          <div className="outer_container">
            <h1 className="outer_heading">
              Give your users instant support, generate leads and get more
              sales.
            </h1>
            <p className="outer_ptag">
              We share common trends and strategies for improving your rental
              income and making sure you stay in high demand.” to “We take care
              of your users, we provide 24 / 7 chat support and a opportunity
              for you to generate more sales with our lead generation mechanism
              at the same time!
            </p>
          </div>
          <br />
          <br />
          <div className="inner_container">
            <img className="inner_img" src={Screen} />
          </div>
        </div>
        <br />
        <br />
        <div className="out_container_main">
          <div className="out_container">
            <h1 className="out_heading">Easy Integration</h1>
            <p className="out_ptag">
              Integrate Chat Reply with any platform easily. Try Chat Reply
              today and see how easy it is to manage all your customer questions
              in one place!
            </p>
          </div>
          <div className="inner_cont">
            <img className="inn_img" src={Animation} />
          </div>
        </div>

        <div id="pricing" className="price_container">
          <Card />
        </div>
        <div>
          {/* <div className="our_inner_container">
            <h1>Our customers say it best</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              diam nulla sapien elementum. Mauris viverra a sollicitudin egestas
              aliquam. Amet lacus, sed quis leo vulputate vitae.
            </p>
          </div> */}
        </div>
        <div className="information_main_container">
          <div className="information_inner_container">
            <h1>Clients</h1>
            <h2>100+</h2>
          </div>
          <div className="information_inner_container">
            <h1>Technical Support</h1>
            <h2>24 / 7</h2>
          </div>
          <div className="information_inner_container">
            <h1>Rating</h1>
            <h2>4.8</h2>
          </div>
          <div className="information_inner_container">
            <h1>Agent</h1>
            <h2>50+</h2>
          </div>
        </div>
        <div id="faq" className="Faq_main_container">
          <h1>FAQ</h1>
          {/* <div className="Faq_inner_container">
            <img src={addLogo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="Faq_inner_container">
            <img src={addLogo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="Faq_inner_container">
            <img src={addLogo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="Faq_inner_container">
            <img src={addLogo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="Faq_inner_container">
            <img src={addLogo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div> */}
          <ControlledAccordions />
        </div>
        <div className="work_outer_cantainer">
          <div className="work_main_cantainer">
            <div className="work_inner_cantainer">
              <h1>Let’s find out how to work together</h1>
              <p>
                Signup for a free trial with us and see for yourself how we take
                burden off of your shoulders and provide you with an easy,
                hassle-free, chat support and lead generation.
              </p>
            </div>
            <div className="work_innerimg_cantainer">
              {/* <input placeholder="Enter Your Email" /> */}
              <button>
                <Link
                  to="/signup"
                  style={{ color: "white", marginTop: "-50px" }}
                >
                  Start Free Trial
                </Link>
              </button>
            </div>
          </div>
          <div className="gif_container">
            <img src={Gif} />
          </div>
        </div>
        <Footer />
      </Wrapper>
    </div>
  );
};
export default Home;
