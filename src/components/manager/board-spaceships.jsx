import React, { Component } from "react";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import RecycleBorComponent from "./spaceships/recycle-bor";


class BoardSpaceShip extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateSpaceship = this.handleUpdateSpaceship.bind(this);
        this.state = {
            robots: [
                {
                    id: 1,
                    b2_h6_quantity: 2,
                    b5_h12_quantity: 2,
                    b10_h14_quantity: 2,
                    b12_h12_quantity: 3,
                    department_id: 3,
                    income: 100,
                },
                {
                    id: 2,
                    b2_h6_quantity: 2,
                    b5_h12_quantity: 2,
                    b10_h14_quantity: 4,
                    b12_h12_quantity: 3,
                    department_id: 3,
                    income: 100,
                },
                {
                    id: 3,
                    b2_h6_quantity: 2,
                    b5_h12_quantity: 0,
                    b10_h14_quantity: 2,
                    b12_h12_quantity: 0,
                    department_id: 3,
                    income: 100,
                },
            ],
            modals: {
                b2_h6_quantity: false,
                b5_h12_quantity: false,
                b10_h14_quantity: false,
                b12_h12_quantity: false
            },
            activeSpaceshipId: null,
            borType:null,
        };
    }
    handleUpdateSpaceship(id, modal) {
        this.setState({
            activeSpaceshipId: id,
            borType:modal,
            modals: { ...this.state.modals, [modal]: true }
        })
    }

    handleClose(modal) {
        this.setState({
            modals: { ...this.state.modals, [modal]: false }
        });
    }


    render() {
        return (
            <div className="col-md-12">
                <RecycleBorComponent id={this.state.activeSpaceshipId} borType={this.state.borType} handleClose={() => this.handleClose(this.state.borType)} isActive={this.state.modals[this.state.borType]} />
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "b2_h6_quantity", "", "b5_h12_quantity", "", "b10_h14_quantity", "", "b12_h12_quantity", "", "department_id", "income"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.robots.map(
                                ({ id, b2_h6_quantity, b5_h12_quantity, b10_h14_quantity, b12_h12_quantity, department_id, income }) => (
                                    <tr>
                                        <th scope="row">{id}

                                        </th>
                                        <td>{b2_h6_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, "b2_h6_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        <td>{b5_h12_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, "b5_h12_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        <td>{b10_h14_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, "b10_h14_quantity")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>
                                        <td>{b12_h12_quantity}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateSpaceship(id, "b12_h12_quantity")}>
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