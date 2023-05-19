import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieRequest } from './moviesSlice';
import { addMovieToActor } from '../Actor/actorsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: '10px 0',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    margin: '0 10px',
  },
  statusMessage: {
    marginTop: '20px',
  },
}));

const CreateMoviePage = () => {
  const { actorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [creationStatus, setCreationStatus] = useState('');

  const classes = useStyles();

  const handleCreateMovie = async (event) => {
    event.preventDefault();

    const movie = {
      id: nanoid(),
      name,
      releaseDate,
      actorId,
    };

    const { payload } = await dispatch(addMovieRequest({ actorId, movie: { name: movie.name, releaseDate: movie.releaseDate } }));
    dispatch(addMovieToActor({ actorId, movieId: payload.id }));

    setCreationStatus('Movie created successfully!');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">New Movie Page</Typography>
      {creationStatus && (
        <Typography variant="body1" className={classes.statusMessage}>
          {creationStatus}
        </Typography>
      )}
      <form className={classes.form} onSubmit={handleCreateMovie}>
        <TextField
          className={classes.textField}
          label="Title"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          className={classes.textField}
          label="Release Date"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <div className={classes.buttonGroup}>
          <Button variant="contained" type="submit" className={classes.button}>
            Create Movie
          </Button>
          <Button variant="contained" onClick={() => navigate(`/actor/${actorId}`)} className={classes.button}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMoviePage;
