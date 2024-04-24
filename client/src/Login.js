import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const[username,usernamechange]=useState("");
    const[password,passwordchange]=useState("");
    
    const usenavigate = useNavigate();

    useEffect(() =>{
        sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) =>{
        e.preventDefault();
        if(validate()){
            fetch("http://localhost:8000/user/"+username).then((res)=>{
                return res.json();

            }).then((resp)=>{
                console.log(resp)
                if(Object.keys(resp).length===0){
                    toast.error('Please enter valid username');
                }
                else{
                    if(resp.password===password){
                        toast.success('Successfully Logged in!')
                        sessionStorage.setItem("username",username);
                        usenavigate('/')
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
        if(username === null || username ===''){
            result = false;
            toast.warning("Please enter username");
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
                <form className="container" onSubmit={ProceedLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Login here!</h1>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Username<span className="errmsg">*</span></label>
                                <input value={username} onChange={e=>usernamechange(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input value={password} onChange={e=>passwordchange(e.target.value)} className="form-control"></input>
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

export default  Login;