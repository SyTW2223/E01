import './App.css'
import Login from './components/Login'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux';

export default function App() {
  const currentUser = useSelector(selectUser);

  return (
    <div>
      <Login/>
    </div>
  )
};
