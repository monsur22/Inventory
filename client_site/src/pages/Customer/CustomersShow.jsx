import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const CustomersShow = (props) => {
    // console.log(props)
    return (

        <div>
            <Modal
                show={props.isOpen}
                onHide={() => props.isClose(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title className="card-primary">
                        Customer Description
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Customer Name</Form.Label>
                        <p>{props.singleCustomer.name}</p>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Supplier Phone</Form.Label>
                        <p>{props.singleCustomer.phone}</p>
                    </Form.Group>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => props.isClose(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CustomersShow;
