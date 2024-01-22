import { Navigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

function PrivateRoutes({ children }) {
  const { userName } = useAuth();

  if (userName === '' || userName === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoutes;
