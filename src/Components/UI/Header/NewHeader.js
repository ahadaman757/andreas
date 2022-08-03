import React from "react";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import SVGS from "../../../helpers/svgs";
import { Logo } from '../shared/shared'
import { PrimaryButton } from '../../styledComponents.js/shared'
function Header(props) {
    const { bgColor = "red", color = 'white' } = props;
    return (
        <div className="container-fluid px-0" style={{ backgroundColor: bgColor }}>
            <div className="container-lg ">
                <div className="row py-3 g-1">
                    <nav
                        className={`navbar navbar-expand-lg ${color == 'black' ? 'navbar-light' : 'navbar-dark'}  `}
                        style={{ backgroundColor: bgColor }}
                    >
                        <div className="container-fluid d-flex">
                            <Logo />
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo02"
                                aria-controls="navbarTogglerDemo02"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse align-middle"
                                id="navbarTogglerDemo02"
                            >
                                <div className=" align-items-center justify-content-center  justify-content-lg-end   d-flex flex-grow-1   ">
                                    <ul className="navbar-nav  mb-0 d-flex ms-md-3 ms-lg-auto mb-2 mb-lg-0">
                                        <li className="nav-item me-lg-4" style={{ color: color }}>
                                            <a className={`nav-link active ${styles.nav_link}`} aria-current="page" href="#">Home</a>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <a className={`nav-link  ${styles.nav_link}`} href="#">Pricing</a>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <a className={`nav-link  ${styles.nav_link}`} href="#"  >About Us</a>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <a className={`nav-link  ${styles.nav_link}`} href="#"  >Contact Us</a>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <a className={`nav-link  ${styles.nav_link}`} href="#"  >FAQs</a>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className=" d-flex justify-content-around justify-content-lg-even"
                                    style={{ flexGrow: 1 }}
                                >
                                    <button
                                        className={`btn ms-lg-auto btn-outline-success ${styles.loginBtn}`}
                                        type="submit"
                                    >
                                        <NavLink
                                            to="/signin"
                                            style={{ textDecoration: "none", color: '#1BA160', fontWeight: 500 }}
                                        >
                                            Log in
                                        </NavLink>
                                    </button>
                                    {/* <button
                    className={`btn btn-outline-success ms-md-5  ${styles.freeTrialBtn} `}
                    type="submit"
                  >
                    Free trial
                  </button> */}
                                    <button
                                        className={`btn  ms-md-5  ${styles.freeTrialBtn} `}
                                    >
                                        <NavLink
                                            to="/signup"
                                            style={{ textDecoration: "none", color: 'white' }}
                                        >
                                            SignUp
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Header;
