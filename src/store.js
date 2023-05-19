import { configureStore } from "@reduxjs/toolkit";
import actorsSlice from "./Actor/actorsSlice";
import moviesSlice from "./Movie/moviesSlice";

export default configureStore({
  reducer: {
    actors: actorsSlice,
    movies: moviesSlice
  },
});
