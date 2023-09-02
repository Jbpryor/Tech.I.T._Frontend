import './login.scss';
import 'boxicons/css/boxicons.min.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();

    useEffect(() => {

        // const forms = document.querySelector('.forms');
        const links = document.querySelectorAll('.link');
        const emailField = document.querySelector('.email');
        const passwordField = document.querySelector('.password');

        const loginButton = document.querySelector('.login-button');
        loginButton.addEventListener('click', () => {
            if (emailField.value === 'demo@example.com' && passwordField.value === 'demopassword') {
                navigate('/demoLogin')
            } else if (emailField.value ==='demo@example.com' && passwordField.value === 'demopassword') {
                navigate('/dashboard')
            }
        })

        links.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                navigate('/signup');
            })
        });

        const demoButton = document.querySelector('.field.demo');
        demoButton.addEventListener('click', () => {
            emailField.value = 'demo@example.com';
            passwordField.value = 'demopassword';

            const loginForm = document.querySelector('.login');
            // loginForm.submit();
        });

        return () => {
            demoButton.removeEventListener('click', () => {});
        };
    }, []);

    return (
        <section className='container forms'>
            <div className="form login">
                <div className="form-content">
                    <header>Login</header>
                    <form action="#">
                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="email"></input>
                        </div>

                        <div className="field input-field">
                            <input type="password" placeholder="Password" className="password"></input>
                        </div>

                        <div className="form-link">
                            <a href="#" className="forgot-pass">Forgot password?</a>
                        </div>

                        <div className="field login-button">
                            <button>Login</button>
                        </div>                
                    </form> 
                    <div className="form-link">
                        <span>Already have an account? <a href="#" className="link signup-link">Signup</a></span>
                    </div>
                </div>
                
                <div className="line"></div>

                <div className="media-options">
                    <a href="#" className="field facebook">
                        <i className='bx bxl-facebook facebook-icon'></i>
                        <span>Login with Facebook</span>
                    </a>                  
                </div>

                <div className="media-options">
                    <a href="#" className="field google">
                        <img src="images/google.png" alt="" className="google-img"></img>
                        <span>Login with Google</span>
                    </a>                  
                </div>

                <div className="media-options">
                    <a href="#" className="field demo">
                        <i className='bx bxs-user-circle demo-icon'></i>
                        <span>Login as Demo User</span>
                    </a>                  
                </div>
            </div>
        </section>
    )
}

export default Login;