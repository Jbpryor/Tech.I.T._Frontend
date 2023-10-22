import './demoLogin.scss';
import 'boxicons/css/boxicons.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setDemoUserMode } from '../../Store/Slices/demoUserSlice';

function DemoLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDemoLogin = (user) => {
        dispatch(setDemoUserMode(user));
        if (window.innerWidth > 850) {
            navigate('/dashboard');
        } else {
            if (user === 'admin' || user === 'manager') {
                navigate('/projects');
            } else {
                navigate('/issues');
            }
        };      
    };
 

    return (
        <section className="demo demo-user-container">
            <div className="demo-user-content">
                <header>Demo User</header>

                <div className="demo-users">
                    <div className="demo-user" >
                        <div value='admin' className="field admin">
                            <i className='bx bxs-user-rectangle admin-icon' onClick={() => handleDemoLogin('admin')}></i>
                            <span onClick={() => handleDemoLogin('admin')}>Admin</span>
                        </div>
                    </div>

                    <div className="demo-user">
                        <div className="field manager">
                            <i className='bx bxs-user-rectangle manager-icon' onClick={() => handleDemoLogin('manager')}></i>
                            <span onClick={() => handleDemoLogin('manager')}>Project Manager</span>
                        </div>
                    </div>

                    <div className="demo-user">
                        <div className="field developer">
                            <i className='bx bxs-user-rectangle developer-icon' onClick={() => handleDemoLogin('developer')}></i>
                            <span onClick={() => handleDemoLogin('developer')}>Developer</span>
                        </div>
                    </div>

                    <div className="demo-user">
                        <div className="field submitter">
                            <i className='bx bxs-user-rectangle submitter-icon' onClick={() => handleDemoLogin('submitter')}></i>
                            <span onClick={() => handleDemoLogin('submitter')}>Submitter</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DemoLogin;
