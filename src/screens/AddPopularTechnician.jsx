import React, { useState } from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';

const AddPopularTechnicianPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);

      let response = await axios.post('http://localhost:3000/popularTechnicians', formData,);
      alert(response.data)
      if(response.status == 201){
        navigate('/popularTechnicians');
      }
    } catch (error) {
      console.error('Failed To Add A nEW Product:', error);
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


          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
              />
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

            {imagePreview && (
                <Image src={imagePreview} alt="Preview" fluid className="mb-3" />
            )}

            <Button variant="primary" type="submit" className="mt-4">
              Add Product
            </Button>
          </Form>
        </Container>
      </>
  );
};

export default AddPopularTechnicianPage;
