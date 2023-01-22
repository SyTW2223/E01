import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Typography, List, ListItem, TextField, Box, IconButton} from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { theme } from '../themes/mainTheme';
import { Container } from '@mui/system';
import Navbar from './Navbar';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

const PreviousSession = () => {
  const [previousSession, setPreviousSession] = useState([]);
  const user = useSelector(selectUser);
  const username = user && user.userName;
  const token = user && user.token;
  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchData() {
      if (username === null) return navigate("/")
      let url = `http://localhost:4000/user/?token=${token}&name=${username}`;
      let realUser = await fetch(url);
      realUser = await realUser.json();

      // Para todas las sesiones que tiene el usuario ahora tendremos en previousSession los campos devueltos por el GET.
      // Para cada sesion:
      const sessions = realUser.sessions.map(async (element) => {
        // Creamos un objeto que sera la sesion
        let newSession = { name: '', objectives: [], num_tasks: 1 }
        url = `http://localhost:4000/session/id/?token=${token}&id=${element}`;
        const getSession = await fetch(url)
        const realSession = await getSession.json()
        // Obtnemos la sesion y ponemos el nombre
        newSession.name = realSession.name
        const objectives = await Promise.all(realSession.objectives.map(async (el) => {
          url = `http://localhost:4000/objective/id/?token=${token}&id=${el}`;
          const getObjective = await fetch(url)
          return await getObjective.json();
        }));
        
        objectives.forEach((realObjective) => {
          newSession.objectives.push(realObjective.name);
          newSession.num_tasks = realObjective.tasks.length
        });
        
        return newSession;
      });
      setPreviousSession(await Promise.all(sessions));
    }
    fetchData();
  }, [token, username]);

  const [filter, setFilter] = useState('');

  const filteredSessions = filter === "" ? previousSession : 
  previousSession.filter((session) => {
    return session.name.toUpperCase().includes(filter.toUpperCase());
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
        <Box sx={{display: 'flex', justifyItems: 'flex-start', marginTop: 2,bgcolor: 'primary.secondary', maxWidth: 400}}>
          <TextField
            data-testid="filter-input"
            variant='filled'
            label="Filter your sessions..."
            fullWidth
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            sx={{
              borderRadius: 1,
              maxWidth: 400
            }}
          />
          <IconButton onClick={() => setFilter("")}><ClearIcon /></IconButton>
        </Box>
        <Container 
          maxWidth='md'
          sx= {{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'primary.main',
            borderRadius: '15px',
            boxShadow: 5
          }}
        > 
          {previousSession.length === 0 ? <Typography sx={{color: 'secondary.secondary'}}>Cargando...</Typography> : 
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {filteredSessions.length === 0 && filter !== "" 
          ? <Typography sx={{color: 'secondary.secondary'}}>No sessions match the filter</Typography> :
          <List>
          {filteredSessions.map((session, index) => (
            <ListItem key={index}>
            <Box 
              sx={{
                  bgcolor: 'primary.secondary',
                  paddingTop: 2,
                  marginTop: 1,
                  marginBottom: 2,
                  borderRadius: 2,
                  width: '500px',
                  mx: 2,
                  boxShadow: 2,
                  "@media screen and (max-width: 600px)": {
                      width: "80%",
                      maxWidth: "800px"
              }
            }}>
              <Typography 
                variant="h3" 
                sx={{
                  fontFamily: '"Open Sans", sans-serif',
                  color: 'white',
                  bgcolor: 'secondary.',
                  textAlign: 'center',
                  fontSize: '3rem',
                  borderRadious: 5,
                  "@media screen and (max-width: 600px)": {
                      fontSize: "2rem"
                  }
                }}>
                  {session.name.toUpperCase()}
                </Typography>
                <Box
                  sx={{
                    margin: 2,
                    padding: 2,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    boxShadow: 2,
                    "@media screen and (max-width: 600px)": {
                        margin: "1rem"
                    }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{fontFamily: '"Open Sans", sans-serif', color: 'white', fontSize: '1.3em',
                    "@media screen and (max-width: 600px)": {
                        fontSize: "1rem"
                    }
                    }}>
                    Objetivos completados:
                  </Typography>
                  {session.objectives.map((objective, index) => (
                    <Box key={index} sx={{m: '4px', bgcolor: 'secondary.main', borderRadius: 3, 
                    width: '100%',
                    "@media screen and (min-width: 600px)": {
                        width: "90%"
                    }
                    }}>
                        <Typography 
                          variant="h5" 
                          sx={{fontFamily: '"Open Sans", sans-serif', color: 'black', fontSize: '1em', padding: 1,
                          "@media screen and (max-width: 600px)": {
                            fontSize: "0.8rem"
                        }
                          }}>
                          
                          {objective}
                          </Typography>
                      </Box>
                  ))}
                </Box>
              <Box sx={{m: '4px'}}>
                <Typography variant="h5" sx={{fontFamily: '"Open Sans", sans-serif', color: 'white', fontSize: '1em', pl: 2, mb: 1}}> Número de tareas: {session.num_tasks}</Typography>
              </Box>
            </Box>
          </ListItem>
          ))}
          </List>}
          </Box>                  
          }
        </Container>
      </ThemeProvider>
  )


}

export default PreviousSession
