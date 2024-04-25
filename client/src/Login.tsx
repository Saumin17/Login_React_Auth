import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const navigate = useNavigate();

    useEffect(() =>{
        sessionStorage.clear();
    },[]);

    const proceedLogin = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(validate()){
            fetch("http://localhost:8000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
            }).then((res)=>{
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }).then((resp)=>{
                console.log(resp)
                if(Object.keys(resp).length===0){
                    toast.error('Please enter valid email');
                }
                else{
                    if(resp.password===password){
                        toast.success('Successfully Logged in!')
                        sessionStorage.setItem("email",email);
                        navigate('/')
                    }
                    else{
                        toast.error('Please enter valid credentials')
                    }
                }
            }).catch((err)=>{
                toast.error("Login failed due to: "+err.message);
            });
        }

    }

    const validate = () => {
        let result=true;
        if(email === null || email ===''){
            result = false;
            toast.warning("Please enter email");
        }
        if(password === null || password ===''){
            result = false;
            toast.warning("Please enter Password");
        }
        return result;
    }
    return(
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{marginTop:'100px'}}>
                <form className="container" onSubmit={proceedLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Login here!</h1>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email<span className="errmsg">*</span></label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/register'}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
