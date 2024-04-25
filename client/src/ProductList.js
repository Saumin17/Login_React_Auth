import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
    console.log('Deleting product with ID:', id);
      await axios.delete(`http://localhost:8000/product/${id}`);
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div class="container text-center" style={{marginTop: 20, marginBottom: 20}}>
        <h2 class="mb-4">Products</h2>
        <ul class="list-group">
            {products.map(product => (
            <li key={product.id} class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                <div>
                <strong>{product.id}</strong> - <strong>{product.name}</strong> - {product.description} - ${product.price} - Quantity: {product.quantity}
                </div>
                <button type="button" class="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
     </div>
  );
};

export default ProductList;
