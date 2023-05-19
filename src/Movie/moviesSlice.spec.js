import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, {
  fetchMoviesRequest,
  addMovieRequest,
  moviesSlice,
} from './moviesSlice';
import axios from 'axios';

jest.mock('axios');

describe('moviesSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
  });

  it('should handle fetchMoviesRequest', async () => {
    const mockResponse = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    await store.dispatch(fetchMoviesRequest());

    const movies = store.getState().movies;
    expect(movies).toEqual(mockResponse);
  });

  it('should handle addMovieRequest', async () => {
    const mockResponse = { id: 3, name: 'Movie 3', releaseDate: '2022-03-04' };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const movieData = { name: 'Movie 3', releaseDate: '2022-03-04' };
    await store.dispatch(addMovieRequest(movieData));

    const movies = store.getState().movies;
    expect(movies).toEqual([mockResponse]);
  });

  it('should handle moviesSlice reducer', () => {
    const initialState = [];
    const movieData = { id: 1, name: 'Movie 1', releaseDate: '2022-03-04' };
    const action = moviesSlice.actions.addMovie(movieData);

    const nextState = moviesReducer(initialState, action);

    expect(nextState[0].name).toEqual(movieData.name);
  });
});
