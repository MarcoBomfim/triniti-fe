import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchActorsRequest,
  addActorRequest,
  addMovieToActorRequest,
  actorsSlice,
  setActors, addActor, addMovieToActor
} from './actorsSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('axios');

describe('actorsSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchActorsRequest', () => {
    it('should dispatch the correct actions on successful fetch', async () => {
      const responseData = [{ id: 1, name: 'Actor 1' }, { id: 2, name: 'Actor 2' }];
      axios.get.mockResolvedValueOnce({ data: responseData });

      await store.dispatch(fetchActorsRequest());

      const actions = store.getActions();
      expect(actions[0].type).toEqual(fetchActorsRequest.pending.type);
      expect(actions[1].type).toEqual(fetchActorsRequest.fulfilled.type);
      expect(actions[1].payload).toEqual(responseData);
    });
  });

  describe('addActorRequest', () => {
    it('should dispatch the correct actions on successful actor creation', async () => {
      const actorData = { name: 'New Actor' };
      const responseData = { id: 3, name: 'New Actor' };
      axios.post.mockResolvedValueOnce({ data: responseData });

      await store.dispatch(addActorRequest(actorData));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(addActorRequest.pending.type);
      expect(actions[1].type).toEqual(addActorRequest.fulfilled.type);
      expect(actions[1].payload).toEqual(responseData);
    });
  });

  describe('addMovieToActorRequest', () => {
    it('should dispatch the correct actions on successful movie addition to actor', async () => {
      const actorId = 1;
      const movieId = 1;
      const responseData = { actorId, movieId };
      axios.post.mockResolvedValueOnce({ data: responseData });

      await store.dispatch(addMovieToActorRequest({ actorId, movieId }));

      const actions = store.getActions();
      expect(actions[0].type).toEqual(addMovieToActorRequest.pending.type);
      expect(actions[1].type).toEqual(addMovieToActorRequest.fulfilled.type);
      expect(actions[1].payload).toEqual(responseData);
    });
  });

  describe('reducers', () => {
    it('should handle setActors', () => {
      const actors = [{ id: 1, name: 'Actor 1' }, { id: 2, name: 'Actor 2' }];
      const newState = actorsSlice.reducer([], setActors(actors));
      expect(newState).toEqual(actors);
    });

    it('should handle addActor', () => {
      const actor = { id: 3, name: 'New Actor' };
      const newState = actorsSlice.reducer([], addActor(actor));
      expect(newState).toEqual([actor]);
    });

    it('should handle addMovieToActor', () => {
      const state = [
        { id: 1, name: 'Actor 1', movieIds: [] },
        { id: 2, name: 'Actor 2', movieIds: [] },
      ];
      const actorId = 1;
      const movieId = 1;
      const expectedState = [
        { id: 1, name: 'Actor 1', movieIds: [1] },
        { id: 2, name: 'Actor 2', movieIds: [] },
      ];
      const newState = actorsSlice.reducer(state, addMovieToActor({ actorId, movieId }));
      expect(newState).toEqual(expectedState);
    });
  });
});