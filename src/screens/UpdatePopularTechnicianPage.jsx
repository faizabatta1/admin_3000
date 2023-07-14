import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Image, Spinner } from 'react-bootstrap';
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
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTechnician();
    }, []);

    const fetchTechnician = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/popularTechnicians/${id}`);
            setTechnician(response.data);
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setPreviewImage(response.data.image); // Set the current image for preview
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching technician:', error);
            setIsLoading(false);
        }
    };

    const handleUpdateTechnician = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);

            let response = await axios.put(`http://localhost:3000/popularTechnicians/${id}`, formData);
            alert(response.data);
            if (response.status === 200) {
                navigate('/popularTechnicians');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating technician:', error);
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        setPreviewImage(URL.createObjectURL(selectedImage)); // Set the preview image URL
    };

    return (
        <>
            <CustomNavbar />
            <div className="container mt-4">
                <h1>Update Popular Technician</h1>
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : technician ? (
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
                            {previewImage && <Image src={previewImage} alt="Current Technician" className="mb-3" thumbnail />}
                            <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
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
