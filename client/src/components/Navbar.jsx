import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Navigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Menu } from '@mui/material';
import { logout } from '../features/userSlice';
import { useEffect } from 'react';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button variant='text' >
                  <Link to='/' variant="body2" style={{ textDecoration: 'none', color: '#ffffff' }} data-testid="title-btn">
                    <Typography
                      variant="h6"
                      noWrap
                      style={{ textDecoration: 'none', color: '#ffffff' }}
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      DAILY PLANNER
                    </Typography>
                  </Link>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              variant="text"
              sx={{ mt: 2, 
                    mb: 2,
                    mr: 2,
                    ml: 'auto',
                    border: 'none',
              }}              
            >
              <Link to='/previous' style={{ textDecoration: 'none', color: '#ffffff' }} data-testid="psessions-btn">
                {"Previous sessions"}
              </Link>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', ml: 'auto' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: '#ffffff'}} data-testid="account-btn">
                <AccountCircleRoundedIcon sx={{fontSize: '1.5em'}} data-testid="account-icon"/>
              </IconButton>
            </Tooltip>
            <Menu
              data-testid="navbar-menu"
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem data-testid="menu-item-1">
                  <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu} data-testid="menu-item-2">
                <Link to='/previous' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Previous sessions</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
