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
import BoardRobots from "./components/model/board-robots";
import BoardTasks from "./components/model/board-tasks";
import BoardEyes from "./components/model/board-eyes";
import BoardBrains from "./components/model/board-brains";
import BoardBodies from "./components/model/board-bodies";
import BoardAsteroids from "./components/model/board-asteroids";
import BoardSpaceships from "./components/model/board-spaceships";
import BoardMicroreactors from "./components/model/board-microreactors";
import BoardDepartments from "./components/model/board-departments";
import BoardPosts from "./components/model/board-posts";
import BoardEmployees from "./components/model/board-employees";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showOperatorBoard: false,
      showManagerBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user && user.roles) {
      this.setState({
        currentUser: user,
        showOperatorBoard: user.roles.includes("operator"),
        showManagerBoard: user.roles.includes("manager"),

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
      showOperatorBoard: false,
      showManagerBoard: false,

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

            {/* {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )} */}

            {currentUser && this.state.showOperatorBoard && (<>

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
            {currentUser && this.state.showOperatorBoard && (<>
              <li className="nav-item">
                <Link to={"/manager/spaceships"} className="nav-link">
                  spaceship
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/manager/microreactors"} className="nav-link">
                  microreactor
                </Link>
              </li>
            </>)}
            {currentUser && (<>
              <li className="nav-item">
                <Link to={"/manager/departments"} className="nav-link">
                  departments
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/manager/posts"} className="nav-link">
                posts
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/manager/employees"} className="nav-link">
                employees
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/operator/robots" element={<BoardRobots />} />
            <Route path="/operator/asteroids" element={<BoardAsteroids />} />
            <Route path="/operator/tasks" element={<BoardTasks />} />
            <Route path="/operator/bodies" element={<BoardBodies />} />
            <Route path="/operator/eyes" element={<BoardEyes />} />
            <Route path="/operator/brains" element={<BoardBrains />} />
            <Route path="/manager/spaceships" element={<BoardSpaceships />} />
            <Route path="/manager/microreactors" element={<BoardMicroreactors />} />
            <Route path="/manager/departments" element={<BoardDepartments />} />
            <Route path="/manager/posts" element={<BoardPosts/>} />
            <Route path="/manager/employees" element={<BoardEmployees/>} />

            

            {/* <Route path="/manager/asteroids" element={<BoardRobotOperator />} />
            <Route path="/manager/tasks" element={<BoardRobotOperator />} />
            <Route path="/manager/bodies" element={<BoardRobotOperator />} />
            <Route path="/manager/eyes" element={<BoardRobotOperator />} />
             */}


          </Routes>
        </div>

        <AuthVerify logOut={this.logOut} />
      </div>
    );
  }
}

export default App;
