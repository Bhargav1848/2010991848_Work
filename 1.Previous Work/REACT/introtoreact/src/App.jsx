import logo from "./logo.svg";
import "./App.css";
import First from "./Components/First";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Welcome from "./Components/Welcome";
import Style from "./Components/Style";
import Header from "./Components/Header";
import Home from "./Components/Home";
function App() {
  return (
    <div className="App">
      {/* <First/> */}
      <div style={{ width: "50%" }}>
        <h3>Task 1</h3>
        <div style={{ gap: "10%", display: "flex" }} id="task1">
          <Login />
          <Registration />
          <Welcome user="Bhargav" />
        </div>
        {/* <Style /> */}
        {/* <Header /> */}
        {/* <Home /> */}
      </div>
    </div>
  );
}

export default App;
