import React from "react";
import { Route, Routes } from "react-router-dom";

import { Books } from "./components/Books";
import { Register } from "./components/Register";

import { routePaths } from "./utils/routePaths";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={routePaths.home()} element={<Books />} />
        <Route path={routePaths.register()} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
