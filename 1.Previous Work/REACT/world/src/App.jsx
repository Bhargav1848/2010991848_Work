import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./Pages/Map";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Header from "./Components/Header";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Edit from "./Pages/Edit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          /**------------------route for home page-- */
          <Route path="/" exact element={<Home />} />
          /**------------------route for map page-- */
          <Route path="/map" exact element={<Map />} />
          /**------------------route for about page-- */
          <Route
            path="/About"
            exact
            element={
              <>
                <Header />
                <About />
              </>
            }
          />
          /**------------------route for contacts page-- */
          <Route
            path="/Contacts"
            exact
            element={
              <>
                <Header />
                <Contact />
              </>
            }
          />
          /**------------------route for login page-- */
          <Route
            path="/Login"
            exact
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          /**------------------route for register page-- */
          <Route
            path="/Register"
            exact
            element={
              <>
                <Header />
                <Register />
              </>
            }
          />
          /**------------------route for dashboard -- */
          <Route
            path="/Dashboard"
            exact
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/User/*"
            element={
              <>
                <Header />
                <Edit />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
