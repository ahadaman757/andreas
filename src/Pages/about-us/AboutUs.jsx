import React from 'react'
import { Fullpage } from '../../Components/styledComponents.js/shared'
import Header from '../../Components/UI/Header/NewHeader'
import styles from './aboutus.module.css'
import Footer from '../../Components/UI/Footer/Footer'
function AboutUs() {
    return (
        <Fullpage>
            <Header bgColor="white" />
            <div class={`jumbotron text-white py-lg-5 py-md-4 py-3  jumbotron-fluid ${styles.about_Jumbotron}`}>
                <div class="container text-center">
                    <h1 class="display-4 text-white fw-600">About Us</h1>
                    <p class="lead text-white">Who we are and what we do.</p>
                </div>
            </div>
            <main className='container py-5 flex-grow-1 '>
                <div className="row d-flex  justify-content-center">
                    <div className=" col-sm-10 col-12 col-md-8 col-lg-6">
                        <h1 className={`${styles.h1}`}>The Product</h1>
                        <p className={`${styles.content}`}>We believe that every business with a website needs tools to communicate with its customers. ChatReply fills in for phone calls, which are time-consuming and for e-mails, which tend to be slow.</p>
                        <p className={`${styles.content}`}>
                            That’s why we created ChatReply– an application that enables the visitors on your site to chat live with your customer support. It’s a solution dedicated for e-commerce and customer care.
                        </p>
                        <p className={`${styles.content}`}>
                            Unique greetings and powerful reporting are just some of our features that will aid you in your day-to-day business activities.Over 36,000 happy customers rely on ChatReply in their everyday duties. Some of them shared their thoughts about our product.
                            We encourage you to try our live chat software yourself! Just give us a shot and take ChatReply for a free test drive.
                        </p>
                        <h1 className={`${styles.h1}`}>
                            People
                        </h1>
                        <p className={`${styles.content}`}>
                            We’re a team of 100+ passionate people developing and supporting the most efficient and easy-to-use live chat software for business. What we enjoy the most is seeing our customer’s business grow with the help of our product.
                        </p>
                        <p >
                            Want to join us? It might not be easy, but check out current openings and get in touch.
                        </p>
                        {/* <figure>
                            <video width="100%" height="240" controls>
                                <source src="https://www.youtube.com/watch?v=0uurZYdmA6M" type="video/mp4" />
                                <source src="movie.ogg" type="video/ogg" />
                                Your browser does not support the video tag.
                            </video>
                            <figcaption>Want to join us? It might not be easy, but check out current openings and get in touch.</figcaption>
                        </figure> */}
                        <h1 className={`${styles.h1}`}>
                            Mission statement
                        </h1>
                        <p className={`${styles.content}`}>
                            We’ve built ChatReply on the idea that helping others is as much important as creating a great product. While turning simple live chat app into a robust business platform, we’ve gained tons of knowledge about growth and customer relations. Our mission is to share our knowledge, bring personal touch to online communication and never stop loving what we do.
                        </p>
                        <p className={`${styles.content}`}>Authorize.Net Merchant - Click to Verify <br />
                            ChatReply, Inc.  BBB Business Review</p>
                        <h1 className={`${styles.h1}`}>
                            The history
                        </h1>
                        <p className={`${styles.content}`}>
                            When we founded ChatReply, we knew we want to create something extraordinary. We had passion, we were ambitious, we believed we would move mountains. We wanted to re-shape the face of online communication.
                        </p>
                        <p>
                            We just needed to learn how. Our history dates to 2002, when we sat down and decided to change how businesses communicate with their customers. Back then, we had no idea how hard it would be – we just knew we wanted to build the best live chat app on the market. Easier said than done!
                        </p>
                    </div>
                </div>
            </main>
            <div className="container">
                <Footer />
            </div>

        </Fullpage>
    )
}
export default AboutUs

