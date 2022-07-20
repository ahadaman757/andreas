import React from "react";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import SVGS from "../../../helpers/svgs";

function Header(props) {
  const { bgColor = "red" } = props;
  return (
    <div className="container-fluid px-0" style={{ backgroundColor: bgColor }}>
      <div className="container-lg ">
        <div className="row py-3 g-1">
          <nav
            className="navbar navbar-expand-md navbar-dark  "
            style={{ backgroundColor: bgColor }}
          >
            <div className="container-fluid d-flex">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                <img
                  className={`${styles.iconImg} col-4 img-fluid  `}
                  src={SVGS.Logo}
                />
              </NavLink>

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
                <div className="col-md-7 align-items-center text-center  d-flex  ">
                  {/* <ul className="navbar-nav w-100 mb-0  d-flex ms-md-3 me-auto mb-2 mb-lg-0">
                    <li className="nav-item me-4">
                      <a className="nav-link active" aria-current="page" href="#">Link Example</a>
                    </li>
                    <li className="nav-item me-4">
                      <a className="nav-link" href="#">Link Example</a>
                    </li>
                    <li className="nav-item me-4">
                      <a className="nav-link " href="#" tabIndex="-1" aria-disabled="true">Link Example</a>
                    </li>
                  </ul> */}
                </div>

                <div
                  className=" d-flex justify-content-around justify-content-md-even"
                  style={{ flexGrow: 1 }}
                >
                  <button
                    className={`btn ms-md-auto btn-outline-success ${styles.loginBtn}`}
                    type="submit"
                  >
                    <NavLink
                      to="/signin"
                      style={{ textDecoration: "none", color: "white" }}
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
                      style={{ textDecoration: "none" }}
                    >
                      Free Trial
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
