import { useSelector } from "react-redux";
import './logo.scss';
import { selectTheme } from "../../Users/User/Settings/settingsSlice";
import useAuth from "../../../Hooks/useAuth";

function Logo() {

    const { role, userName } = useAuth();
    const theme = useSelector(selectTheme);

    const firstInitial = userName.split(" ")[0][0];
    const lastInitial = userName.split(" ")[1][0];

    const getLogoColor = () => {
        if (role === 'Admin') {
            return 'rgb(1, 182, 1)';
        } else if (role === 'Project Manager') {
            return 'rgb(255, 165, 0)';
        } else if (role === 'Developer') {
            return 'rgb(232, 232, 15)';
        } else if (role === 'Submitter') {
            return 'rgb(224, 1, 1)';
        }
        return 'white';
    }

    return (
        <section className="logo" style={{background: theme.primary_color}}>
            <div className="logo-container">
                <div className="header-logo">
                    <div className="user-initial-first" style={{color: theme.font_color}}>{firstInitial}</div>
                    <div className="user-initial-last" style={{ color: getLogoColor() }}>{lastInitial}</div>
                </div>
            </div>
        </section>
    )
}

export default Logo;