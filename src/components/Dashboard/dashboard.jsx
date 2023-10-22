import React, { useState, useEffect } from 'react';
import './dashboard.scss'
import Issues from '../Issues/issues';
import Projects from '../Projects/projects';
import Reports from '../Reports/reports';
import { useSelector } from 'react-redux';

function Dashboard() {

    const demoUser = useSelector((state) => state.demoUser);
    const [ user, setUser ] = useState(false);
 
    useEffect(() => {
        if (demoUser === 'developer' || demoUser === 'submitter') {
            setUser(true);
        } else {
            setUser(false);
        }
    }, [demoUser]);

    return (
        <section className='dashboard'>
            <div className={`dashboard-container ${user ? 'active' : ''}`}>
                {(demoUser === 'admin' || demoUser === 'manager') && <Projects />}
                <Issues />
                <Reports />
            </div>
        </section>
    )
}

export default Dashboard;