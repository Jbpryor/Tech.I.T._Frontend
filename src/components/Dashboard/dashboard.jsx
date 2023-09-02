import Header from "../Header/header";
import SideBar from "../Side Bar/sideBar";
import './dashboard.scss'

function Dashboard() {
    return (
        <section className="dashboard">            
            <SideBar />
            <Header />
        </section>
    )
}

export default Dashboard;