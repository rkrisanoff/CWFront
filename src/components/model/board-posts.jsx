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
import ExtractBorumComponent from "./robots/extract-borum";
import RepairRobotComponent from "./robots/repair-robot";
import userService from "../../services/user.service";
import CreateRobotComponent from "./robots/create-robot";
import ExploreAsteroidComponent from "./robots/explore-asteroid";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class BoardRobot extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdatePost = this.handleUpdateRobot.bind(this);
        this.handleCreatePost = this.handleCreateRobot.bind(this);

        this.state = {
            posts: [
            ],
            modals: {
                delete: false,
                create:false,
            },
            actualPostId: null
        };
        this.currentUser = AuthService.getCurrentUser();

    }
    handleUpdatePost(id, modal) {
        this.setState({
            actualPostId: id,
            modals: { ...this.state.modals, [modal]: true }
        })
    }

    handleCreatePost() {
        this.setState({
            modals: { ...this.state.modals, create: true }
        })
    }

    handleClose(modal) {
        this.setState({
            modals: { ...this.state.modals, [modal]: false }
        });
    }
    componentDidMount() {
        userService.get("posts/all")
            .then(
                ({ data }) => {
                    this.setState({
                        posts: data.slice(0, 50)
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
                {/* <MoveRobotComponent id={this.state.actualPostId} handleClose={() => this.handleClose("move")} isActive={this.state.modals.move} /> */}
                {/* <UpgradeBodyComponent id={this.state.actualPostId} handleClose={() => this.handleClose("upgradeBody")} isActive={this.state.modals.upgradeBody} /> */}
                {/* <UpgradeBrainComponent id={this.state.actualPostId} handleClose={() => this.handleClose("upgradeBrain")} isActive={this.state.modals.upgradeBrain} /> */}
                {/* <UpgradeEyesComponent id={this.state.actualPostId} handleClose={() => this.handleClose("upgradeEye")} isActive={this.state.modals.upgradeEye} /> */}
                {/* <DestroyPostComponent id={this.state.actualPostId} handleClose={() => this.handleClose("destroy")} isActive={this.state.modals.destroy} /> */}
                {/* <ExtractBorumComponent id={this.state.actualPostId} handleClose={() => this.handleClose("extract")} isActive={this.state.modals.extract} /> */}
                {/* <RepairRobotComponent id={this.state.actualPostId} handleClose={() => this.handleClose("repair")} isActive={this.state.modals.repair} /> */}
                {/* <CreatePostComponent operator_post_id={this.currentUser.id} handleClose={() => this.handleClose("create")} isActive={this.state.modals.create} /> */}

                <h1> Posts </h1>
                <button type="button" class="btn btn-outline-primary" onClick={() => this.handleCreatePost()}>
                    <i class="bi bi-robot"></i>
                </button>

                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">department_id</th>
                                <th scope="col">employee_id</th>
                                <th scope="col">role_id</th>
                                <th scope="col">premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.robots.map(
                                ({ id,
                                    department_id,
                                    employee_id,
                                    role_id,
                                    premium,}) => (
                                    <tr>
                                        <th scope="row">{id}

                                        </th>
                                        <td>{department_id}</td>
                                        <td>{employee_id}</td>

                                        <td>{role_id}</td>

                                        <td>{premium}</td>

                                        <td>

                                            <button type="button" class="btn btn-outline-danger btn-sm" onClick={() => this.handleUpdatePost(id, "create")}>
                                                <i class="bi bi-x-octagon">
                                                </i>
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
export default withRouter(BoardRobot);