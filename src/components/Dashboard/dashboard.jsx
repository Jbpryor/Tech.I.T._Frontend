import './dashboard.scss';
import Issues from '../Issues/issues';
import Projects from '../Projects/projects';
import Reports from '../Reports/reports';
import useAuth from '../../Hooks/useAuth';

function Dashboard() {

  const { role } = useAuth();


  return (
    <section className="dashboard">
      <div className={`dashboard-container ${role === 'Admin' || role === 'Project Manager' ? '' : 'active'}`}>
        {(role === 'Admin' || role === 'Project Manager') && <Projects />}
        <Issues />
        <Reports />
      </div>
    </section>
  );
}

export default Dashboard;
