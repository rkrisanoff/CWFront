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


      userService.post(`asteroids/explore`,
      {
        robot_id:this.props.robot_id,
      })
      .then(
        () => {
          this.setState({
            loading: false
          });
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