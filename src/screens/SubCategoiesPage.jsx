import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import CustomNavbar from '../components/Navbar';
import { Table } from 'react-bootstrap';

const SubCategoriesPage = () => {
    const { id } = useParams();
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        fetchSubCategories();
    }, []);

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/subCategories/${id}`);
            setSubCategories(response.data);
        } catch (error) {
            console.log('Error fetching subcategories:', error);
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="container">
                <div className="d-flex justify-content-end mt-4">
                    <Link to={`/subcategories/${id}/create`} className="btn btn-primary">
                        Add SubCategory
                    </Link>
                </div>

                <h1>SubCategories Page</h1>
                {subCategories.length === 0 ? (
                    <p>No subcategories available.</p>
                ) : (
                    <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subCategories.map((subcategory) => (
                            <tr key={subcategory._id}>
                                <td>{subcategory.name}</td>
                                <td>{subcategory.parentCategory.name}</td>
                                <td>{subcategory.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </>
    );
};

export default SubCategoriesPage;
