import React, { useState } from 'react';
import { TextField, 
         List, 
         ListItem,
         Button,
         Container } from '@mui/material';

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

  const handleCompleteSession = (index) => {
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
      <Button onClick={() => handleCompleteSession()}>Complete Session</Button>
      <Button onClick={handleAddObjective}>Add Objective</Button>
      
      {/* Objetive Form */}
      {objectives.map((objective, index) => (
        <Container key={index}>
          <TextField
            required
            label="Objective"
            value={objective.name}
            onChange={(event) => handleObjectiveChange(event, index)}
            disabled={objective.completed}
          />
          {!objective.completed && <Button onClick={() => handleAddTask(index)}>Add Task</Button>}
          <Button onClick={() => handleCompleteObjective(index)} disabled={objective.completed}>Complete Objective</Button>
          <Button onClick={() => handleDeleteObjective(index)}>Delete Objective</Button>
          
          {/* Task Form */}
          <List>
            {objective.tasks.map((task, taskIndex) => (
              <ListItem key={taskIndex}>
                <TextField
                  required
                  value={task}
                  onChange={(event) => handleTaskChange(event, index, taskIndex)}
                  disabled={objective.completed}
                />
                <Button onClick={() => handleDeleteTask(index, taskIndex)}>Delete Task</Button>
              </ListItem>
            ))}
          </List>
        </Container>
      ))}

    </Container>
  );
}

export default SessionFrom;
