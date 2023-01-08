import React, { Component } from "react";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import AcceptTaskComponent from "./tasks/accept-task";


class BoardTask extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateRobot = this.handleUpdateRobot.bind(this);
        this.state = {
            robots: [
                {
                    id:1, description:2, cost:3, creator_id:4
                },
                {
                    id:2, description:2, cost:3, creator_id:4
                },
                {
                    id:3, description:"fuck you", cost:3, creator_id:4
                }
            ],
            modals: {
                acceptTask: false,
            },
            actualTaskId: null
        };
    }
    handleUpdateRobot(id, modal) {
        this.setState({
            actualTaskId: id,
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
                <AcceptTaskComponent id={this.state.actualRobotId} handleClose={() => this.handleClose("acceptTask")} isActive={this.state.modals.acceptTask} />
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "cost", "", "description", "creator_id"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.robots.map(
                                ({ id, description, cost, creator_id }) => (
                                    <tr>
                                        <th scope="row">{id}

                                        </th>

                                        <td>{cost}

                                        </td>
                                        <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateRobot(id, "acceptTask")}>
                                        <i class="bi bi-journal-arrow-up"></i>
                                        </button>
                                        <td>{description}</td>
                                        <td>{creator_id}</td>

                                        
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

export default withRouter(BoardTask);