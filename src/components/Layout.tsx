
import { Outlet, useLocation } from "react-router-dom";
import { GRID_PAPER } from "@/lib/gridPaper";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  // The map page sits on graph paper from edge to edge, behind the nav and footer too.
  const onMap = useLocation().pathname === "/map";
  return (
    <div className="min-h-screen flex flex-col" style={onMap ? GRID_PAPER : undefined}>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;