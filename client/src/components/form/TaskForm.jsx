import React from 'react';
import { TextField, ListItem, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {ThemeProvider} from '@mui/material';
import { theme } from '../../themes/mainTheme';
import { useState } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const TaskForm = ({ task, taskIndex, objectiveIndex, handleTaskChange, handleDeleteTask, objetiveCompleted }) => {
  const [taskCompleted, setCompletedTask] = useState(false);

  const useStyles =  {
    maxWidth: '280px',
    bgcolor: theme.palette.secondary.secondary,
    borderRadius: '15px',
    boxShadow: 1,
    marginTop: 1,
    marginBottom: 1,
  };

  return (
    <ThemeProvider theme={theme}>
      <ListItem key={taskIndex} sx={useStyles}>
        <TextField
          data-testid="task-name-input"
          InputProps={{
            style: { color: '#658864' },
          }}
          variant='standard'
          disabled={taskCompleted}
          label="Task"
          value={task}
          onChange={(event) => handleTaskChange(event, objectiveIndex, taskIndex)}
          sx={{
            color: 'secondary.main'
          }}
        />
        <IconButton onClick={() => handleDeleteTask(objectiveIndex, taskIndex)} data-testid="task-delete-btn"> 
          <DeleteIcon sx={{color: 'primary.main'}}/> 
        </IconButton>
        <Button onClick={() => setCompletedTask(true)} disabled={taskCompleted} sx={{maxWidth: '1px'}}>
          <DoneAllIcon
          data-testid="task-complete-btn"
          sx={{
            borderRadius: 1,
            color: 'primary.main',
            marginX: 2
          }}/>
        </Button>
      </ListItem>
    </ThemeProvider>
  );
}

export default TaskForm;