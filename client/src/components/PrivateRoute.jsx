import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Login from './Login';


const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  
  if (user && user.loggedIn) {
    return children;
  }
  return <Login />
}

export default PrivateRoute