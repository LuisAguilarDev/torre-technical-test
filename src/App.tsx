import { Route, Routes } from "react-router";
import "./App.css";
import Container from "./layouts/Container";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
