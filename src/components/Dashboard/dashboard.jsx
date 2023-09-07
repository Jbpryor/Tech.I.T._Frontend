import './dashboard.scss'
import Issues from '../Issues/issues';
import Projects from '../Projects/projects';
import Reports from '../Reports/reports';

function Dashboard() {
    return (
        <section className='dashboard'>
            <div className="dashboard-container">
                <Issues />
                <Projects />
                <Reports />
            </div>
        </section>
    )
}

export default Dashboard;