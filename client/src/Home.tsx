import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        let email = sessionStorage.getItem("email");
        if(email === null || email ===""){
            navigate('/login');
        }
    },[navigate]);

    return(
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link style={{float: "right"}} to={'/login'}>Logout</Link>
            </div>
            <h1 className="text-center">Welcome to my homepage</h1>
            <h1 className="text-center">----------------------</h1>
            <AddProduct />
            <ProductList />
        </div>
    );
}

export default Home;
