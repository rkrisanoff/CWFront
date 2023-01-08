import React, { Component } from "react";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import AcceptTaskComponent from "./tasks/accept-task";
import userService from "../../services/user.service";
import CreateTaskComponent from "./tasks/create-task";

class BoardTasks extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);


        this.state = {
            tasks: [
                {
                    id: 1, description: 2, cost: 3, creator_id: 4
                },
                {
                    id: 2, description: 2, cost: 3, creator_id: 4
                },
                {
                    id: 3, description: "fuck you", cost: 3, creator_id: 4
                }
            ],
            modals: {
                accept: false,
                create: false
            },
            actualTaskId: null
        };
    }
    handleUpdateTask(id, modal) {
        this.setState({
            actualTaskId: id,
            modals: { ...this.state.modals, [modal]: true }
        })
    }

    handleCreateTask() {
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
        userService.get("tasks/all")
            .then(
                ({ data }) => {
                    this.setState({
                        tasks: data.slice(0, 50)
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
                <AcceptTaskComponent id={this.state.actualTaskId} handleClose={() => this.handleClose("accept")} isActive={this.state.modals.accept} />
                <CreateTaskComponent creator_id={this.state} handleClose={() => this.handleClose("create")} isActive={this.state.modals.create} />
                <h1> Tasks </h1>
                <button type="button" class="btn btn-outline-primary" onClick={() => this.handleCreateTask()}>
                    <i class="bi bi-journal-plus"></i>
                </button>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "cost", "", "description", "creator_id"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map(
                                ({ id, description, cost, creator_id }) => (
                                    <tr>
                                        <th scope="row">{id} </th>

                                        <td>{cost}</td>
                                        <td>
                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => this.handleUpdateTask(id, "accept")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>
                                        </td>

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

export default withRouter(BoardTasks);