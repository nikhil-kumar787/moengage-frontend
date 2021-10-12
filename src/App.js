import "./App.css";
import LoginPage from "./screens/LoginPage";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import RegisterPage from "./screens/RegisterPage";
import { useState } from "react";
import Anime from "./screens/Anime";
import PrivateRoute from "./components/HOC/PrivateRoute";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
        <PrivateRoute path="/anime/:id" component={Anime} />

        <PrivateRoute
          path="/home"
          component={({ history }) => (
            <LandingPage search={search} history={history} />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
