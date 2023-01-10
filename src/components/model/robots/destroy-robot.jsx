import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import userService from "../../../services/user.service";

import { withRouter } from '../../../common/with-router';


class DestroyRobotComponent extends Component {
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


        userService.get(`robots/${this.props.id}/delete`)
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
                    <Modal.Title>Destroying</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure that you want to destroy robot?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={this.handleSubmit} disabled={this.state.loading}>
                        Destroy
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default withRouter(DestroyRobotComponent);