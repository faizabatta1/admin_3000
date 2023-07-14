import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from '../components/Navbar';

const UpdateSubCategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchSubCategory();
        fetchCategories();
    }, []);

    const fetchSubCategory = async () => {
        try {
            const response = await axios.get(`https://technicians.onrender.com/subCategories/self/${id}`);
            const subCategoryData = response.data;
            setName(subCategoryData.name);
            setCategory(subCategoryData.parentCategory._id);
            setPrice(subCategoryData.price);
        } catch (error) {
            console.log('Error fetching subcategory:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://technicians.onrender.com/categories');
            setCategories(response.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const handleUpdateSubCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://technicians.onrender.com/subCategories/${id}`, {
                name,
                parentCategory: category,
                price,
            });
            console.log('Subcategory updated successfully');
            // Perform any additional actions after successful update
            navigate(`/subcategories/${category}`);
        } catch (error) {
            console.log('Error updating subcategory:', error);
            // Handle error case
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="container">
                <h2 className="mt-3">Update Subcategory</h2>

                <form onSubmit={handleUpdateSubCategory}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="btn btn-primary">
                            Update Subcategory
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateSubCategoryPage;
