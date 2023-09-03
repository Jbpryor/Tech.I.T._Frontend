import './demoLogin.scss';
import 'boxicons/css/boxicons.min.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function DemoLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const users = document.querySelectorAll('.user');
        const admin = document.querySelectorAll('.admin');
        const project = document.querySelectorAll('.project');
        const developer = document.querySelectorAll('.developer');
        const submitter = document.querySelectorAll('.submitter');

        users.forEach(user => {
            user.addEventListener('click', event => {
                event.preventDefault();

                if (admin) {
                    navigate('/layout')
                };
                if (project) {
                    navigate('/layout')
                };
                if (developer) {
                    navigate('/layout')
                };
                if (submitter) {
                    navigate('/layout')
                };
            });
        });

        return () => {
            users.forEach(user => {
                user.removeEventListener('click', () => {})
            })
        }
        
    }, []);

    return (
        <section className="demo container">
            <div className="user-content">
                <header>Demo User</header>

                <div className="users">
                    <div className="user">
                        <a href="" className="field admin">
                            <i className='bx bxs-user-rectangle admin-icon'></i>
                            <span>Admin</span>
                        </a>
                    </div>

                    <div className="user">
                        <a href="" className="field project">
                            <i className='bx bxs-user-rectangle project-icon'></i>
                            <span>Project Manager</span>
                        </a>
                    </div>

                    <div className="user">
                        <a href="" className="field developer">
                            <i className='bx bxs-user-rectangle developer-icon'></i>
                            <span>Developer</span>
                        </a>
                    </div>

                    <div className="user">
                        <a href="" className="field submitter">
                            <i className='bx bxs-user-rectangle submitter-icon'></i>
                            <span>Submitter</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DemoLogin;
