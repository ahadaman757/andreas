import React from "react";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import SVGS from "../../../helpers/svgs";
import { Logo } from '../shared/shared'
import { PrimaryButton } from '../../styledComponents.js/shared'
import { HashLink as Link } from 'react-router-hash-link';
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
                                            <NavLink to='/' className={`nav-link active ${styles.nav_link}`} aria-current="page" href="#">Home</NavLink>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <Link className={`nav-link active ${styles.nav_link}`} to="/#pricing">Pricing</Link>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <NavLink to='/aboutus' className={`nav-link active ${styles.nav_link}`} aria-current="page" href="#">About Us</NavLink>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <NavLink to='/contactus' className={`nav-link active ${styles.nav_link}`} aria-current="page" href="#">Contact Us</NavLink>
                                        </li>
                                        <li className="nav-item me-lg-4">
                                            <Link className={`nav-link active ${styles.nav_link}`} to="/#faq">FAQs</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className=" d-flex justify-content-around justify-content-lg-even"
                                    style={{ flexGrow: 1 }}
                                >
                                    <button
                                        className={`btn ms-lg-auto  ${styles.loginBtn}`}
                                        type="submit"
                                    >
                                        <NavLink
                                            className={`${styles.loginLink}`}
                                            to="/signin"

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
