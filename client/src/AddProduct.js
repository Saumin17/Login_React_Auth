import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/product', formData);

      window.location = '/';
      setFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        quantity: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
            <h2 class="text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                <label>Product ID:</label>
                <input type="text" class="form-control" name="id" value={formData.id} onChange={handleChange} />
                </div>
                <div class="form-group">
                <label>Name:</label>
                <input type="text" class="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div class="form-group">
                <label>Description:</label>
                <input type="text" class="form-control" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div class="form-group">
                <label>Price:</label>
                <input type="text" class="form-control" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div class="form-group">
                <label>Quantity:</label>
                <input type="text" class="form-control" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block " style={{marginTop: 20}}>Add Product</button>
                </div>
            </form>
            </div>
        </div>
        </div>
  );
};

export default AddProduct;
