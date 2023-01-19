import React from 'react';
import { TextField, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskForm = ({ task, taskIndex, objectiveIndex, handleTaskChange, handleDeleteTask }) => {

  return (
    <ListItem key={taskIndex}>
      <TextField
        label="Task"
        value={task}
        onChange={(event) => handleTaskChange(event, objectiveIndex, taskIndex)}
      />
      <IconButton onClick={() => handleDeleteTask(objectiveIndex, taskIndex)}> 
        <DeleteIcon color='error'/> 
      </IconButton>
    </ListItem>
  );
}

export default TaskForm;