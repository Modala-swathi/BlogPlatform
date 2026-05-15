import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './AuthForms.css';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name : "", email : "", password : "", cpassword : ""});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    let navigate = useNavigate();

    const calculatePasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[!@#$%^&*]/.test(pwd)) strength++;
        return strength;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!credentials.name.trim() || !credentials.email.trim() || !credentials.password.trim() || !credentials.cpassword.trim()) {
            props.showAlert("Please fill in all fields","danger");
            return;
        }

        if(credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match","danger");
            return;
        }

        if(credentials.password.length < 5) {
            props.showAlert("Password should be at least 5 characters","danger");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method : 'POST',
                headers : {
                    "Content-Type" : 'application/json'
                },
                body : JSON.stringify({name : credentials.name, email : credentials.email, password : credentials.password})
            });
            const json = await response.json()

            if(json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert("Account created successfully","success")
            }
            else {
                props.showAlert(json.error || "Account creation failed","danger")
            }
        } catch (error) {
            props.showAlert("Signup failed. Please try again.","danger")
        } finally {
            setLoading(false);
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value})
        
        if(name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    }

    const isFormValid = credentials.name.trim() && 
                       credentials.email.trim() && 
                       credentials.password.trim() && 
                       credentials.cpassword.trim() &&
                       credentials.password === credentials.cpassword;

    const getPasswordStrengthLabel = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength === 1) return 'Weak';
        if (passwordStrength === 2) return 'Fair';
        if (passwordStrength === 3) return 'Good';
        return 'Strong';
    }

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength === 1) return 'danger';
        if (passwordStrength === 2) return 'warning';
        if (passwordStrength === 3) return 'info';
        return 'success';
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1><i className="fa-solid fa-user-plus"></i> Create Account</h1>
                    <p>Join our community and start sharing your thoughts</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            <i className="fa-solid fa-user"></i> Full Name
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name"  
                            onChange={onChange}
                            placeholder="Your full name"
                            minLength={5}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            <i className="fa-solid fa-envelope"></i> Email Address
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
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
                                name="password"  
                                onChange={onChange}
                                placeholder="Create a strong password"
                                minLength={5}
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
                        {credentials.password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div className={`strength-fill strength-${getPasswordStrengthColor()}`} style={{width: `${(passwordStrength / 4) * 100}%`}}></div>
                                </div>
                                <small className={`strength-label strength-${getPasswordStrengthColor()}`}>
                                    Strength: {getPasswordStrengthLabel()}
                                </small>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpassword" className="form-label">
                            <i className="fa-solid fa-lock-check"></i> Confirm Password
                        </label>
                        <div className="password-input-group">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="form-control" 
                                id="cpassword" 
                                name="cpassword" 
                                onChange={onChange}
                                placeholder="Re-enter your password"
                                minLength={5}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label="Toggle confirm password visibility"
                            >
                                <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {credentials.password && credentials.cpassword && (
                            credentials.password === credentials.cpassword ? (
                                <small className="success-text">
                                    <i className="fa-solid fa-check-circle"></i> Passwords match
                                </small>
                            ) : (
                                <small className="error-text">
                                    <i className="fa-solid fa-exclamation-circle"></i> Passwords do not match
                                </small>
                            )
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-submit" 
                        disabled={!isFormValid || loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa-solid fa-spinner spinner"></i> Creating account...
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-user-plus"></i> Sign Up
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
