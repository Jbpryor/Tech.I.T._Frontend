import './sideBar.scss'
import 'boxicons/css/boxicons.min.css';

function SideBar() {
    return (
        <section className="sideBar">
            <div className="logo-container">
                <div className="header-logo">
                    <img src="#" alt="#" />
                </div>
            </div>
            <div className="sideBar-links">
                <ul>
                    <li className="page1">Page1</li>
                    <li className="page2">Page2</li>
                    <li className="page3">Page3</li>
                    <li className="page4">Page4</li>
                </ul>
            </div>
            <div className="user-container">
                <i className='bx bxs-user-rectangle user-icon'></i>
                <div className="user-name">Hello, <br />user-name</div>
            </div>           
        </section>
    )
}

export default SideBar;