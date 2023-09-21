import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getCategory } from '../../redux/action/categoryActions';
import {useDispatch, useSelector} from "react-redux";

const Category = () => {
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState({
        isEditing: false,
        editItemId: null, // Store the ID of the category being edited

    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.category);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);
    console.log(categories)

    function handleSubmit(e) {
        e.preventDefault();
        console.log("click submit")
    }

        // const handleEdit = (id) => {
    //     setEditData({
    //         isEditing: true,
    //         editItemId: id,
    //     });
    //     handleShow(); // Show the modal
    // };

    function handleDelete(id) {

    }


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
            <Modal.Header closeButton>
                <Modal.Title className="card-primary">
                {editData.isEditing ? 'Edit Category' : 'Add Category'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Category Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Category Title"
                            // value={editData.isEditing ? category_edit.title : data.title}
                            // onChange={(e) =>
                            //     setData("title", e.target.value)
                            // }
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
                        {editData.isEditing ? 'Update' : 'Create'}
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

                                                <a href='' className="btn btn-info">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faEdit
                                                        }
                                                        // onClick={() => handleEdit(item.id)}
                                                    />
                                                </a>
                                                <a className="btn btn-danger">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faTrash
                                                        }
                                                        // onClick={() =>
                                                        //     handleDelete(
                                                        //         item.id
                                                        //     )
                                                        // }
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