import { Route, Routes } from "react-router";
import "./App.css";
import Container from "./layouts/Container";
import Home from "./pages/Home";
import SkillGap from "./pages/SkillGap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Home />} />
        <Route path="skill-gap" element={<SkillGap />} />
      </Route>
    </Routes>
  );
}

export default App;
