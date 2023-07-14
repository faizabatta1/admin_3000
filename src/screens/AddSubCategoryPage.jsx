import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import { Form, Button } from 'react-bootstrap';


const AddSubCategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleAddSubCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/subcategories', {
                name,
                price,
                parentCategory: id,
            },{
                headers:{
                    'Content-Type':'application/json; charset=utf-8'
                }
            });

            if (response.status === 201) {
                console.log('Subcategory added successfully');
                navigate(`/subcategories/${id}`);
            } else {
                console.log('Error adding subcategory');
                // Handle error case
            }
        } catch (error) {
            console.log('Error adding subcategory:', error);
            // Handle error case
        }
    };

    return (
        <>
            <CustomNavbar />

            <div className="container">
                <h1>Add SubCategory</h1>

                <Form onSubmit={handleAddSubCategory}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subcategory name"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter subcategory price"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add SubCategory
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default AddSubCategoryPage;
