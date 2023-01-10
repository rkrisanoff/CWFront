import React, { Component } from "react";
import Form from "react-validation/build/form";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";
import ShowDeposits from "./asteroids/show-deposits";

class BoardAsteroid extends Component {
    constructor(props) {
        super(props);
        this.handleShowDeposits = this.handleShowDeposits.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            asteroids: [],
            deposits:[],
            activeAsteroidId: null,
            modals: {
                showDeposits: false,
            },
        };
    }

    handleShowDeposits(id, modal) {
        userService.get(`asteroids/${id}/deposits`)
            .then(
                ({ data }) => {
                    this.setState({
                        deposits: data.slice(0, 50)
                    })
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message || error.toString();
                    console.log(resMessage);
                }
            );
        this.setState({
            activeAsteroidId: id,
            modals: { ...this.state.modals, [modal]: true }
        })
    }
    handleClose(modal) {
        this.setState({
            modals: { ...this.state.modals, [modal]: false }
        });
    }
    componentDidMount() {
        userService.get("asteroids/all")
            .then(
                ({ data }) => {
                    this.setState({
                        asteroids: data.slice(0, 50)
                    })
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message || error.toString();
                    console.log(resMessage);
                }
            );
    }
    render() {
        return (
            <div className="col-md-12">
                {/* <ShowDeposits id={this.state.activeAsteroidId} handleClose={() => this.handleClose("showDeposits")} isActive={this.state.modals.showDeposits} /> */}
                <Modal show={this.state.modals.showDeposits} onHide={()=>this.handleClose("showDeposits")}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposits in asteroid {this.props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "bor_quantity"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.deposits.map(
                                ({ id, bor_quantity }) => (
                                    <tr>
                                        <th scope="row">{id}
                                        </th>
                                        <td>{bor_quantity}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>this.handleClose("showDeposits")}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                <div>
                    <h1>Asteroids</h1>

                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "name", "", "distance"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.asteroids.map(
                                ({ id, name, distance }) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <td>{name}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary" onClick={() => this.handleShowDeposits(id, "showDeposits")}>
                                                <i class="bi bi-gem"></i>
                                            </button>
                                        </td>
                                        <td>{distance}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default withRouter(BoardAsteroid);