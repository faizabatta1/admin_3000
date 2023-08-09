import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Container, Row, Col, Modal } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";

const SliderImages = () => {
    const [sliderImages, setSliderImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);

    useEffect(() => {
        // Fetch all slider images from the backend
        axios
            .get("https://adminzaindev.zaindev.com.sa/sliders")
            .then((response) => setSliderImages(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleDeleteImage = (id) => {
        setDeleteImageId(id);
        setShowModal(true);
    };

    const confirmDeleteImage = () => {
        // Delete the slider image with the given ID from the backend
        axios
            .delete(`https://adminzaindev.zaindev.com.sa/sliders/${deleteImageId}`)
            .then(() => {
                // Update the sliderImages state to remove the deleted image
                setSliderImages((prevImages) => prevImages.filter((image) => image._id !== deleteImageId));
                setShowModal(false);
            })
            .catch((error) => console.error(error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteImageId(null);
    };

    return (
        <>
            <CustomNavbar />

            <Container className="my-4">
                <h1>Slider Images</h1>
                <Button as={Link} to="/sliders/create" variant="primary" className="mb-2">
                    Create Slider
                </Button>

                {sliderImages.length === 0 && <p>No sliders available.</p>}

                <Row xs={1} md={3} className="g-4">
                    {sliderImages.map((image) => (
                        <Col key={image._id}>
                            <Card>
                                <Card.Img variant="top" src={image.link} style={{ height: "300px", objectFit: "cover" }} />
                                <Card.Body>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteImage(image._id)}
                                        className="float-end"
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Confirmation Modal */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDeleteImage}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </>
    );
};

export default SliderImages;
