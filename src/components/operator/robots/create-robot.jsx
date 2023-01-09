import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import authService from "../../../services/auth.service";
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

class CreateRobotComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeAsteroid = this.onChangeAsteroid.bind(this);
        this.onChangeBrain = this.onChangeBrain.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeEyes = this.onChangeEyes.bind(this);

        this.state = {
            asteroid_id: null,
            body_series: null,
            brain_series: null,
            eye_series: null,
            operator_id:null,
            loading: false,
            message: ""
        };
    }



    onChangeAsteroid(e) {
        this.setState({
            asteroid_id: e.target.value
        });
    }
    onChangeBrain(e) {
        this.setState({
            brain_series: e.target.value
        });
    }
    onChangeBody(e) {
        this.setState({
            body_series: e.target.value
        });
    }
    onChangeEyes(e) {
        this.setState({
            eye_series: e.target.value
        });
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        if (user && user.id) {
          this.setState({
            operator_id: user.id,
    
          });
        }
      }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            userService.post(`robots/create`,
                {
                    asteroid_id: this.state.asteroid_id,
                    body_series: this.state.body_series,
                    brain_series: this.state.brain_series,
                    eye_series: this.state.eye_series,
                    operator_post_id: this.state.operator_id,
                    operator_id:this.state.operator_id
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
                    <Modal.Title>Move Robot into Asteroid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={this.props.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        Build Robot
                        <br />
                        <div>

                            <div className="form-group">
                                <label htmlFor="password">Brain</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="brain_series"
                                    value={this.state.brain_series}
                                    onChange={this.onChangeBrain}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Body</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="body_series"
                                    value={this.state.body_series}
                                    onChange={this.onChangeBody}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Eyes</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="eye_series"
                                    value={this.state.eye_series}
                                    onChange={this.onChangeEyes}
                                    validations={[required]}
                                />
                            </div>                <div className="form-group">
                                <label htmlFor="password">Asteroid</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="asteroid_id"
                                    value={this.state.asteroid_id}
                                    onChange={this.onChangeAsteroid}
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
                        Move
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default withRouter(CreateRobotComponent);