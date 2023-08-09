import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Form, Image } from "react-bootstrap";
import CustomNavbar from "../components/Navbar";

const CreateSliderScreen = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);

        // Display the selected image preview
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    };

    const handleUploadImage = () => {
        const formData = new FormData();
        formData.append("image", image);

        axios
            .post("http://localhost:3000/sliders", formData)
            .then(() => {
                // Redirect to the SliderImages page after successful upload
                window.location.href = "/sliders";
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <CustomNavbar />

            <Container className="my-4">
                <h1>Create Slider</h1>
                <Form>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange}  required/>
                    </Form.Group>

                    {/* Display the selected image preview */}
                    {imageUrl && <Image src={imageUrl} alt="Selected" className="mt-3 mb-3" fluid />}

                    <div className="d-flex">
                        <Button variant="primary" onClick={handleUploadImage} className="me-2">
                            Upload
                        </Button>

                        <Button as={Link} to="/sliders" variant="secondary">
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default CreateSliderScreen;
