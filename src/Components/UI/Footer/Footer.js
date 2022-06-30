import React from 'react'
import { RightShape } from '../MiniComponents/MiniComponent'
import main from './footer.module.css'
import SVGS from "../../../helpers/svgs";
import styles from './footer.module.css'
function Footer() {
    return (
        <div className="container-fluid  ps-md-0 bg-blue" style={{ position: 'relative' }}>
            <div className="row">
                <div className={` ${main.right_shape} d-none d-md-flex`}  >
                    <div className={`${main.first_shape}`}>
                    </div>
                    <div className={`${main.second_shape}`}>
                    </div>
                    <div className={`${main.third_shape}`}>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="container">
                        <div className="row py-md-5">
                            <div className="col-md-3 ">
                        
                                <img
                                    className={`${styles.iconImg} mt-3 mt-md-0 col-4 `}
                                    src={SVGS.Logo}
                                />
                            </div>
                            <div className=" col-6 col-md-2  d-flex align-items-around text-white h-100">
                                <ul className='d-flex flex-column justify-content-between pt-2' style={{ listStyle: 'none' }}>
                                    <a className='text-decoration-none text-white' href="">
                                        <li className='fw-bold mb-2 mb-md-3'>
                                            Demo
                                        </li>
                                    </a>
                                    <a className='text-decoration-none text-white' href="">
                                        <li className='mb-2 mb-md-3' >
                                            Example
                                        </li>
                                    </a>
                                    <a className='text-decoration-none text-white' href="">
                                        <li className='mb-2 mb-md-3'>
                                            Example
                                        </li>
                                    </a>
                                </ul>
                            </div>
                            <div className="col-md-2 col-6  d-flex align-items-around text-white h-100">
                                <ul className='d-flex flex-column justify-content-between pt-2' style={{ listStyle: 'none' }}>
                                    <a className='text-decoration-none text-white' href="">
                                        <li className=' mb-2 mb-md-3 text-blue fw-bold'>
                                            sdfsdf
                                        </li>
                                    </a>
                                    <a className='text-decoration-none text-white' href="">
                                        <li className='mb-2 mb-md-3'>
                                            Example
                                        </li>
                                    </a>
                                    <a className='text-decoration-none text-white' href="">
                                        <li className='mb-2 mb-md-3'>
                                            Example
                                        </li>
                                    </a>
                                </ul>
                            </div>
                            <div className="col-md-5  d-flex align-items-around text-white h-100">
                                <ul className='d-flex flex-column justify-content-around' style={{ listStyle: 'none' }}>
                                    <a className='text-decoration-none text-white' href="">
                                        <p>Contact</p>
                                    </a>
                                    <p className='fw-light'>
                                        Start chatting to convert more leads, close more deals, and provide better real-time support.
                                    </p>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row text-center text-white py-2" style={{ borderTop: '1px solid rgba(233, 233, 233, 0.24)' }}>
                <p className='mb-0'>
                    © 2022 yourdomain.com
                </p>
            </div>
        </div>
    )
}
export default Footer