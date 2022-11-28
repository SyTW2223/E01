import { useState } from 'react';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({
      userName: userName,
      userPwd: userPwd,
      loggedIn: true
    }))
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Sign Up!
        </h1>
        <input
          type='text'
          placeholder='user name'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='text'
          placeholder='password'
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
        />
        <button 
          type='submit'
          onClick={() => {
            console.log(userName, userPwd);
          }}
        >Submit</button>
      </form>
    </div>
  )
}

export default Login;
