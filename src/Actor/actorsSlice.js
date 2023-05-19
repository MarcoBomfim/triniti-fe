import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchActorsRequest = createAsyncThunk('actors/fetchActors', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching actors:', error);
    throw error;
  }
});

export const addActorRequest = createAsyncThunk('actors/addActor', async (actorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/actors`, actorData);
    return response.data;
  } catch (error) {
    console.error('Error creating actor:', error);
    throw error;
  }
});

export const addMovieToActorRequest = createAsyncThunk(
  'actors/addMovieToActor',
  async ({ actorId, movieId }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/actors/${actorId}/movies`, { movieId });
      return response.data;
    } catch (error) {
      console.error('Error adding movie to actor:', error);
      throw error;
    }
  }
);

export const actorsSlice = createSlice({
  name: "actors",
  initialState: [],
  reducers: {
    setActors: (state, action) => {
      return action.payload
    },
    addActor: (state, action) => {
      state.push(action.payload);
    },
    addMovieToActor: (state, action) => {
      const { actorId, movieId } = action.payload;
      
      const actor = state.find((actor) => actor.id === actorId);
      
      if (actor) {
        actor.movieIds.push(movieId);
        state = { ...state, actor }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActorsRequest.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addActorRequest.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(addMovieToActorRequest.fulfilled, (state, action) => {
        const { actorId, movieId } = action.payload;
        const actor = state.find((actor) => actor.id === actorId);
        if (actor) {
          actor.movieIds.push(movieId);
        }
      });
  },
});

export const { setActors, addActor, addMovieToActor } = actorsSlice.actions;

export default actorsSlice.reducer;


