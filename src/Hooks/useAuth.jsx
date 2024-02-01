import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/Auth/authSlice";
import { selectDemoUser } from "../components/Auth/Demo Login/demoUserSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    const demoUser = useSelector(selectDemoUser);
    let isAdmin = false;
    let isManager = false;
    let isDeveloper = false;
    let isSubmitter = false;
    let email = "";
    let userName = "";
    let role = "";
    let userId

    if (token) {
        const decoded = jwtDecode(token);
        const { email: decodedEmail, role: decodedRole, userName: decodedUserName, userId: decodedUserId } = decoded.UserInfo;

        email = decodedEmail;
        userName = decodedUserName;
        role = userName === 'Demo User' ? demoUser : decodedRole
        userId = decodedUserId

        isAdmin = role === 'Admin';
        isManager = role === 'Project Manager';
        isDeveloper = role === "Developer";
        isSubmitter = role === "Submitter"
    }

    return { email, role, isAdmin, isManager, isDeveloper, isSubmitter, userName, userId };
};

export default useAuth;

