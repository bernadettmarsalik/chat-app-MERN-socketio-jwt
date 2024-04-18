import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Themes from "./pages/theme/Themes";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="flex justify-center pt-5 mb-1 mx-auto">
        <Themes />
      </div>
      <div className="h-screen w-screen md:flex flex-column md:flex-row items-start justify-center">
        <Routes>
          {/* if user is logged in navigate to home page if not then login page */}
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignUp />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
