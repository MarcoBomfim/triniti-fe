import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActorsRequest } from './actorsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { createTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { fetchMoviesRequest } from '../Movie/moviesSlice';

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
  actorInfo: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  actorName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6A0D2F',
    marginBottom: '8px',
  },
  actorAge: {
    fontSize: '16px',
    color: '#6A0D2F',
  },
  moviesList: {
    marginTop: '24px',
  },
  movieCard: {
    backgroundColor: '#FFFFFF', // White
    marginBottom: '16px', // Adjust the spacing as desired
    height: '100%'
  },
  movieCardContent: {
    paddingBottom: '8px',
  },
  movieName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#6A0D2F',
  },
  movieReleaseDate: {
    fontSize: '14px',
    color: '#6A0D2F',
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
});


const ActorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const actors = useSelector(state => state.actors);
  const allMovies = useSelector(state => state.movies);

  const actor = actors.find(actor => actor.id === parseInt(id));
  const movies = allMovies.filter(movie => actor.movies.includes(movie.id));

  useEffect(() => {
    dispatch(fetchActorsRequest());
    dispatch(fetchMoviesRequest());
  }, [dispatch, id]);

  const handleNewMovie = () => {
    navigate(`/new-movie/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Typography variant="h4" className={classes.header}>
            Actor Details
          </Typography>

          {actor && (
            <div className={classes.actorInfo}>
              <Typography variant="h5" className={classes.actorName}>
                {actor.firstName} {actor.lastName}
              </Typography>
              <Typography variant="subtitle1" className={classes.actorAge}>
                Age: {actor.age}
              </Typography>
            </div>
          )}

        <div className={classes.buttonContainer}>
          <Box mr={2}>
            <Button variant="contained" onClick={handleNewMovie} className={classes.createMovieButton}>
              New Movie
            </Button>
          </Box>
          <Button variant="contained" color="secondary" className={classes.backButton} onClick={() => navigate('/')} >
            Back
          </Button>
        </div>

          <Grid container spacing={2} mt={4} mb={4} className={classes.moviesList}>
            {movies.map(movie => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Card className={classes.movieCard}>
                  <CardContent className={classes.movieCardContent}>
                    <Typography variant="h6" className={classes.movieName}>
                      {movie.name}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.releaseDate}>
                      {movie.releaseDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default ActorPage;