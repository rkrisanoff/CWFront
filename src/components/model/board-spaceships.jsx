import React, { Component } from "react";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import RecycleBorComponent from "./spaceships/recycle-bor";
import ShowMicroreactorsComponent from "./spaceships/show-microreactors";
import userService from "../../services/user.service";


class BoardSpaceShip extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateSpaceship = this.handleUpdateSpaceship.bind(this);
        this.handleShowMicroreactors = this.handleShowMicroreactors.bind(this);
        this.state = {
            spaceships: [
            ],
            modals: {
                b2_h6_quantity: false,
                b5_h12_quantity: false,
                b10_h14_quantity: false,
                b12_h12_quantity: false,
                show_microreactors: false
            },
            activeSpaceshipId: null,
            borType: null,
        };
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
        this.setState({
            activeSpaceshipId: id,
            modals: { ...this.state.modals, show_microreactors: true }
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
                <RecycleBorComponent
                    id={this.state.activeSpaceshipId}
                    borType={this.state.borType}
                    borCount={this.state.borCount}
                    handleClose={() => this.handleClose(this.state.borType)}
                    isActive={this.state.modals[this.state.borType]}
                />
                <ShowMicroreactorsComponent
                    id={this.state.activeSpaceshipId}
                    handleClose={() => this.handleClose("show_microreactors")}
                    isActive={this.state.modals.show_microreactors}
                />
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col"></th>
                                <th scope="col">department_id</th>
                                <th scope="col">income</th>
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
                                        <td>{department_id}</td>
                                        <td>{income}</td>

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