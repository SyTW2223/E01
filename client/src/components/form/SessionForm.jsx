import React, { useState } from 'react';
import { TextField,
         Button,
         Container} from '@mui/material';
import ObjectiveForm from './ObjectiveForm';

function SessionFrom() {
  const [session, setSession] = useState('');
  const [objectives, setObjectives] = useState([]);

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

  const handleCompleteSession = () => {
    setObjectives([]);
    setSession('');
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
      {/* Session form */}
      <TextField
        required
        label="Session Name"
        value={session}
        onChange={(event) => setSession(event.target.value)}
      />
      <Button onClick={handleAddObjective}>Add Objective</Button>
      <Button onClick={() => handleCompleteSession()}>Complete Session</Button>
      
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
