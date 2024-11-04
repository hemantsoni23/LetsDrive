import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollTop from "./hooks/ScrollTop";

function App() {
  return (
    <React.Fragment>
      <ScrollTop />
      <NavBar />
      <div className="min-h-screen pt-20"> {/* Adjusted padding to prevent content overlap */}
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
