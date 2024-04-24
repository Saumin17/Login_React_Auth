import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const usenavigate = useNavigate();

    useEffect(()=>{
        let username = sessionStorage.getItem("username");
        if(username === null || username ===""){
            usenavigate('/login');
        }
    },[]);

    return(
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link style={{float: "right"}} to={'/login'}>Logout</Link>
            </div>
            <h1 className="text-center">Welcome to my homepage</h1>
        </div>
    );
}

export default  Home;