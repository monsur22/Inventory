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
import './pos.css'

const Pos = () => {
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

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingProductIndex].quantity += 1;
          setCart(updatedCart);
        } else {
          setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    const incrementQuantity = (product) => {
        const updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCart(updatedCart);
      };

      const decrementQuantity = (product) => {
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCart(updatedCart);
      };

      const calculateTotalPrice = (product) => {
        return product.price * product.quantity;
      };

      const calculateSubtotal = () => {
        let subtotal = 0;
        for (const item of cart) {
          subtotal += item.price * item.quantity;
        }
        return subtotal;
      };
      const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
      };

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
    console.log(cart);

    return (
        <AuthLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    POS
                </h2>
            }
        >
            <div>

        <div className="app-container">
            <div className="product-page-container">
                <h3>Product List</h3>
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={`http://localhost/${product.image_path}`} alt={product.title}/>
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                            <button  onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart">
                <h2>Product Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <ul>
                            {cart.map((cartItem) => (
                                <li  className="cart-item">
                                    <div className="product-details">
                                        {/* <img src={`http://localhost/${cartItem.image_path}`} /> */}
                                        <div className="product-info">
                                            <h3>{cartItem.title}</h3>

                                        </div>
                                    </div>
                                    <div className="quantity-controls">
                                        <button onClick={() => decrementQuantity(cartItem)}>-</button>
                                        <span>{cartItem.quantity}</span>
                                        <button onClick={() => incrementQuantity(cartItem)}>+</button>
                                    </div>
                                    <p>$ {calculateTotalPrice(cartItem)}</p>
                                    <button className="remove-button" onClick={() => removeFromCart(cartItem.id)}>Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <p>Subtotal: $ {calculateSubtotal()} </p>
                        </div>
                    </>

                )}
                    <button >Pay Cash</button>

            </div>
        </div>

            </div>
        </AuthLayout>
    );
};

export default Pos;
