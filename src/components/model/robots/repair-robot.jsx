import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authHeader from '../../../services/auth-header';
import userService from "../../../services/user.service";

import { withRouter } from '../../../common/with-router';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class RepairRobotComponent extends Component {
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


        userService.get(`robots/${this.props.id}/repair`)
            .then(
                () => {
                    this.setState({
                        loading: false
                    });
                    this.props.handleClose();
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
                    <Modal.Title>Repairing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure that you want to repair the robot with id = {this.props.id}?

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.loading}>
                        Repair
                    </Button>
                </Modal.Footer>
            </Modal>



        );
    }
}
export default withRouter(RepairRobotComponent);