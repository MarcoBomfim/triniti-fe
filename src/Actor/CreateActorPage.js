import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addActorRequest } from './actorsSlice';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    marginBottom: '20px',
  },
  submitButton: {
    marginBottom: '20px',
  },
}));

const CreateActorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const handleCreateActor = async (event) => {
    event.preventDefault();

    const actorData = {
      firstName,
      lastName,
      age,
    };

    try {
      await dispatch(addActorRequest(actorData));
      navigate('/');
    } catch (error) {
      console.error('Error creating actor:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.header}>
        Create Actor Page
      </Typography>

      <Button onClick={() => navigate('/')}>Back</Button>

      <form className={classes.form} onSubmit={handleCreateActor}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={classes.input}
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={classes.input}
          required
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={classes.input}
          required
        />

        <Button type="submit" variant="contained" className={classes.submitButton}>
          Create Actor
        </Button>
      </form>
    </div>
  );
};

export default CreateActorPage;
