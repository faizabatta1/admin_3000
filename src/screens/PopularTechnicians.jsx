import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';

const PopularTechniciansPage = () => {
    const [popularTechnicians, setPopularTechnicians] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPopularTechnicians();
    }, []);

    const fetchPopularTechnicians = async () => {
        try {
            const response = await axios.get('http://localhost:3000/popularTechnicians');
            setPopularTechnicians(response.data);
        } catch (error) {
            console.error('Failed to fetch popular technicians:', error);
        }
    };

    const handleAddPopularTechnician = () => {
        navigate('/popularTechnicians/create');
    };

    const handleDeleteTechnician = async (technicianId) => {
        try {
            let response = await axios.delete(`http://localhost:3000/popularTechnicians/${technicianId}`);
            alert(response.data);
            if (response.status === 200) {
                fetchPopularTechnicians();
            }
        } catch (error) {
            console.error('Error deleting technician:', error);
        }
    };

    const handleDeleteAllTechnicians = async () => {
        try {
            let response = await axios.delete('http://localhost:3000/popularTechnicians');
            alert(response.data);
            if (response.status === 200) {
                fetchPopularTechnicians();
            }
        } catch (error) {
            console.error('Error deleting all technicians:', error);
        }
    };

    const handleUpdateTechnician = (technicianId) => {
        navigate(`/popularTechnicians/update/${technicianId}`);
    };

    return (
        <>
            <CustomNavbar />

            <Container>
                <div className="d-flex justify-content-end mt-5">
                    <div className="me-3">
                        <Button className="mb-3" variant="primary" onClick={handleAddPopularTechnician}>
                            Add Products
                        </Button>
                    </div>

                    <div className="">
                        <Button className="mb-3" variant="danger" onClick={handleDeleteAllTechnicians}>
                            Delete All
                        </Button>
                    </div>
                </div>

                <Table striped bordered hover className="m-4 text-center">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {popularTechnicians.map((technician) => (
                        <tr key={technician._id}>
                            <td>
                                <ImageComponent image={technician.image} />
                            </td>
                            <td>{technician.name}</td>
                            <td>{technician.description}</td>
                            <td>{technician.price}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteTechnician(technician._id)}>
                                    Delete
                                </Button>
                                <Button
                                    className="ms-2"
                                    variant="info"
                                    onClick={() => handleUpdateTechnician(technician._id)}
                                >
                                    Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default PopularTechniciansPage;
