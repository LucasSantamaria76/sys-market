import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, to, state }) => {
  const {
    user: { isAuthenticated },
  } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to={to} />;
};
