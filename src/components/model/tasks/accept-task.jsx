import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import AuthService from "../../services/auth.service";

import { withRouter } from '../../../common/with-router';


class AcceptTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
     this.state = {
      taskId: props.id,
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
    this.setState({
      message: ``,
      loading: false
    });
  }
  Accepting
  render() {
    return (

      <Modal show={this.props.isActive} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Accepting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to accept the task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.handleSubmit} disabled={this.state.loading}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withRouter(AcceptTaskComponent);