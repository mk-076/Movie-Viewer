import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/movies" element={<MoviesPage />}></Route>
    </Routes>
  );
}

export default App;
