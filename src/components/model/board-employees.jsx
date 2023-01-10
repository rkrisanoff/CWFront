import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MoveRobotComponent from "./robots/move-robot";
import UpgradeBodyComponent from "./robots/upgrade-body";
import UpgradeBrainComponent from "./robots/upgrade-brain";
import UpgradeEyesComponent from "./robots/upgrade-eyes";
import DestroyRobotComponent from "./robots/destroy-robot";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";
import UpdateEmployee from "./employees/update-employee";
import DeleteEmployee from "./employees/delete-employee";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class BoardEmployee extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateEmployee = this.handleUpdateEmployee.bind(this);

        this.state = {
            employees: [
            ],
            modals: {
                delete: false,
                update: false,
            },
            employee: {
            }
        };
        this.currentUser = AuthService.getCurrentUser();

    }
    handleUpdateEmployee(employee, modal) {
        this.setState({
            employee: { ...employee },
            modals: { ...this.state.modals, [modal]: true }
        })
    }

    handleClose(modal) {
        this.setState({
            modals: { ...this.state.modals, [modal]: false }
        });
    }
    componentDidMount() {
        userService.get("employees/all")
            .then(
                ({ data }) => {
                    this.setState({
                        employees: data.slice(0, 50)
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
                <UpdateEmployee employee={this.state.employee} handleClose={() => this.handleClose("update")} isActive={this.state.modals.update} />
                <DeleteEmployee employee={this.state.employee} handleClose={() => this.handleClose("delete")} isActive={this.state.modals.delete} />
                <h1> Employee </h1>

                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col">username</th>
                                <th scope="col">first_name</th>
                                <th scope="col">last_name</th>
                                <th scope="col">patronymic</th>
                                <th scope="col">gender</th>
                                <th scope="col">age</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(
                                ({ id,
                                    username,
                                    first_name,
                                    last_name,
                                    patronymic,
                                    gender, age }) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <td>
                                            <button type="button" class="btn btn-outline-danger btn-sm" onClick={() => this.handleUpdateEmployee({ id }, "delete")}>
                                                <i class="bi bi-x-octagon">
                                                </i>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                class="btn btn-outline-primary btn-sm"
                                                onClick={() => this.handleUpdateEmployee({
                                                    id,
                                                    username,
                                                    first_name,
                                                    last_name,
                                                    patronymic,
                                                    gender, age
                                                }, "update")}>
                                                <i class="bi bi-arrow-up-circle"></i>
                                            </button>
                                        </td>
                                        <td>{username}</td>
                                        <td>{first_name}</td>
                                        <td>{last_name}</td>
                                        <td>{patronymic}</td>
                                        <td>{gender}</td>
                                        <td>{age}</td>
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
export default withRouter(BoardEmployee);