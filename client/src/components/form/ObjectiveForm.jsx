import React from 'react';
import { TextField, 
         List,
         Button,
         Container, 
         IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';

const ObjectiveForm = ({ objective, objectiveIndex, handleTaskChange, handleDeleteTask, handleObjectiveChange, handleAddTask,
                         handleCompleteObjective, handleDeleteObjective }) => {
  return (
    <Container key={objectiveIndex}>
      <TextField
        required
        label="Objective"
        value={objective.name}
        onChange={(event) => handleObjectiveChange(event, objectiveIndex)}
        disabled={objective.completed}
      />
      {!objective.completed && <Button onClick={() => handleAddTask(objectiveIndex)}>Add Task</Button>}
      <Button onClick={() => handleCompleteObjective(objectiveIndex)} disabled={objective.completed}>Complete Objective</Button>
      <IconButton onClick={() => handleDeleteObjective(objectiveIndex)}> <DeleteIcon color='error'/> </IconButton>
      
      {/* Task Form */}
      <List>
        {objective.tasks.map((task, taskIndex) => (
          <TaskForm 
            key={taskIndex}
            task={task} 
            taskIndex={taskIndex} 
            objectiveIndex={objectiveIndex} 
            handleTaskChange={handleTaskChange}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </List>
    </Container>
  )
}

export default ObjectiveForm