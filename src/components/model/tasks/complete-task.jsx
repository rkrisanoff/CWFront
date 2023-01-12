import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthService from "../../../services/auth.service";

import { withRouter } from '../../../common/with-router';
import userService from "../../../services/user.service";


class CompleteTask extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
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

    userService.post(`tasks/${this.props.id}/update`,
      {
        state:'complete'
      })
      .then(
        () => {
          this.props.handleClose()
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );

  }

  render() {
    return (

      <Modal show={this.props.isActive} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Completing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to note this task as completed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={this.handleSubmit} disabled={this.state.loading}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withRouter(CompleteTask);