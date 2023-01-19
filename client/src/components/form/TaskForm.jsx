import React from 'react';
import { TextField, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {ThemeProvider} from '@mui/material';
import { theme } from '../theme';

const TaskForm = ({ task, taskIndex, objectiveIndex, handleTaskChange, handleDeleteTask, objetiveCompleted }) => {
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
          InputProps={{
            style: { color: '#658864' },
          }}
          variant='standard'
          disabled={objetiveCompleted}
          label="Task"
          value={task}
          onChange={(event) => handleTaskChange(event, objectiveIndex, taskIndex)}
          sx={{
            color: 'secondary.main'
          }}
        />
        <IconButton onClick={() => handleDeleteTask(objectiveIndex, taskIndex)}> 
          <DeleteIcon sx={{color: 'primary.main'}}/> 
        </IconButton>
      </ListItem>
    </ThemeProvider>
  );
}

export default TaskForm;