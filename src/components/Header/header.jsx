import './header.scss'

function Header() {
    return (
        <div className="header-container">
            <div className="header-logo">
                <img src="#" alt="#" />
            </div>
            <div className="header-links">
                <ul>
                    <li className="home">Home</li>
                    <li className="page1">Page1</li>
                    <li className="page2">Page2</li>
                    <li className="page3">Page3</li>
                    <li className="page4">Page4</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;