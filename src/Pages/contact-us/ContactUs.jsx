import React from 'react'
import { Fullpage } from '../../Components/styledComponents.js/shared'
import Navbar from "../../Components/UI/Header/NewHeader";
import styles from './main.module.css'
import { PrimaryButton } from '../../Components/styledComponents.js/shared'
import { MdLocationOn, MdLocalPhone, MdEmail } from "react-icons/md";
import Footer from '../../Components/UI/Footer/Footer'
function ContactUs() {
    return (
        <Fullpage >
            <Navbar color='black' bgColor='white' />
            <div class={`jumbotron text-white py-lg-5 py-md-4 py-3  jumbotron-fluid ${styles.contact_background_image}`}>
                <div class="container text-center">
                    <h1 class="display-4 text-white fw-600">Contact Us</h1>
                    <p class="lead text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
                </div>
            </div>
            <div className="container">
                <div className="row py-md-5 py-sm-3 py-xs-2">

                    <div className="col-md-6">
                        <div>
                            <h3>
                                Any Help !
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                            </p>
                        </div>

                        <div className="address_container">
                            <div className={`${styles.address_section} d-flex `}>
                                <span>
                                    <MdLocationOn className="me-2" />
                                </span>
                                <div>
                                    <h4>Address</h4>
                                    <p>123 newyork city United State</p>
                                </div>
                            </div>
                            <div className={`${styles.address_section} d-flex `}>
                                <span>
                                    <MdLocalPhone className="me-2" />

                                </span>
                                <div>
                                    <h4>Cell</h4>
                                    <p>03156847841</p>
                                </div>
                            </div>
                            <div className={`${styles.address_section} d-flex `}>
                                <span>

                                    <MdEmail className="me-2" />
                                </span>
                                <div>
                                    <h4>Email</h4>
                                    <p>asdf@gmail.com</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Your Name</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>

                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <PrimaryButton className='ms-auto' color='white'>
                                Send
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container py-3">
                <Footer />
            </div>
        </Fullpage>
    )
}

export default ContactUs