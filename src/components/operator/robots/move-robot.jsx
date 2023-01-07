import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import AuthService from "../../services/auth.service";

// import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class MoveRobotComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeAsteroid = this.onChangeAsteroid.bind(this);
    this.state = {
      robotId: props.id,
      asteroid: "",
      loading: false,
      message: ""
    };
  }

  onChangeAsteroid(e) {
    this.setState({
      asteroid: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0) {
    //   AuthService.login(this.state.username, this.state.password).then(
    //     () => {
    //       this.props.router.navigate("/profile");
    //       window.location.reload();
    //     },
    //     error => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();

    //       this.setState({
    //         loading: false,
    //         message: resMessage
    //       });
    //     }
    //   );
    // } else {
    //   this.setState({
    //     loading: false
    //   });
    // }
    this.setState({
      message: `fuck you ${Math.random(100)}`,
      loading: false
    });
  }

  render() {
    return (

      <Modal show={this.props.isActive} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Move Robot into Asteroid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={this.props.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            Choose where are you going to move Robot
            <br/>
            Specify asteroid id
            <div className="form-group">
              <label htmlFor="asteroid">Asteroid</label>
              <Input
                type="text"
                className="form-control"
                name={"asteroid"}
                value={this.state.asteroid}
                onChange={this.onChangeAsteroid}
                validations={[required]}
              />
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.loading}>
            Move
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default MoveRobotComponent;
// export default withRouter(Login);