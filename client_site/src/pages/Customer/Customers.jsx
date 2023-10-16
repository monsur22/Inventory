import React from 'react'
import AuthLayout from '../../component/layout/AuthLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import CustomersShow from './CustomersShow';
import Pagination from '../Pagination/Pagination';
import Swal from 'sweetalert2';
import LoadingSpinner from "../../component/Loading/LoadingSpinner";
import useLoading from "../../component/Loading/useLoading";

const Customers = () => {
    const [show, setShow] = useState(false);
    const [customers, setCustomers] = useState([]); // Use Customers, not data
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email:''
      });
    const [editMode, setEditMode] = useState(false); // Add editMode state
    const [editedCustomersId, setEditedCustomerId] = useState(null);
    const [isCumtomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [singleCustomer, setSingleCustomer] = useState('')
    const isLoading = useLoading();

    //pagination start
    const itemsPerPage = 4; // Number of items to display per page

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = customers.slice(offset, offset + itemsPerPage);
    //Pagination end
    const handleClose = () => {
        setShow(false)
        setEditMode(false);
        setFormData({ name: '', phone:'', email:''});
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        getcustomers();
    }, []);

    function getcustomers() {
        axios
          .get('http://localhost/api/customers')
          .then((response) => {
            const customersData = response.data;
            setCustomers(customersData); // Update state with fetched data
          })
          .catch((error) => {
            console.error('Error fetching  data:', error);
          });
      }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost/api/customers',formData)
            .then((response) => {
                // console.log(response)
                const createdCustomer = response.data.customer;
                setCustomers([...customers, createdCustomer])
                setFormData({ name: '', phone:'', email:''});
                handleClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Customers data has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        // console.log("click submit")
    }

    function handleEdit(id) {
        axios.get(`http://localhost/api/customers/${id}/edit`)
            .then((response) => {
                console.log(response)
                const customersData = response.data.customer;
                setFormData({
                    name: customersData.name,
                    phone: customersData.phone,
                });
                setEditMode(true);
                setEditedCustomerId(id);
                handleShow();
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }
    function handleUpdate(e, id) {
        e.preventDefault(); // Prevent the form from submitting as it's handled manually via axios
        // console.log(editedCustomersId)

        axios
          .put(`http://localhost/api/customers/${editedCustomersId}`, formData)
          .then((response) => {
            const updatedCustomer = response.data.customer;
            const updatedCustomers = customers.map((customer) =>
              customer.id === id ? updatedCustomer : customer
            );
            setCustomers(updatedCustomers);
            setFormData({ name: '' ,phone:''});
            setEditMode(false);
            handleClose();
            Swal.fire({
                icon: 'success',
                title: 'Update has been saved',
                showConfirmButton: false,
                timer: 1500
              })
          })
          .catch((error) => {
            console.error('Error updating supplier:', error);
          });
      }

    function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this customer!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost/api/customers/${id}`)
                    .then((response) => {
                        const updatedCustomers = customers.filter((customer) => customer.id !== id);
                        setCustomers(updatedCustomers);
                    })
                    .catch((error) => {
                        console.error('Error fetching customer data:', error);
                    });
            }
        });
    }
    function handleCustomerShow(id){
        axios.get(`http://localhost/api/customers/${id}`)
            .then((response) => {
                const singleCustomer = response.data.customer
                setIsCustomerModalOpen(true)
                setSingleCustomer(singleCustomer)
            })
            .catch((error) => {
                console.error("Error updating customers:", error);
            });
    }
// console.log(customers)

  return (
      <AuthLayout
          header={
              <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  Customers
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
                          {editMode ? "Edit Customer" : "Add Customer"}
                      </Modal.Title>
                      <Button variant="link" onClick={handleClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                  </Modal.Header>
                  <Modal.Body>
                      <Form
                          onSubmit={(e) =>
                              editMode
                                  ? handleUpdate(e, editedCustomersId)
                                  : handleSubmit(e)
                          }
                      >
                          <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                          >
                              <Form.Label>Customer Name</Form.Label>
                              <Form.Control
                                  type="text"
                                  placeholder="Customer Name"
                                  value={formData.name}
                                  onChange={(e) =>
                                      setFormData({
                                          ...formData,
                                          name: e.target.value,
                                      })
                                  }
                                  autoFocus
                              />
                          </Form.Group>
                          {!editMode ?
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Customer Email</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Customer email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    email: e.target.value,
                                    })
                                }
                                autoFocus
                                />
                            </Form.Group>
                            : ''
                            }
                          <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                          >
                              <Form.Label>Cutomer Phone</Form.Label>
                              <Form.Control
                              type="text"
                              placeholder="Cutomer Phone"
                              value={formData.phone}
                              onChange={(e) =>
                                  setFormData({
                                      ...formData,
                                      phone: e.target.value,
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
                              <h3 className="card-title">Customers Table</h3>
                              <button
                                  type="submit"
                                  className="btn btn-primary  float-right"
                                  onClick={handleShow}
                              >
                                  Add customer
                              </button>
                          </div>

                          <div className="card-body">
                              {isLoading ? <LoadingSpinner/> :
                                  <table className="table table-bordered">
                                      <thead>
                                      <tr>
                                          <th style={{width: 10}}>#</th>
                                          <th>Tittle</th>
                                          <th>Phone</th>
                                          <th style={{width: 20}}>Action</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      {currentItems.map((item) => (
                                          <tr key={item.id}>
                                              <td>{item.id}</td>
                                              <td>{item.name}</td>
                                              <td>{item.phone}</td>
                                              <td>
                                                  <div className="btn-group btn-group-sm">
                                                      <a
                                                          className="btn btn-success"
                                                      >
                                                          <FontAwesomeIcon
                                                              icon={faEye}
                                                              onClick={() =>
                                                                  handleCustomerShow(
                                                                      item.id
                                                                  )
                                                              }
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
                              }
                          </div>
                          {/* pagination will be here */}
                          <Pagination
                                pageCount={Math.ceil(customers.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                            />
                      </div>
                  </div>
              </div>
              {isCumtomerModalOpen && (
                    <CustomersShow
                    isOpen ={isCumtomerModalOpen}
                    isClose={setIsCustomerModalOpen}
                    singleCustomer = {singleCustomer}
                    />
                )}
          </div>
      </AuthLayout>
  );
}

export default Customers
