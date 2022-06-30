import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import react from 'react';
const PrivacyModal = (props) => {
    const [show, setShow] = useState(props.open);
    const [propmtPolicy, setpropmtPolicy] = useState(true)
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
      return (
        <Modal show={props.open} onHide={props.handleClose}>
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
        {
            props.showFooter === true ? (
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDiscard}>
                  Discard
                </Button>
                <Button variant="primary" onClick={handleCloseAccept}>
                  Accept
                </Button>
              </Modal.Footer>
            ) : ''
        }
      </Modal>
      )
  }
  export default PrivacyModal;