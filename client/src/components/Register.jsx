import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === '' || userPwd === '')
      alert("Porfavor rellene los campos de usuario y contraseñas.");
    else {
      fetch('http://localhost:4000/user', {
        method: 'POST',
        body: new URLSearchParams({
          'name': userName,
          'password': userPwd,
        }),
      })
      .then((result) => {
        if (result.status === 404) {
          alert("El usuario ya existe, porfavor elija otro nombre de usuario.");
        } else {
            navigate("/login");
        }
      })
      .catch((err) => console.log(err) );
    }

  };
  
  return (
    <div className='flex justify-center w-full h-screen items-center bg-white'>
      <form onSubmit={(e) => handleSubmit(e)} 
            className='flex flex-col items-center justify-center bg-purple-300 w-[600px] h-screen md:h-[450px] rounded-lg'>
        <h1 className='mb-10 font-extrabold text-3xl text-white'>
          Sign In!
        </h1>
        <input
          type='text'
          placeholder='user name'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className='w-2/3 mb-4 text-gray-600 rounded bg-gray-100 h-[30px] pl-2' 
        />
        <input
          type='password'
          placeholder='password'
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          className='w-2/3 mb-4 text-gray-600 rounded bg-gray-100 h-[30px] pl-2'
        />
        <div className='pt-4'>
          <button
            type='submit'
            className='bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500 font-semibold
            duration-500'
          >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;