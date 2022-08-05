import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
function EndChatModal(props) {
    const { state, handleCloseAccept, handleCloseDiscard } = props
    return (
        <Modal show={state}>
            <Modal.Header closeButton onh>
                <Modal.Title>PRIVACY POLICY</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you Sure to End this Chat, you wont be able to send or receive more messages in this conversation</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAccept}>
                    End Chat
                </Button>
                <Button variant="primary" onClick={handleCloseDiscard}>
                    Cancel
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default EndChatModal