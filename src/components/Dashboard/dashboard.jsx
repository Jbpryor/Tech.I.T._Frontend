import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import Issues from '../Issues/issues';
import Projects from '../Projects/projects';
import Reports from '../Reports/reports';
import { useSelector } from 'react-redux';
import { selectDemoUser } from '../Auth/Demo Login/demoUserSlice';
import useAuth from '../../Hooks/useAuth';

function Dashboard() {
  const demoUser = useSelector(selectDemoUser);
  const [user, setUser] = useState(false);
  const [userRole, setUserRole] = useState();
  const { role, userName } = useAuth();

  useEffect(() => {
    const updatedUserRole = userName === 'Demo User' ? demoUser : role.toLowerCase();
    setUserRole(updatedUserRole);

    const updatedUser = updatedUserRole === 'developer' || updatedUserRole === 'submitter';
    setUser(updatedUser);
  }, [demoUser, role, userName]);

  return (
    <section className="dashboard">
      <div className={`dashboard-container ${user ? 'active' : ''}`}>
        {(userRole === 'admin' || userRole === 'manager') && <Projects />}
        <Issues />
        <Reports />
      </div>
    </section>
  );
}

export default Dashboard;
