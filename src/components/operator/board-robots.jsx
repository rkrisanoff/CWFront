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

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class BoardRobotOperator extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateRobot = this.handleUpdateRobot.bind(this);
        this.state = {
            robots: [
                {
                    "id": 1,
                    "brain": 2,
                    "body": 2,
                    "eye": 3,
                    "hit_points": 4,
                    "asteroid": 5
                },
                {
                    "id": 4,
                    "brain": 2,
                    "body": 2,
                    "eye": 3,
                    "hit_points": 4,
                    "asteroid": 5
                },
                {
                    "id": 2,
                    "brain": 2,
                    "body": 2,
                    "eye": 3,
                    "hit_points": 4,
                    "asteroid": 5
                }
            ],
            modals: {
                move: false,
                repair: false,
                upgradeBrain: false,
                upgradeBody: false,
                upgradeEye: false,
                destroy: false,
                extract:false
            },
            actualRobotId: null
        };
    }
    handleUpdateRobot(id, modal) {
        this.setState({
            actualRobotId: id,
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
                <MoveRobotComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("move")} isActive={this.state.modals.move} />
                <UpgradeBodyComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("upgradeBody")} isActive={this.state.modals.upgradeBody} />
                <UpgradeBrainComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("upgradeBrain")} isActive={this.state.modals.upgradeBrain} />
                <UpgradeEyesComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("upgradeEye")} isActive={this.state.modals.upgradeEye} />
                <DestroyRobotComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("destroy")} isActive={this.state.modals.destroy} />
                <ExtractBorumComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("extract")} isActive={this.state.modals.extract} />
                <RepairRobotComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("repair")} isActive={this.state.modals.repair} />

                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "", "asteroid", "", "brain", "", "body", "", "eye", "", "hit_points", "", "", ""].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.robots.map(
                                ({ id, asteroid, brain, body, eye, hit_points }) => (
                                    <tr>
                                        <th scope="row">{id}

                                        </th>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "destroy")}>
                                                <i class="bi bi-x-octagon">
                                                </i>
                                            </button>
                                        </td>

                                        <td>{asteroid}

                                        </td>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "move")}>
                                                <i class="bi bi-arrows-move">

                                                </i>
                                            </button>
                                        </td>

                                        <td>{brain}

                                        </td>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "upgradeBrain")}>
                                                <i class="bi bi-android">

                                                </i>
                                            </button>
                                        </td>

                                        <td>{body}

                                        </td>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "upgradeBody")}>
                                                <i class="bi bi-android2">
                                                </i>
                                            </button>
                                        </td>

                                        <td>{eye}

                                        </td>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "upgradeEye")}>
                                                <i class="bi bi-eye">
                                                </i>
                                            </button>
                                        </td>

                                        <td>{hit_points}

                                        </td>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "repair")}>
                                                <i class="bi bi-wrench">
                                                </i>
                                            </button>
                                        </td>
                                        <td>

                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "extract")}>
                                                <i class="bi bi-minecart-loaded">
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
// export default BoardRobotOperator;
export default withRouter(BoardRobotOperator);