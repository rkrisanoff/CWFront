import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { withRouter } from '../common/with-router';
import userService from "../../../services/user.service";


class ExploreAsteroidComponent extends Component {
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

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.post(`asteroids/explore`,
      {
        robot_id:this.props.robot_id,
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
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (

      <Modal show={this.props.isActive} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exploring</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Explore new asteroid by robot {this.props.robot_id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.loading}>
            Explore
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ExploreAsteroidComponent;
// export default withRouter(Login);