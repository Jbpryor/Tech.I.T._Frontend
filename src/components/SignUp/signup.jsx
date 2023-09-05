import './signup.scss';
import 'boxicons/css/boxicons.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        
    }

    const handleFacebookSignUp = () => {
        
    }

    const handleGoogleSignUp = () => {

    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (          
        <section className='container forms show-signup'>   
            <div className="form signup">
                <div className="form-content">
                    <header>Sign Up</header>
                    <form action="#">
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="email"></input>
                        </div>

                        <div className="field input-field">
                            <input type="password" placeholder="Password" className="password"></input>
                        </div>

                        <div className="field input-field">
                            <input type="password" placeholder="Password" className="password"></input>
                        </div>

                        <div className="field signup-button">
                            <button onClick={handleSignUp}>Sign Up</button>
                        </div>                
                    </form> 
                    <div className="form-link">
                        <span>Already have an account? <a href="#" className="link login-link" onClick={ handleLogin }>Login</a></span>
                    </div>
                </div>
                
                <div className="line"></div>

                <div className="media-options">
                    <a href="#" className="field facebook" onClick={handleFacebookSignUp}>
                        <i className='bx bxl-facebook facebook-icon'></i>
                        <span>Sign Up with Facebook</span>
                    </a>                  
                </div>

                <div className="media-options">
                    <a href="#" className="field google" onClick={handleGoogleSignUp}>
                        <img src="images/google.png" alt="" className="google-img"></img>
                        <span>Sign Up with Google</span>
                    </a>                  
                </div>
            </div>
        </section>
    )
}

export default SignUp;