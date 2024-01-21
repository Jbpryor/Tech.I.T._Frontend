import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import useAuth from '../../Hooks/useAuth';

function PrivateRoutes({ children }) {
  const { userName } = useAuth();
  // console.log(userName)
  // const demoUser = useSelector((state) => state.demoUser);

  if (userName === '' || userName === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoutes;
