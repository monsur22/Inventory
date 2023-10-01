import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the Font Awesome icon you want to use
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
const ProductShow = (props) => {
    console.log("product show " ,props.singleProduct.id)
    return (
        <div>
            <Modal
                size="lg"
                show={props.isOpen}
                onHide={() => props.isClose(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Product Details
                    </Modal.Title>
                    <Button variant="link" onClick={() => props.isClose(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Image
                                    src={`http://localhost/${props.singleProduct.image_path}`}
                                    alt={props.singleProduct.title}
                                    fluid
                                />
                            </Col>
                            <Col md={6}>
                                <h2>{props.singleProduct.title}</h2>
                                <p>{props.singleProduct.description}</p>
                                <p>Price: {props.singleProduct.price}</p>
                                <p>Quantity: {props.singleProduct.quantity}</p>
                                <p>Category: {props.singleProduct.category.title}</p>
                                <p>Supplier: {props.singleProduct.supplier.title}</p>
                                <p>Description: {props.singleProduct.description}</p>
                                {/* <Button variant="primary">Add to Cart</Button> */}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ProductShow