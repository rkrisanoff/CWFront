import React, { Component } from "react";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import RecycleBorComponent from "./spaceships/recycle-bor";
import ShowMicroreactorsComponent from "./spaceships/show-microreactors";
import userService from "../../services/user.service";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WorkSpaceship from "./spaceships/work-spaceship";

class BoardSpaceShip extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateSpaceship = this.handleUpdateSpaceship.bind(this);
        this.handleShowMicroreactors = this.handleShowMicroreactors.bind(this);
        this.handleWorkSpaceship = this.handleWorkSpaceship.bind(this);
        this.handleCloseShowMicroreactors = this.handleCloseShowMicroreactors.bind(this);
        this.state = {
            spaceships: [
            ],
            modals: {
                b2_h6_quantity: false,
                b5_h12_quantity: false,
                b10_h14_quantity: false,
                b12_h12_quantity: false,
                show_microreactors: false,
                work:false,
            },
            activeSpaceshipId: null,
            borType: null,
            microreactors: [],
        };
    }

    handleWorkSpaceship(id) {
        this.setState({
            activeSpaceshipId: id,
            modals: { ...this.state.modals, "work": true }
        })
    }
    handleUpdateSpaceship(id, borCount, modal) {
        this.setState({
            activeSpaceshipId: id,
            borType: modal,
            borCount: borCount,
            modals: { ...this.state.modals, [modal]: true }
        })
    }

    handleShowMicroreactors(id) {
        id && userService.get(`spaceships/${id}/microreactors`)
            .then(
                ({ data }) => {
                    this.setState({
                        microreactors: data
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
            activeSpaceshipId: id,
            modals: { ...this.state.modals, show_microreactors: true }
        });
    }

    handleCloseShowMicroreactors(){
        this.setState({
            modals: { ...this.state.modals, "show_microreactors": false }
        });
    }
    handleClose(modal) {
        this.setState({
            modals: { ...this.state.modals, [modal]: false }
        });
        userService.get("spaceships/all")
            .then(
                ({ data }) => {
                    this.setState({
                        spaceships: data.slice(0, 50)
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
    componentDidMount() {
        userService.get("spaceships/all")
            .then(
                ({ data }) => {
                    this.setState({
                        spaceships: data
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
                <h1> Spaceships </h1>

                <RecycleBorComponent
                    id={this.state.activeSpaceshipId}
                    borType={this.state.borType}
                    borCount={this.state.borCount}
                    handleClose={() => this.handleClose(this.state.borType)}
                    isActive={this.state.modals[this.state.borType]}
                />
                <WorkSpaceship 
                id={this.state.activeSpaceshipId}
                    handleClose={() => this.handleClose("work")}
                    isActive={this.state.modals.work} />
                <Modal show={this.state.modals.show_microreactors} onHide={this.props.handleClose} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Microreactors in spacehip {this.state.activeSpaceshipId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">b2_h6</th>
                                <th scope="col">b5_h12</th>
                                <th scope="col">b10_h14</th>
                                <th scope="col">b12_h12</th>
                                <th scope="col">cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.microreactors.map(
                                ({ id, name, b2_h6_consumption_rate, b5_h12_consumprion_rate, b10_h14_consumption_rate, b12_h12_consumption_rate, cost }) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <td>{name}</td>
                                        <td>{cost}</td>
                                        <td>{b2_h6_consumption_rate}</td>
                                        <td>{b5_h12_consumprion_rate}</td>
                                        <td>{b10_h14_consumption_rate}</td>
                                        <td>{b12_h12_consumption_rate}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleCloseShowMicroreactors()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col"></th>
                                <th scope="col">department_id</th>
                                <th scope="col">income</th>
                                <th scope="col"></th>
                                <th scope="col">b2_h6_quantity</th>
                                <th scope="col"></th>
                                <th scope="col">b5_h12_quantity</th>
                                <th scope="col"></th>
                                <th scope="col">b10_h14_quantity</th>
                                <th scope="col"></th>
                                <th scope="col">b12_h12_quantity</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.spaceships.map(
                                ({ id, b2_h6_quantity, b5_h12_quantity, b10_h14_quantity, b12_h12_quantity, department_id, income }) => (
                                    <tr>
                                        <th scope="row" key={id}>{id} </th>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleShowMicroreactors(id)}>
                                                <i class="bi bi-battery-charging"></i>
                                            </button>
                                        </td>
                                        <td>{department_id}</td>
                                        <td>{income}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleWorkSpaceship(id)}>
                                                <i class="bi bi-battery-charging"></i>
                                            </button>
                                        </td>
                                        <td>{b2_h6_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, b2_h6_quantity, "b2_h6_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        <td>{b5_h12_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, b5_h12_quantity, "b5_h12_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        <td>{b10_h14_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, b10_h14_quantity, "b10_h14_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        <td>{b12_h12_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, b12_h12_quantity, "b12_h12_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        
                                        

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

export default withRouter(BoardSpaceShip);