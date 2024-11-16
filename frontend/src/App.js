import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollTop from "./hooks/ScrollTop";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/AuthSlice";
import {login} from "./redux/AuthSlice";
import Cookies from "js-cookie";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(login(Cookies.get("email")));
  }, [dispatch]);

  return (
    <React.Fragment>
      <ScrollTop />
      <NavBar />
      <Suspense fallback={<Loader />}>
        <div className="min-h-screen pt-20"> 
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;
