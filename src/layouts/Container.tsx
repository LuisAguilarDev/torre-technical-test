import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Container = () => {
  return (
    <div className="min-h-screen bg-background-1">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Container;
