import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Alert
} from '@mui/material';
import ObjectiveForm from './ObjectiveForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice'

const SessionFrom = () => {
  const [session, setSession] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [openAlert, setAlert] = useState(false);
  const [openSuccess, setSuccess] = useState(false);

  const user = useSelector(selectUser);
  const username = user.userName;
  const token = user.token;

  const dispatch = useDispatch();

  const handleAddObjective = () => {
    setObjectives([...objectives, { name: '', tasks: [], completed: false }]);
  }

  const handleAddTask = (index) => {
    const newObjectives = [...objectives];
    newObjectives[index].tasks.push('');
    setObjectives(newObjectives);
  }

  const handleObjectiveChange = (event, index) => {
    const newObjectives = [...objectives];
    newObjectives[index].name = event.target.value;
    setObjectives(newObjectives);
  }

  const handleTaskChange = (event, objectiveIndex, taskIndex) => {
    const newObjectives = [...objectives];
    newObjectives[objectiveIndex].tasks[taskIndex] = event.target.value;
    setObjectives(newObjectives);
  }

  const handleCompleteSession = async (e) => {
    let emptyField = false;
    objectives.forEach((objective) => {
      if (!objective.name) {
        emptyField = true;
      }
      objective.tasks.forEach((task) => {
        if (!task) {
          emptyField = true;
        }
      });
    });

    if (emptyField) {
      setAlert(true);
      return;
    } else {
      // Hacemos un GET para tener el usuario guardado en la base de datos ya que necesitamos su _id.
      let url = `http://localhost:4000/user/?token=${token}&name=${username}`;
      let realUser = await fetch(url)
      realUser = await realUser.json()

      // Ahora haremos un POST de la session con la id del usuario.
      let options = {
        method: "POST", body: new URLSearchParams({
          'name': session,
          'user': realUser._id,
          'token': token,
        })
      };
      url = `http://localhost:4000/session/`;
      await fetch(url, options);

      // Ahora tenemos que obtener la id de la session que creamos en la base de datos, para ello primero haremos un get
      url = `http://localhost:4000/session/?token=${token}&name=${session}&user=${realUser._id}`;
      let realSession = await fetch(url);
      realSession = await realSession.json();
      // Este Get devuelve un array con las sesiones que coincidan, en caso de que un usuario tenga varias sesiones con el mismo nombre
      // la actual se encontrará en la ultima posicion del array ya que se devuelven en orden por lo que siempre nos quedaremos con el ultimo elemento del array..
      realSession = realSession[realSession.length - 1];
      // Ahora que tenemos la session actual que queremos guardar, con su ID podemos hacer el POST de los objetivos.
      objectives.forEach(async (element) => {
        // Posteamos objetivos con las id de la sesion correspondiente
        url = `http://localhost:4000/objective/`;
        options = {
          method: "POST", body: new URLSearchParams({
            'name': element.name,
            'session': realSession._id,
            'token': token,
          })
        };
        await fetch(url, options);
        // Ahora tenemos que hacer un POST de las tareas correspondientes a cada object, para esto lo que haremos será un GET teniendo en cuenta
        // nuevamente que nos quedamos con el ultimo objetivo que será el actual.
        url = `http://localhost:4000/objective/?token=${token}&name=${element.name}&session=${realSession._id}`;
        let realObjective = await fetch(url);        
        realObjective = await realObjective.json()
        // Nos quedaremos con el ultimo objetivo añadido que es el que nos interesa porque iremos iterando uno a uno.
        realObjective = realObjective[realObjective.length-1]
        // Ahora podemos hacer un POST de las tareas teniendo nuestro objetivo de interés.
        element.tasks.forEach( async(element) => {
          url = `http://localhost:4000/task/`;
          options = {
            method: "POST", body: new URLSearchParams({
              'name': element,
              'objective': realObjective._id,
              'token': token,
            })
          };
          await fetch(url, options);
        });
      });
      setAlert(false);
      setSuccess(true);
      setObjectives([]);
      setSession('');
    }

  }

  const handleCompleteObjective = (index) => {
    const newObjectives = [...objectives];
    newObjectives[index].completed = true;
    setObjectives(newObjectives);
  }

  const handleDeleteTask = (objectiveIndex, taskIndex) => {
    const newObjectives = [...objectives];
    newObjectives[objectiveIndex].tasks.splice(taskIndex, 1);
    setObjectives(newObjectives);
  }

  const handleDeleteObjective = (objectiveIndex) => {
    const newObjectives = [...objectives];
    newObjectives.splice(objectiveIndex, 1);
    setObjectives(newObjectives);
  }

  return (
    <Container>
      {openAlert && <Alert severity="error" onClose={() => setAlert(false)}>¡Rellena <strong> TODOS </strong> los campos!</Alert>}
      {openSuccess && <Alert severity="success" onClose={() => setSuccess(false)}>¡Todo ha ido perfecto!</Alert>}
      {/* Session form */}
      <TextField
        required
        label="Session Name"
        value={session}
        onChange={(event) => setSession(event.target.value)}
      />
      <Button onClick={handleAddObjective}>Add Objective</Button>
      <Button onClick={(e) => {
        if (session.length === 0) {
          setAlert(true)
        } else {
          handleCompleteSession(e)
        }
      }}>
        Complete Session
      </Button>

      {/* Objetive Form */}
      {objectives.map((objective, index) => (
        <ObjectiveForm
          objective={objective}
          objectiveIndex={index}
          handleTaskChange={handleTaskChange}
          handleDeleteTask={handleDeleteTask}
          handleObjectiveChange={handleObjectiveChange}
          handleAddTask={handleAddTask}
          handleCompleteObjective={handleCompleteObjective}
          handleDeleteObjective={handleDeleteObjective}
        />
      ))}

    </Container>
  );
}

export default SessionFrom;
