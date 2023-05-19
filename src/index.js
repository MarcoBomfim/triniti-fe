import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "./index.css";
import App from "./App";
import ActorPage from "./Actor/ActorPage";
import CreateActorPage from "./Actor/CreateActorPage";
import CreateMoviePage from "./Movie/CreateMoviePage";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/actor/:id",
    element: <ActorPage />,
  },
  {
    path: "/new-actor",
    element: <CreateActorPage />,
  },
  {
    path: "/new-movie/:actorId",
    element: <CreateMoviePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <React.StrictMode>

      <RouterProvider router={router} />

    </React.StrictMode>
    </LocalizationProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
