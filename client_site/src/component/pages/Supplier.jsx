import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const Supplier = () => {
    const [show, setShow] = useState(false);
    const [suppliers, setSuppliers] = useState([]); // Use suppliers, not data
    const [formData, setFormData] = useState({
        title: '',
        desc: ''
      });
    const [editMode, setEditMode] = useState(false); // Add editMode state
    const [editedSupplierId, setEditedSupplierId] = useState(null);


    const handleClose = () => {
        setShow(false)
        setEditMode(false);
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        getSupplier();
    }, []);

    function getSupplier() {
        axios
          .get('http://localhost/api/supplier')
          .then((response) => {
            const suppliersData = response.data;
            setSuppliers(suppliersData); // Update state with fetched data
          })
          .catch((error) => {
            console.error('Error fetching  data:', error);
          });
      }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost/api/supplier',formData)
            .then((response) => {
                console.log(response)
                const createdSuppliers = response.data.supplier;
                setSuppliers([...suppliers, createdSuppliers])
                setFormData({ title: '', desc:''});
                handleClose();
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        console.log("click submit")
    }

    function handleEdit(id) {
        // You may want to fetch the supplier data to pre-fill the form with existing values
        axios.get(`http://localhost/api/supplier/${id}/edit`)
            .then((response) => {
                const supplierData = response.data.supplier;
                setFormData({
                    title: supplierData.title,
                    desc: supplierData.desc,
                });
                setEditMode(true);
                setEditedSupplierId(id);
                handleShow();
            })
            .catch((error) => {
                console.error('Error fetching supplier data:', error);
            });
    }
    function handleUpdate(e, id) {
        e.preventDefault(); // Prevent the form from submitting as it's handled manually via axios
        console.log(editedSupplierId)

        axios
          .put(`http://localhost/api/supplier/${editedSupplierId}`, formData)
          .then((response) => {
            const updatedSupplier = response.data.supplier;
            const updatedSuppliers = suppliers.map((supplier) =>
              supplier.id === id ? updatedSupplier : supplier
            );
            setSuppliers(updatedSuppliers);
            setFormData({ title: '' ,desc:''});
            setEditMode(false);
            handleClose();
          })
          .catch((error) => {
            console.error('Error updating supplier:', error);
          });
      }

    function handleDelete(id) {
        axios.delete(`http://localhost/api/supplier/${id}`)
            .then((response) => {
                const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== id);
                setSuppliers(updatedSuppliers);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }
console.log(suppliers)

  return (
      <AuthLayout
          header={
              <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  Supplier
              </h2>
          }
      >
          <div>
              {/* form start */}
              <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
              >
                  <Modal.Header>
                      <Modal.Title className="card-primary">
                          {editMode ? "Edit Supplier" : "Add Supplier"}
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {/* <Form onSubmit={editMode ? handleUpdate : handleSubmit}> */}
                      <Form
                          onSubmit={(e) =>
                              editMode
                                  ? handleUpdate(e, editedSupplierId)
                                  : handleSubmit(e)
                          }
                      >
                          <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                          >
                              <Form.Label>Supplier Title</Form.Label>
                              <Form.Control
                                  type="text"
                                  placeholder="Supplier Title"
                                  value={formData.title}
                                  onChange={(e) =>
                                      setFormData({
                                          ...formData,
                                          title: e.target.value,
                                      })
                                  }
                                  autoFocus
                              />
                          </Form.Group>
                          <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                          >
                              <Form.Label>Supplier Description</Form.Label>
                              <Form.Control as="textarea" rows={3}
                              type="text"
                              placeholder="Supplier Description"
                              value={formData.desc}
                              onChange={(e) =>
                                  setFormData({
                                      ...formData,
                                      desc: e.target.value,
                                  })
                              }
                              autoFocus
                              />
                          </Form.Group>
                          <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                  Close
                              </Button>
                              <Button variant="primary" type="submit">
                                  {editMode ? "Update" : "Create"}
                              </Button>
                          </Modal.Footer>
                      </Form>
                  </Modal.Body>
              </Modal>

              {/* Table start */}
              <div className="row">
                  <div className="col-md-12">
                      <div className="card">
                          <div className="card-header">
                              <h3 className="card-title">Supplier Table</h3>
                              <button
                                  type="submit"
                                  className="btn btn-primary  float-right"
                                  onClick={handleShow}
                              >
                                  Add Supplier
                              </button>
                          </div>

                          <div className="card-body">
                              <table className="table table-bordered">
                                  <thead>
                                      <tr>
                                          <th style={{ width: 10 }}>#</th>
                                          <th>Tittle</th>
                                          <th style={{ width: 20 }}>Action</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {suppliers.map((item) => (
                                          <tr key={item.id}>
                                              <td>{item.id}</td>
                                              <td>{item.title}</td>
                                              <td>
                                                  <div className="btn-group btn-group-sm">
                                                      <a
                                                          href=""
                                                          className="btn btn-success"
                                                      >
                                                          <FontAwesomeIcon
                                                              icon={faEye}
                                                          />
                                                      </a>

                                                      <a className="btn btn-info">
                                                          <FontAwesomeIcon
                                                              icon={faEdit}
                                                              onClick={() =>
                                                                  handleEdit(
                                                                      item.id
                                                                  )
                                                              }
                                                          />
                                                      </a>
                                                      <a className="btn btn-danger">
                                                          <FontAwesomeIcon
                                                              icon={faTrash}
                                                              onClick={() =>
                                                                  handleDelete(
                                                                      item.id
                                                                  )
                                                              }
                                                          />
                                                      </a>
                                                  </div>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                          {/* pagination will be here */}
                      </div>
                  </div>
              </div>
          </div>
      </AuthLayout>
  );
}

export default Supplier