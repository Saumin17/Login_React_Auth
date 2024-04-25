import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState
  ({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/product', formData);

      window.location.href = '/';
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
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <h2 className="text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Product ID:</label>
                <input type="text" className="form-control" name="id" value={formData.id} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Description:</label>
                <input type="text" className="form-control" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Price:</label>
                <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label>Quantity:</label>
                <input type="text" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block" style={{marginTop: 20}}>Add Product</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
};

export default AddProduct;
