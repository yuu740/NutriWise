import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <Navbar>
      <Outlet /> {/* Ini akan render route nested */}
    </Navbar>
  );
};

export default AppLayout;
