import './demoLogin.scss';
import 'boxicons/css/boxicons.min.css';
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'

function DemoLogin() {
    return (
        <section className="demo container">
            <div className="user-content">
                <header>Demo User</header>

                <div className="users">
                    <div className="user">
                        <a href="" className="field admin">
                            <i class='bx bxs-user-rectangle admin-icon'></i>
                            <span>Admin</span>
                        </a>
                    </div>

                    <div className="user">
                        <a href="" className="field project">
                            <i class='bx bxs-user-rectangle project-icon'></i>
                            <span>Project Manager</span>
                        </a>
                    </div>

                    <div className="user">
                        <a href="" className="field developer">
                            <i class='bx bxs-user-rectangle developer-icon'></i>
                            <span>Developer</span>
                        </a>
                    </div>

                    <div className="user">
                        <a href="" className="field submitter">
                            <i class='bx bxs-user-rectangle submitter-icon'></i>
                            <span>Submitter</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DemoLogin;
