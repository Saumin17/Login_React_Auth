import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const Register: React.FC = () => {

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [gender, setGender] = useState<string>("female");

    const navigate = useNavigate();
    
    const isValidate = () => {
        let isProceed = true;
        let errorMessage = "Please enter the value in";
        if(id === null || id === ''){
            isProceed = false;
            errorMessage += ' Username';
        }
        if(password === null || password === ''){
            isProceed = false;
            errorMessage += ' Password';
        }
        if(email === null || email === ''){
            isProceed = false;
            errorMessage += ' Email';
        }
        if(name === null || name === ''){
            isProceed = false;
            errorMessage += ' Full Name';
        }
        if(!isProceed){
            toast.warning(errorMessage)
        }
        else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isProceed = false;
                toast.warning("Please enter the valid email")
            }
        }
        return isProceed;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
       
        e.preventDefault();
        let regObj={id, name, password, email, phone, country, address, gender};
        if(isValidate()){
            fetch("http://localhost:8000/user",{
                method: "POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(regObj)
            }).then((res)=>{
                toast.success('Registered successfully')
                navigate('/login');
            }).catch((err)=>{
                toast.error('Failed : '+err.message);
            });
        }
    }

    return(
        <div>
            <div className="offset-lg-3 col-lg-6" style={{marginTop:'100px'}}>
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Register here!</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email<span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password<span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Username<span className="errmsg">*</span></label>
                                        <input value={id} onChange={e => setId(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name<span className="errmsg">*</span></label>
                                        <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone<span className="errmsg">*</span></label>
                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <select value={country} onChange={e => setCountry(e.target.value)} className="form-control">
                                            <option>Canada</option>
                                            <option>USA</option>
                                            <option>India</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea value={address} onChange={e => setAddress(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br/>
                                        <input type="radio" checked={gender==='male'} onChange={e => setGender(e.target.value)} name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio" checked={gender==='female'} onChange={e => setGender(e.target.value)} name="gender" value="female" className="app-check"></input>
                                        <label>Female</label>
                                        <input type="radio" checked={gender==='other'} onChange={e => setGender(e.target.value)} name="gender" value="other" className="app-check"></input>
                                        <label>Other</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button> |
                            <Link to="/login" className="btn btn-danger">Back</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
