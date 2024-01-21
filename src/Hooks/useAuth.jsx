import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/Auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isManager = false;
    let isAdmin = false;
    let status = "Submitter";
    let email = "";
    let userName = "";
    let role = ""

    if (token) {
        const decoded = jwtDecode(token);
        const { email: decodedEmail, role: decodedRole, userName: decodedUserName } = decoded.UserInfo;

        email = decodedEmail;
        userName = decodedUserName;
        role = decodedRole

        isManager = role.includes('Manager');
        isAdmin = role.includes('Admin');

        if (isManager) status = "Manager";
        if (isAdmin) status = "Admin";
    }

    return { email, role, status, isManager, isAdmin, userName };
};

export default useAuth;
