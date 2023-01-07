import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import BoardRobotOperator from "./components/operator/board-robots";
import BoardTasksOperator from "./components/operator/board-tasks";
import BoardEyesOperator from "./components/operator/board-eyes";
import BoardBrainOperator from "./components/operator/board-brains";
import BoardBodyOperator from "./components/operator/board-bodies";




class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      // showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Drukhary&&Wellet
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

      

            {/* {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}

            {currentUser && (<>

              {/* <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
             */}
            <li className="nav-item">
              <Link to={"/operator/robots"} className="nav-link">
                robots
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/operator/tasks"} className="nav-link">
                tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/operator/asteroids"} className="nav-link">
                asteroids
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/operator/eyes"} className="nav-link">
              eyes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/operator/brains"} className="nav-link">
              brains
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/operator/bodies"} className="nav-link">
              bodies
              </Link>
            </li>
            </>)}
          </div>


          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/operator/robots" element={<BoardRobotOperator />} />
            <Route path="/operator/asteroids" element={<BoardRobotOperator />} />
            <Route path="/operator/tasks" element={<BoardTasksOperator />} />
            <Route path="/operator/bodies" element={<BoardBodyOperator />} />
            <Route path="/operator/eyes" element={<BoardEyesOperator />} />
            <Route path="/operator/brains" element={<BoardBrainOperator />} />

            {/* <Route path="/manager/robots" element={<BoardRobotOperator />} />
            <Route path="/manager/asteroids" element={<BoardRobotOperator />} />
            <Route path="/manager/tasks" element={<BoardRobotOperator />} />
            <Route path="/manager/bodies" element={<BoardRobotOperator />} />
            <Route path="/manager/eyes" element={<BoardRobotOperator />} />
            <Route path="/manager/brains" element={<BoardRobotOperator />} /> */}


          </Routes>
        </div>

        <AuthVerify logOut={this.logOut}/>
      </div>
    );
  }
}

export default App;
