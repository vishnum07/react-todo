import React, { useState } from 'react';
import {
  Grid,
  Paper,
  InputBase,
  Button,
  Checkbox,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Alert, AlertTitle
} from '@mui/material';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import MenuIcon from '@mui/icons-material/Menu';
import './TodoApp.css'; // Import the CSS file for styles
import Confetti from 'react-dom-confetti'; // Import the Confetti component

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [completedTaskExists, setCompletedTaskExists] = useState(false);
  const [hurrayAnimation, setHurrayAnimation] = useState(false);
  const [popAnimation, setPopAnimation] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [counter, setCounter] = useState(0);




  const addTask = (e) => {
    e.preventDefault();
    if (tasks.length === 10 ) {
      setAlertOpen(true);
      return;
    }
    if (tasks.length < 10 && newTask.trim() !== '') {
      setCounter((prevCounter) => prevCounter + 1);
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: counter + 1, text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };


  const StyledAlert = styled(Alert)({
    position: 'fixed',
    top: '70px',
    right: '5px',
  });

  const toggleTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const completedTask = updatedTasks.find((task) => task.id === taskId && task.completed);
      if (completedTask) {
        setHurrayAnimation(true);
        setPopAnimation(true);
        setTimeout(() => {
          setHurrayAnimation(false);
          setPopAnimation(false);
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }, 1000); 
      }
      return updatedTasks;
    });
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const deleteTask = (taskId) => {
    setCounter((prevCounter) => prevCounter - 1);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      const updatedTasksWithIds = updatedTasks.map((task, index) => ({
        ...task,
        id: index + 1,
      }));
      return updatedTasksWithIds;
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const confettiConfig = {
    angle: 10,
    spread: 360,
    startVelocity: 50,
    elementCount: 17000,
    dragFriction: 0.12,
    duration: 1500,
    stagger: 3,
    width: '10px',
    height: '10px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  return (
    <>
      <Confetti active={hurrayAnimation} config={confettiConfig} />
      <Grid container direction="column" alignItems="center" className="todo-app">
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Home</MenuItem>
              <MenuItem onClick={handleMenuClose}>Tasks</MenuItem>
              <MenuItem onClick={handleMenuClose}>About</MenuItem>
              {/* Add more menu items as needed */}
            </Menu>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Todo List Sample Project
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {alertOpen &&
          <StyledAlert open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} severity="error" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <AlertTitle>Alert</AlertTitle>
            Do the 10 tasks first then add!
          </StyledAlert>
        }
        <Grid item xs={12} mt={22} container justifyContent="center">
       
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {/* Adjust grid item properties as needed */}
            <Paper component="form" className="input-container" onSubmit={addTask}>
              <InputBase
                placeholder={completedTaskExists ? "Task disabled" : "  Add a task..."}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                fullWidth
                disabled={completedTaskExists}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginLeft: '8px' }}
                disabled={completedTaskExists}
              >
                Add Task
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent={tasks.length > 5 ? 'flex-end' : 'flex-start'} >
        {tasks.map((task) => (
          <Grid item xs={6} key={task.id}>
            <Paper elevation={3} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
              <Typography style={{ flex: 1, marginRight: 8, textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </Typography>
              <Button onClick={() => deleteTask(task.id)}>Delete</Button>
            </Paper>
          </Grid>
        ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className='footer' container direction="row" alignItems="center">
        <Grid item container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="h6">Social Media Links</Typography>
          </Grid>
          <Grid item container spacing={2} justifyContent="center" className="social-media-links">
            <Grid item>
              <a href="https://github.com/vishnum07" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </Grid>
            <Grid item>
              <a href="https://www.instagram.com/vishnu_kumar_murukesh" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Grid>
            <Grid item>
              <a href="https://www.linkedin.com/in/vishnu-kumar-9b3b88217" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </>
  );
};

export default TodoApp;
