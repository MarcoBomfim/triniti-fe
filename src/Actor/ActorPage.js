import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchActorsRequest } from './actorsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import { fetchMoviesRequest } from '../Movie/moviesSlice';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  actorName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createMovieButton: {
    marginBottom: '20px',
  },
}));

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
    <div className={classes.root}>
      <Typography variant="h1" className={classes.header}>
        Actor Page
      </Typography>

      <Button onClick={() => navigate('/')}>Back</Button>

      <div className={classes.section}>
        {actor && (
          <div>
            <Typography variant="h2" className={classes.actorName}>
              {actor.firstName} {actor.lastName}
            </Typography>
            <Typography variant="subtitle1" align="center">
              Age: {actor.age}
            </Typography>
          </div>
        )}
      </div>

      <div className={classes.section}>
        <Typography variant="h2">Movies List</Typography>
        <Button variant="contained" onClick={handleNewMovie} className={classes.createMovieButton}>
          New Movie
        </Button>
        {movies.map(movie => (
          <Card key={movie.id} className={classes.movieCard}>
            <CardContent>
              <Typography variant="h5">{movie.name}</Typography>
              <Typography variant="subtitle1">Release Date: {movie.releaseDate}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActorPage;