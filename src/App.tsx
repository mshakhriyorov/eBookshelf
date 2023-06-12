import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Books } from "./components/Books";
import { Register } from "./components/Register";

import { routePaths } from "./utils/routePaths";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={routePaths.home()} element={<Books />} />
        <Route path={routePaths.signup()} element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
