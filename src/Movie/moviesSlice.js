import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { nanoid } from "nanoid";

const API_BASE_URL = 'http://localhost:3001';

export const fetchMoviesRequest = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
});

export const addMovieRequest = createAsyncThunk('movies/createMovie', async (payload) => {
  try {
    const { actorId, movie } = payload;
    const response = await axios.post(`${API_BASE_URL}/actors/${actorId}/movies`, movie);
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState: [
  ],
  reducers: {
    setMovies: (state, action) => {
      return action.payload
    },
    addMovie: (state, action) => {
      const { name, releaseDate } = action.payload;
      state.push({ id: nanoid(), name, releaseDate });
    },
    removeMovie: (state, action) => {
      const movieId = action.payload;
      return state.filter((movie) => movie.id !== movieId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesRequest.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addMovieRequest.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});


export const { setMovies, addMovie, removeMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
