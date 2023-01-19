import React, { useState } from 'react';
import { TextField,
         Button,
         Container,
         Alert, 
         ThemeProvider} from '@mui/material';
import ObjectiveForm from './ObjectiveForm';
import { useDispatch } from 'react-redux';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { theme } from '../theme';

const SessionFrom = () => {
  const [session, setSession] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [openAlert, setAlert] = useState(false);
  const [openSuccess, setSuccess] = useState(false);

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

  const handleCompleteSession = (e) => {
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

  const useStyles = {
    bgcolor: theme.palette.primary.main,
    boxShadow: 4,
    borderRadius: 2
  }

  return (
    <ThemeProvider theme={theme}>      
      <Container sx={useStyles}>
        {openAlert && <Alert severity="error" onClose={() => setAlert(false)}>¡Rellena <strong> TODOS </strong> los campos!</Alert>}
        {openSuccess && <Alert severity="success" onClose={() => setSuccess(false)}>¡Todo ha ido perfecto!</Alert>}
        {/* Session form */}
        <TextField
          required
          variant='filled'
          label="Session Name"
          fullWidth
          value={session}
          onChange={(event) => setSession(event.target.value)}
          sx={{
            bgcolor: 'primary.secondary',
            marginTop: 2,
            borderRadius: 1,
            
          }}
        />
        <Button onClick={handleAddObjective} sx={{bgcolor: 'primary.secondary', marginTop: 1, marginBottom: 1,
          '&:hover': {
            color: 'secondary.secondary',
          }}}
        >
          Add</Button>
        <Button 
          sx={{
            borderRadius: 5,
            bgcolor: 'primary.secondary',
            marginX: 2,
            '&:hover': {
              color: 'secondary.secondary',
            }
          }}
          onClick={(e) => { 
            if (session.length === 0) {
              setAlert(true)
            } else {
              handleCompleteSession(e)}
          }}
        >
          <DoneAllIcon/>
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
    </ThemeProvider>
  );
}

export default SessionFrom;
