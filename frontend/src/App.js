import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollTop from "./hooks/ScrollTop";

function App() {
  return (
    <>
      <ScrollTop />
      <NavBar />
      <div className="min-h-screen"> {/* Add margin-top to prevent content overlap */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
