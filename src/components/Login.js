import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForms.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email : "", password : ""});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!credentials.email || !credentials.password) {
            props.showAlert("Please fill in all fields","danger");
            return;
        }

        setLoading(true);
        
        try {
            const response = await fetch('https://blogplatform-ws0h.onrender.com/api/auth/login', {
                method : 'POST',
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify({email : credentials.email, password : credentials.password})
            });
            const json = await response.json()

            if(json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert("Logged in successfully","success")
            }
            else {
                props.showAlert(json.error || "Invalid credentials","danger")
            }
        } catch (error) {
            props.showAlert("Login failed. Please try again.","danger")
        } finally {
            setLoading(false);
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const isFormValid = credentials.email.trim() && credentials.password.trim();

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1><i className="fa-solid fa-sign-in-alt"></i> Login</h1>
                    <p>Welcome back! Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <i className="fa-solid fa-envelope"></i> Email Address
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={credentials.email} 
                            name="email" 
                            onChange={onChange}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            <i className="fa-solid fa-lock"></i> Password
                        </label>
                        <div className="password-input-group">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control" 
                                id="password" 
                                value={credentials.password} 
                                name="password" 
                                onChange={onChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-submit" 
                        disabled={!isFormValid || loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa-solid fa-spinner spinner"></i> Logging in...
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-sign-in-alt"></i> Login
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
