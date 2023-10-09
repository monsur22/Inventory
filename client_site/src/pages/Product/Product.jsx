import React from 'react';
import AuthLayout from "../../component/layout/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ProductShow from "./ProductShow";
import Pagination from '../Pagination/Pagination';
import Swal from 'sweetalert2';
import LoadingSpinner from "../../component/Loading/LoadingSpinner";
import useLoading from "../../component/Loading/useLoading";


const Product = () => {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]); // Use categories, not data
    const [suppliers, setSuppliers] = useState([]); // Use suppliers, not data
    const [products, setProducts] = useState([]); // Use suppliers, not data
    const [singleProduct, setSingleProduct] = useState('')

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productModalShow, setProductModalShow] = useState(false);


    const [formData, setFormData] = useState({
        title: "",category_id :"",supplier_id :"",price:"",quantity:"",description:"",image:""
    });
    const [editMode, setEditMode] = useState(false); // Add editMode state
    const [editedProductId, setEditedProductId] = useState(null);
    const isLoading = useLoading();
//pagination start
    const itemsPerPage = 4; // Number of items to display per page

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
//Pagination end

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProducts();
        getCategory();
        getSupplier();
    }, []);
    const resetForm = () => {
        setFormData({
          title: "",
          category_id: "",
          supplier_id: "",
          price: "",
          quantity: "",
          description: "",
          image: ""
        });
      };
    function getCategory() {
        axios
            .get("http://localhost/api/category")
            .then((response) => {
                const categoriesData = response.data;
                setCategories(categoriesData); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }
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
    function getProducts() {
        axios
            .get("http://localhost/api/product")
            .then((response) => {
                const productsData = response.data;
                setProducts(productsData); // Update state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost/api/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("response after create:",response)
                const createdProduct = response.data.product;
                // setProducts([...products, createdProduct]);
                setProducts((products) => [...products, createdProduct]);

                resetForm();
                handleClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Product has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });

        console.log("click submit");
    }

    function handleEdit(id) {
        // You may want to fetch the category data to pre-fill the form with existing values
        axios
            .get(`http://localhost/api/product/${id}/edit`)
            .then((response) => {
                console.log(response);
                const productData = response.data.product;
                setFormData({
                    title: productData.title,
                    description: productData.description,
                    price: productData.price,
                    quantity: productData.quantity,
                    supplier_id: productData.supplier_id,
                    category_id: productData.category_id,
                    image_path: productData.image_path,
                });
                setEditMode(true);
                setEditedProductId(id);
                handleShow();
            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }
    function handleUpdate(e, id) {
        e.preventDefault(); // Prevent the form from submitting as it's handled manually via axios
        axios
            .post(`http://localhost/api/product/update/${editedProductId}`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response)
                const updatedProduct = response.data.product;
                const updatedProducts = products.map((product) =>
                    product.id === id ? updatedProduct : product
                );
                setProducts( updatedProducts);
                resetForm();
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
                console.error("Error updating products:", error);
            });
    }

    function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this category!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost/api/product/${id}`)
                    .then((response) => {
                        const updatedProducts= products.filter(
                            (product) => product.id !== id
                        );
                        setProducts(updatedProducts);
                    })
                    .catch((error) => {
                        console.error("Error fetching product data:", error);
                    });
            }
        });
    }
    function handleProductShow(id){
        console.log(id)
        axios
            .get(`http://localhost/api/product/${id}`)
            .then((response) => {
                const singleProduct = response.data.product
                console.log(singleProduct)
                setIsProductModalOpen(true)
                setSingleProduct(singleProduct)
            })
            .catch((error) => {
                console.error("Error updating products:", error);
            });

        console.log(isProductModalOpen)

    }
    console.log(products);

    return (
        <AuthLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Product
                </h2>
            }
        >
            <div>
                {/* form start */}
                <Modal
                    size="lg"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title className="card-primary">
                            {editMode ? "Edit Product" : "Add Product"}
                        </Modal.Title>
                        <Button variant="link" onClick={handleClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            onSubmit={(e) =>
                                editMode
                                    ? handleUpdate(e, editedProductId)
                                    : handleSubmit(e)
                            }
                        >
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label>Product Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Category Title"
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
                                controlId="exampleForm.ControlSelect1"
                            >
                                <Form.Label>Select Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.category_id}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlSelect1"
                            >
                                <Form.Label>Select Supplier</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={formData.supplier_id}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            supplier_id: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select a Supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.title}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Price"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            price: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Quantity"
                                    value={formData.quantity}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            quantity: e.target.value,
                                        })
                                    }
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            image:
                                                e.target.files[0] || null,
                                        });
                                    }}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Product Description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
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
                                <h3 className="card-title">Product Table</h3>
                                <button
                                    type="submit"
                                    className="btn btn-primary  float-right"
                                    onClick={handleShow}
                                >
                                    Add Product
                                </button>
                            </div>

                            <div className="card-body">
                                {isLoading ? <LoadingSpinner/> :
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th style={{width: 10}}>#</th>
                                            <th>Tittle</th>
                                            <th>Supplier</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Image</th>
                                            <th style={{width: 20}}>
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.supplier.title}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    <img height={'50px'} src={`http://localhost/${item.image_path}`}
                                                         alt="Product"/>
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <a
                                                            className="btn btn-success"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEye}
                                                                onClick={() =>
                                                                    handleProductShow(
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
                                pageCount={Math.ceil(products.length / itemsPerPage)}
                                handlePageChange={handlePageChange}
                                />
                        </div>
                    </div>
                </div>
                {isProductModalOpen && (
                    <ProductShow
                    isOpen ={isProductModalOpen}
                    isClose={setIsProductModalOpen}
                    singleProduct = {singleProduct}
                    />
                )}
            </div>
        </AuthLayout>
    );
};

export default Product;
