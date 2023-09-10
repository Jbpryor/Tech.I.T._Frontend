import './dashboard.scss'
import Issues from '../Issues/issues';
import Projects from '../Projects/projects';
import Reports from '../Reports/reports';
import Users from '../Users/users';

function Dashboard() {
    return (
        <section className='dashboard'>
            <div className="dashboard-container">
                <Projects />
                <Issues />
                <Reports />
            </div>
        </section>
    )
}

export default Dashboard;