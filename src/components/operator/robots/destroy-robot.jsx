import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import AuthService from "../../services/auth.service";

// import { withRouter } from '../common/with-router';


class DestroyRobotComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      robotId: props.id,
      loading: false,
      message: ""
    };
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
          <Modal.Title>Destroying</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure that you want to destroy robot?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.loading}>
            Destroy
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DestroyRobotComponent;
// export default withRouter(Login);