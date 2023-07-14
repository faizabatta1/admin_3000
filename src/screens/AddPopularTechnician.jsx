import React, { useState } from 'react';
import { Form, Button, Container, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

const AddPopularTechnicianPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [link, setLink] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setNameError('');
    setDescriptionError('');
    setPriceError('');

    let isError = false;

    if (!name) {
      setNameError('Name is required');
      isError = true;
    }

    if (!description) {
      setDescriptionError('Description is required');
      isError = true;
    }

    if (!price) {
      setPriceError('Price is required');
      isError = true;
    }

    if (isError) {
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('link', link);

      let response = await axios.post('http://localhost:3000/popularTechnicians', formData);
      if (response.status === 201) {
        navigate('/popularTechnicians');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed To Add A New Product:', error);
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  return (
      <>
        <CustomNavbar />

        <Container>
          {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Adding product...</p>
              </div>
          ) : (
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
                  {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                  />
                  {descriptionError && <Form.Text className="text-danger">{descriptionError}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                  />
                  {priceError && <Form.Text className="text-danger">{priceError}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                  />
                </Form.Group>

                {imagePreview && <Image src={imagePreview} alt="Preview" fluid className="mb-3" />}

                <Form.Group controlId="formLink">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                  Add Product
                </Button>
              </Form>
          )}
        </Container>
      </>
  );
};

export default AddPopularTechnicianPage;
