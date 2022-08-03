import React from 'react'
import { NavLink } from 'react-router-dom'
import SVGS from '../../../helpers/svgs'
import styles from './main.module.css'
function Logo() {
    return (
        <div className="d-flex align-items-center " style={{ gap: 10 }}>
            <NavLink
                to="/"
                style={{ textDecoration: "none" }}
            >
                <img
                    className={`${styles.iconImg}  img-fluid  `}
                    src={SVGS.GreenNavLogo}
                />
            </NavLink>
            <span className='fw-600'>
                ChatReply
            </span>
        </div>
    )
}

export { Logo }