import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const SupplierShow = (props) => {
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
                          Supplier Description
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                          <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                          >
                              <Form.Label>Supplier Title</Form.Label>
                              <p>{props.singleSupplier.title}</p>
                          </Form.Group>
                          <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                          >
                              <Form.Label>Supplier Description</Form.Label>
                                  <p>{props.singleSupplier.desc}</p>
                          </Form.Group>
                          <Modal.Footer>
                              <Button variant="secondary" onClick={() => props.isClose(false)}>
                                  Close
                              </Button>
                          </Modal.Footer>
                  </Modal.Body>
              </Modal>
    </div>
  )
}

export default SupplierShow