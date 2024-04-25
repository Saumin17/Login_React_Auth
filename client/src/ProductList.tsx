import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:8000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      console.log('Deleting product with ID:', id);
      await axios.delete(`http://localhost:8000/product/${id}`);
      
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container text-center" style={{marginTop: 20, marginBottom: 20}}>
        <h2 className="mb-4">Products</h2>
        <ul className="list-group">
            {products.map(product => (
            <li key={product.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                <div>
                <strong>{product.id}</strong> - <strong>{product.name}</strong> - {product.description} - ${product.price} - Quantity: {product.quantity}
                </div>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
     </div>
  );
};

export default ProductList;
