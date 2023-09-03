import Header from "../Header/header";
import SideBar from "../Side Bar/sideBar";
import './layout.scss'

function Layout() {
    return (
        <section className="layout">            
            <SideBar />
            <Header />
        </section>
    )
}

export default Layout;