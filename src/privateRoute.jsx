import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoutes({ children }) {
  const demoUser = useSelector((state) => state.demoUser);

  if (demoUser === '' || demoUser === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoutes;
