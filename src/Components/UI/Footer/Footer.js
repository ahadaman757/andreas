import React from "react";
import { RightShape } from "../MiniComponents/MiniComponent";
import main from "./footer.module.css";
import SVGS from "../../../helpers/svgs";
import styles from "./footer.module.css";
import { Logo } from "../shared/shared";
import { HashLink as Link } from 'react-router-hash-link';
function Footer() {
  return (
    <div
      className="container-fluid   ps-md-0 bg-white"
      style={{ position: "relative" }}
    >
      <div className="row">
        {/* <div className={` ${main.right_shape} d-none d-md-flex`}  >
                    <div className={`${main.first_shape}`}>
                    </div>
                    <div className={`${main.second_shape}`}>
                    </div>
                    <div className={`${main.third_shape}`}>
                    </div>
                </div> */}
        <div className="col-12">
          <div className="container">
            <div className="row py-md-5">
              <div className="col-md-3 ">
                <Logo />
                <p>
                  Everything your customers need to chat with you, self serve and chat with your customers.
                </p>
              </div>

              <div className="  col-md-4 col-6  d-flex align-items-around text-black h-100">
                <ul
                  className="d-flex flex-column justify-content-between pt-2"
                  style={{ listStyle: "none" }}
                >
                  <li className=" mb-2 mb-md-3 text-blue fw-bold">

                    <Link className={`nav-link  ${styles.nav_link}`} to="/">Home</Link>
                  </li>
                  <li className=" mb-2 mb-md-3 text-blue ">

                    <Link className={`nav-link  ${styles.nav_link}`} to="/aboutus">About Us</Link>
                  </li>
                  <li className=" mb-2 mb-md-3 text-blue ">

                    <Link className={`nav-link  ${styles.nav_link}`} to="/#pricing">Pricing</Link>
                  </li>
                  <li className=" mb-2 mb-md-3 text-blue ">

                    <Link className={`nav-link  ${styles.nav_link}`} to="/#faq">Faq</Link>
                  </li>

                </ul>
              </div>
              <div className="col-md-5  d-flex align-items-around text-black h-100">
                <ul
                  className="d-flex flex-column justify-content-between pt-2"
                  style={{ listStyle: "none" }}
                >
                  <li className=" mb-2 mb-md-3 text-blue fw-bold">

                    <span className={`nav-link  ${styles.nav_link}`} >Contact</span>
                  </li>
                  <li className=" mb-2 mb-md-3 text-blue ">

                    <span className={`nav-link  ${styles.nav_link}`}>The Fastest and easiest way to get in touch is to chat with us here</span>
                  </li>
                  <li className=" mb-2 mb-md-3 text-blue ">
                    <span className={`nav-link  ${styles.nav_link}`} >123 newyork city United State</span>
                  </li>
                  <li className=" mb-2 mb-md-3 text-blue ">
                    <span className={`nav-link  ${styles.nav_link}`} >info@chat-reply.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row text-center text-black py-2"
        style={{ borderTop: "1px solid rgba(233, 233, 233, 0.24)" }}
      >
        <p className="mb-0">© 2022 yourdomain.com</p>
      </div>
    </div>
  );
}
export default Footer;
