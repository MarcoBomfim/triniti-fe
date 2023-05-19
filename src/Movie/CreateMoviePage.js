import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieRequest } from './moviesSlice';
import { addMovieToActor } from '../Actor/actorsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { makeStyles, ThemeProvider } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { createTheme, Snackbar, SnackbarContent } from '@mui/material';

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: '#F7EAEA', // Light pinkish red
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px', // Adjust the spacing as desired
  },
  header: {
    color: '#6A0D2F', // Deep red
    marginBottom: '24px', // Adjust the spacing as desired
    fontWeight: 'bold',
    textAlign: 'center',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
  createMovieButton: {
    color: '#FFFFFF', // White
    backgroundColor: '#A40E4C', // Deep wine
    '&:hover': {
      backgroundColor: '#790B38', // Darker wine
    },
    '&.MuiButton-contained': {
      color: '#FFFFFF', // White
      backgroundColor: '#A40E4C', // Deep wine
      '&:hover': {
        backgroundColor: '#790B38', // Darker wine
      },
    },
  },
  backButton: {
    color: '#FFFFFF', // White
    backgroundColor: '#A40E4C', // Deep wine
    '&:hover': {
      backgroundColor: '#790B38', // Darker wine
    },
    '&.MuiButton-contained': {
      color: '#FFFFFF', // White
      backgroundColor: '#A40E4C', // Deep wine
      '&:hover': {
        backgroundColor: '#790B38', // Darker wine
      },
    },
  },
  statusMessage: {
    marginTop: '20px',
  },
});

const CreateMoviePage = () => {
  const { actorId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleCreateMovie = async (event) => {
    event.preventDefault();

    const movie = {
      id: nanoid(),
      name,
      releaseDate,
      actorId,
    };

    const { payload } = await dispatch(addMovieRequest({ actorId, movie: { name: movie.name, releaseDate: movie.releaseDate } }));
    
    if (!payload) {
      setSuccessOpen(false);
    } else {
      setSuccessOpen(true);
      dispatch(addMovieToActor({ actorId, movieId: payload.id }));
    }
  };


  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Typography variant="h4" mb={4} className={classes.header}>
            New Movie Page
          </Typography>

          <form className={classes.form} onSubmit={handleCreateMovie}>
            <TextField
              className={classes.textField}
              label="Title"
              type="text"
              value={name}
              margin='dense'
              fullWidth
              onChange={(e) => setName(e.target.value)}
              required
            />
            <DatePicker
              className={classes.textField}
              label="Release Date"
              margin='dense'
              fullWidth
              value={releaseDate}
              onChange={(value) => setReleaseDate(value)}
            />

            <div className={classes.buttonContainer}>
              <Box mr={2}>
                <Button variant="contained" type="submit" className={classes.createMovieButton}>
                  Create Movie
                </Button>
              </Box>
              <Button variant="contained" onClick={() => navigate(`/actor/${actorId}`)} className={classes.backButton} >
                Back
              </Button>
            </div>
          </form>
        </Container>

        <Snackbar
          open={successOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
        >
          <SnackbarContent
            message="Movie created successfully!"
            style={{ backgroundColor: '#00C853' }} // Green color
          />
        </Snackbar>

        {/* Error Alert */}
        <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleErrorClose}
        >
          <SnackbarContent
            message="Failed to create movie!"
            style={{ backgroundColor: '#D50000' }} // Red color
          />
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default CreateMoviePage;