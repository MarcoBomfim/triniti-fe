import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActorsRequest, setActors } from './Actor/actorsSlice';
import { fetchMoviesRequest } from './Movie/moviesSlice';
import { setMovies } from './Movie/moviesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@mui/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';

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
  button: {
    color: '#FFFFFF', // White
    backgroundColor: '#A40E4C', // Deep wine
    marginBottom: '16px', // Adjust the spacing as desired
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
  card: {
    backgroundColor: '#FFFFFF', // White
    marginBottom: '16px', // Adjust the spacing as desired
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', // Set the height to occupy the available space
  },
  cardContent: {
    flexGrow: 1, // Allow the content to grow and fill the available space
  },
  buttonContainer: {
    marginTop: '16px',
    textAlign: 'center', // Center the button
  },
});

// Define the component
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const actors = useSelector(state => state.actors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedActors = await dispatch(fetchActorsRequest());
        const movies = await dispatch(fetchMoviesRequest());

        dispatch(setActors(fetchedActors.payload));
        dispatch(setMovies(movies.payload));

      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" className={classes.header}>
          Actors List
        </Typography>

        <div className={classes.buttonContainer}>
            <Button variant="contained" className={classes.button} onClick={() => navigate('/new-actor')}>
              New Actor
            </Button>
        </div>

        <Grid container spacing={2} mt={4}>
          {actors.map(actor => (
            <Grid item xs={12} sm={6} md={4} key={actor.id}>
              <Link to={`/actor/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" className={classes.actorCardTitle}>
                      {actor.firstName} {actor.lastName}
                    </Typography>
                    <Typography variant="subtitle1">Age: {actor.age}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  </ThemeProvider>
  );
};

export default App;
