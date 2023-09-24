import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const Category = () => {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]); // Use categories, not data
    const [formData, setFormData] = useState({
        title: '',
      });
    const [editMode, setEditMode] = useState(false); // Add editMode state
    const [editedCategoryId, setEditedCategoryId] = useState(null);

    const handleClose = () => {
        setShow(false)
        setEditMode(false);
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        getCategory();
    }, []);

    function getCategory() {
        axios
          .get('http://localhost/api/category')
          .then((response) => {
            const categoriesData = response.data;
            setCategories(categoriesData); // Update state with fetched data
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });
      }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost/api/category',formData)
            .then((response) => {
                const createdCategory = response.data.category;
                setCategories([...categories, createdCategory])
                setFormData({ title: ''});
                handleClose();
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        console.log("click submit")
    }

    function handleEdit(id) {
        // You may want to fetch the category data to pre-fill the form with existing values
        axios.get(`http://localhost/api/category/${id}/edit`)
            .then((response) => {
                const categoryData = response.data.category;
                setFormData({
                    title: categoryData.title,
                    desc: categoryData.desc,
                });
                setEditMode(true);
                setEditedCategoryId(id);
                handleShow();
            })
            .catch((error) => {
                console.error('Error fetching category data:', error);
            });
    }
    function handleUpdate(e, id) {
        e.preventDefault(); // Prevent the form from submitting as it's handled manually via axios
        console.log(editedCategoryId)

        axios
          .put(`http://localhost/api/category/${editedCategoryId}`, formData)
          .then((response) => {
            const updatedCategory = response.data.category;
            const updatedCategories = categories.map((category) =>
              category.id === id ? updatedCategory : category
            );
            setCategories(updatedCategories);
            setFormData({ title: '' });
            setEditMode(false);
            handleClose();
          })
          .catch((error) => {
            console.error('Error updating category:', error);
          });
      }

    function handleDelete(id) {
        axios.delete(`http://localhost/api/category/${id}`)
            .then((response) => {
                const updatedCategories = categories.filter((category) => category.id !== id);
                setCategories(updatedCategories);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }
console.log(categories)

  return (
    <AuthLayout
    header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Category
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
                {editMode ? 'Edit Category' : 'Add Category'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Form onSubmit={editMode ? handleUpdate : handleSubmit}> */}
                <Form onSubmit={(e) => editMode ? handleUpdate(e, editedCategoryId) : handleSubmit(e)}>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Category Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Category Title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            autoFocus
                        />

                    </Form.Group>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {editMode ? 'Update' : 'Create'}
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
                        <h3 className="card-title">Category Table</h3>
                        <button
                            type="submit"
                            className="btn btn-primary  float-right"
                            onClick={handleShow}
                        >
                            Add Category
                        </button>
                    </div>

                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: 10 }}>#</th>
                                    <th>Tittle</th>
                                    <th style={{ width: 20 }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((item)=>(
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

                                                <a  className="btn btn-info">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faEdit
                                                        }
                                                        onClick={() => handleEdit(item.id)}
                                                    />
                                                </a>
                                                <a className="btn btn-danger">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faTrash
                                                        }
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
  )
}

export default Category