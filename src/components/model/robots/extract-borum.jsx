import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import AuthService from "../../services/auth.service";
import userService from "../../../services/user.service";

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

class ExtractBorumComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeDeposit = this.onChangeDeposit.bind(this);

        this.state = {
            deposit_id: null,
            loading: false,
            message: ""
        };
    }
    onChangeDeposit(e) {
        this.setState({
            deposit_id: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        console.log(1);

        if (this.checkBtn.context._errors.length === 0) {
            userService.post(`robots/${this.props.id}/extract`,
                {
                    deposit_id: this.state.deposit_id,
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
                                error.response.data ) ||
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
                    <Modal.Title>Extracting Bor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={this.props.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >   Sending robot {this.props.id} to extract bot
                        <br />
                        Specify deposit id
                        <div className="form-group">
                            <label htmlFor="deposit_id">Deposit</label>
                            <Input
                                type="number"
                                className="form-control"
                                name={"deposit_id"}
                                value={this.state.deposit_id}
                                onChange={this.onChangeDeposit}
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
                    <Button variant="warning" onClick={this.handleSubmit} disabled={this.state.loading}>
                        Extract
                    </Button>
                </Modal.Footer>
            </Modal>



        );
    }
}
export default ExtractBorumComponent;
// export default withRouter(Login);