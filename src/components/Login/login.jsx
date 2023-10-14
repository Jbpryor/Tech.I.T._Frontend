import './login.scss';
import 'boxicons/css/boxicons.min.css';
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ demoUser, setDemoUser ] = useState(false);

    const handleDemoUser = () => {
        setEmail('demo@example.com');
        setPassword('demopassword');
        setDemoUser(true);
    }

    const handleFacebookLogin = () => {
        
    }

    const handleGoogleLogin = () => {

    }

    const handleForgotPassword = () => {

    }

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleLogin = () => {
        demoUser ? (navigate('/demoLogin')) : (navigate('/'))
    }

    return (
        <section className='login-container'>
            <div className="login-form">
                <div className="login-content">
                    <div className='login-title'>Login</div>
                    <form className='login-form-container' action="#">
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        </div>

                        <div className="field input-field">
                            <input type="password" placeholder="Password" className="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        </div>

                        <div className="form-link">
                            <a href="#" className="forgot-pass" onClick={handleForgotPassword}>Forgot password?</a>
                        </div>

                        <div className="field login-button">
                            <button onClick={handleLogin}>Login</button>
                        </div>                
                    </form> 
                    <div className="form-link">
                        <span>New user? <a href="#" className="link signup-link" onClick={handleSignup}>Signup</a></span>
                    </div>
                </div>
                
                <div className="line"></div>

                <div className="media-options">
                    <a href="#" className="field facebook" onClick={handleFacebookLogin}>
                        <i className='bx bxl-facebook facebook-icon'></i>
                        <span>Login with Facebook</span>
                    </a>                  
                </div>

                <div className="media-options">
                    <a href="#" className="field google" onClick={handleGoogleLogin}>
                        <img src="images/google.png" alt="" className="google-img"></img>
                        <span>Login with Google</span>
                    </a>                  
                </div>

                <div className="media-options">
                    <a href="#" className="field demo" onClick={handleDemoUser}>
                        <i className='bx bxs-user-circle demo-icon' ></i>
                        <span>Login as Demo User</span>
                    </a>                  
                </div>
            </div>
        </section>
    )
}

export default Login;