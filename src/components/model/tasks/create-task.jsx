import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { withRouter } from '../../../common/with-router';
import userService from "../../../services/user.service";

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
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.state = {
            description: "",
            cost: "",
            loading: false,
            message: ""
        };
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeCost(e) {
        this.setState({
            cost: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            userService.post(`tasks/create`,
                {
                    creatorPostId:this.props.creatorPostId,
                    description: this.state.description,
                    cost:this.state.cost
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
                    <Modal.Title>Creating Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={this.props.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        Create Task
                        <br />
                        <div>

                            <div className="form-group">
                                <label htmlFor="password">Description</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Cost</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="cost"
                                    value={this.state.cost}
                                    onChange={this.onChangeCost}
                                    validations={[required]}
                                />
                            </div>
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
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default withRouter(MoveRobotComponent);