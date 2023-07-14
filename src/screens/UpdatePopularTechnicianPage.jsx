import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import CustomNavbar from '../components/Navbar';

const UpdatePopularTechnicianPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [technician, setTechnician] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchTechnician();
    }, []);

    const fetchTechnician = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/popularTechnicians/${id}`);
            setTechnician(response.data);
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
        } catch (error) {
            console.error('Error fetching technician:', error);
        }
    };

    const handleUpdateTechnician = async () => {
        try {
            const updatedTechnician = { name, description, price };
            const formData = new FormData();
            formData.append('image', image);
            formData.append('technician', JSON.stringify(updatedTechnician));

            await axios.put(`http://localhost:3000/popularTechnicians/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/popularTechnicians');
        } catch (error) {
            console.error('Error updating technician:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <>
            <CustomNavbar />
            <div className="container mt-4">
                <h1>Update Popular Technician</h1>
                {technician ? (
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>

                        <Button variant="primary" onClick={handleUpdateTechnician}>
                            Update
                        </Button>
                    </Form>
                ) : (
                    <p>Loading technician data...</p>
                )}
            </div>
        </>
    );
};

export default UpdatePopularTechnicianPage;
