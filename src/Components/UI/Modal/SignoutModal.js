import React from "react";
import { Modal, Button } from "react-bootstrap";
const SignoutModal = (props) => {
  const { state, ConfirmHandler, DiscardHandler } = props
  return (
    <Modal show={state} onHide={DiscardHandler}>
      <Modal.Header closeButton>
        <Modal.Title>LogOut Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to Logout ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ConfirmHandler}>
          Logout
        </Button>
        <Button variant="primary" onClick={DiscardHandler}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default SignoutModal;
