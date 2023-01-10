import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vage = value => {
  if ((+value < 18) || (+value > 60)) {
    return (
      <div className="alert alert-danger" role="alert">
        The age must be between 18 and 60 ages
      </div>
    );
  }
}

const vFLP = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Must be between 3 and 20 characters.
      </div>
    );
  }
}

const vgender = value => {
  if ((value !== "male") && (value !== "female")) {
    return (
      <div className="alert alert-danger" role="alert">
        There are only two genders
      </div>
    );
  }
}

const vrole = value => {
  if ((value !== 'operator') && (value !== 'manager')) {
    return (
      <div className="alert alert-danger" role="alert">
        role must be 'operator' or 'manager' `(sorry, a will add radio when i get a fine internet-connection)`
      </div>
    );
  }
}

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePatronymic = this.onChangePatronymic.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);


    this.state = {
      role: "operator",
      username: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
      patronymic: "",
      age: null,
      gender: null,
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangePasswordConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangePatronymic(e) {
    this.setState({
      patronymic: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }
  onChangeRole(role) {
    this.setState({
      role: role
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(this.state).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <ToggleButtonGroup name="role" type="radio" value={this.state.role} onChange={this.onChangeRole} defaultValue={"operator"}>
                    <ToggleButton id="tbg-btn-1" value={"operator"} variant={'outline-success'}>
                    operator
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={"manager"} variant={'outline-danger'}>
                    manager
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_confirmation">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    value={this.state.password_confirmation}
                    onChange={this.onChangePasswordConfirmation}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.onChangeFirstName}
                    validations={[required, vFLP]}
                  />
                </div>                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.onChangeLastName}
                    validations={[required, vFLP]}
                  />
                </div>                <div className="form-group">
                  <label htmlFor="patronymic">Patronymic</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="patronymic"
                    value={this.state.patronymic}
                    onChange={this.onChangePatronymic}
                    validations={[required, vFLP]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChangeAge}
                    validations={[required, vage]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChangeGender}
                    validations={[required, vgender]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
