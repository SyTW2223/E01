import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const PreviousSession = async() => {
  const user = useSelector(selectUser);
  const username = user.userName;
  const token = user.token;

  let previousSession = []
  let url = `http://localhost:4000/user/?token=${token}&name=${username}`;
  let realUser = await fetch(url)
  realUser = await realUser.json()
  // Para todas las sesiones que tiene el usuario ahora tendremos en previousSession los campos devueltos por el GET.
  // Para cada sesion:
  realUser.sessions.forEach(async (element) => {
    // Creamos un objeto que sera la sesion
    let newSession = { name: '', objectives: [], num_tasks: 1 }
    url = `http://localhost:4000/session/id/?token=${token}&id=${element}`;
    const getSession = await fetch(url)
    const realSession = await getSession.json()
    // Obtnemos la sesion y ponemos el nombre
    newSession.name = realSession.name
    realSession.objectives.forEach(async (el) => {
      url = `http://localhost:4000/objective/id/?token=${token}&id=${el}`;
      const getObjective = await fetch(url)
      const realObjective = await getObjective.json()
      // Obetenemos el objetibo real y lo asignamos así como el numero de tareas
      newSession.objectives.push(realObjective);
      newSession.num_tasks = realObjective.tasks.length
    });
    previousSession.push(newSession);
  });
  console.log(previousSession)

  return (
    // {previousSession.map((session) => (
    //   <p>session</p>
    // ))}
    <div></div>
  )
}

export default PreviousSession