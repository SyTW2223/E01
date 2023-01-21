import React from 'react';
import { TextField, 
         List,
         Button,
         Container, 
         IconButton,
         } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';
import { theme } from '../../themes/mainTheme';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ObjectiveForm = ({ objective, objectiveIndex, handleTaskChange, handleDeleteTask, handleObjectiveChange, handleAddTask,
                         handleCompleteObjective, handleDeleteObjective }) => {

  const useStyles = {
    bgcolor: theme.palette.primary.secondary,
    paddingTop: 2,
    marginTop: 1,
    marginBottom: 2,
    borderRadius: '15px'
  };

  return (
    <Container key={objectiveIndex} sx={useStyles}>
      <TextField
        InputProps={{
          style: { color: '#658864' },
        }}
        required
        variant="outlined"
        label="Objective"
        value={objective.name}
        onChange={(event) => handleObjectiveChange(event, objectiveIndex)}
        disabled={objective.completed}
        fullWidth
        sx={{
          bgcolor: 'secondary.secondary',
          maxHeight: '150px',
          marginBottom: 2,
          borderRadius: 1,
          borderColor: 'secondary.main',
        }}
      />
      {!objective.completed && <Button onClick={() => handleAddTask(objectiveIndex)} data-testid="add-task-btn"
        sx={{
          bgcolor: 'primary.main',
          color: 'secondary.secondary',
          '&:hover': {
            color: 'primary.main',
          }
        }}
        >
        Add Task
       </Button>}
      <Button onClick={() => handleCompleteObjective(objectiveIndex)} disabled={objective.completed} sx={{maxWidth: '1px'}}>
        <DoneAllIcon
          data-testid="complete-objective-btn"
          sx={{
            borderRadius: 1,
            color: 'primary.main',
            marginX: 2
          }}/>
      </Button>
      <IconButton onClick={() => handleDeleteObjective(objectiveIndex)} data-testid="delete-objective-btn"> <DeleteIcon 
          sx={{
            color: 'primary.main',
          }}
      />  </IconButton>
      {/* Task Form */}
      <List>
        {!objective.completed && objective.tasks.map((task, taskIndex) => (
          <TaskForm 
            key={taskIndex}
            task={task} 
            taskIndex={taskIndex} 
            objectiveIndex={objectiveIndex} 
            handleTaskChange={handleTaskChange}
            handleDeleteTask={handleDeleteTask}
            objectiveCompleted={objective.completed}
          />))
        }
      </List>
    </Container>
  )
}

export default ObjectiveForm