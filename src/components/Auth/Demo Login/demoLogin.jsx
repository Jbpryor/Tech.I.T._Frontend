import './demoLogin.scss';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setDemoUserMode } from './demoUserSlice';

function DemoLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDemoLogin = (user) => {
        dispatch(setDemoUserMode(user));
        if (window.innerWidth > 850) {
            navigate('/dashboard');
        } else {
            if (user === 'Admin' || user === 'Project Manager') {
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
                            <i className='bx bxs-user-rectangle admin-icon' onClick={() => handleDemoLogin('Admin')}></i>
                            <span onClick={() => handleDemoLogin('Admin')}>Admin</span>
                        </div>
                    </div>

                    <div className="demo-user">
                        <div className="field manager">
                            <i className='bx bxs-user-rectangle manager-icon' onClick={() => handleDemoLogin('Project Manager')}></i>
                            <span onClick={() => handleDemoLogin('Project Manager')}>Project Manager</span>
                        </div>
                    </div>

                    <div className="demo-user">
                        <div className="field developer">
                            <i className='bx bxs-user-rectangle developer-icon' onClick={() => handleDemoLogin('Developer')}></i>
                            <span onClick={() => handleDemoLogin('Developer')}>Developer</span>
                        </div>
                    </div>

                    <div className="demo-user">
                        <div className="field submitter">
                            <i className='bx bxs-user-rectangle submitter-icon' onClick={() => handleDemoLogin('Submitter')}></i>
                            <span onClick={() => handleDemoLogin('Submitter')}>Submitter</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DemoLogin;
