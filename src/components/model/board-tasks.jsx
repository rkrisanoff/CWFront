import React, { Component } from "react";

import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import AcceptTaskComponent from "./tasks/accept-task";
import userService from "../../services/user.service";
import CreateTaskComponent from "./tasks/create-task";
import CompleteTask from "./tasks/complete-task";

class BoardTasks extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.currentUser = AuthService.getCurrentUser();

        this.state = {
            tasks: [],
            modals: {
                accept: false,
                create: false,
                complete: false
            },
            actualTaskId: null
        };
        console.log(this.currentUser);
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

    componentDidMount() {
        userService.get("tasks/all")
            .then(
                ({ data }) => {
                    this.setState({
                        tasks: data
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


    };
    
    render() {
        return (
            <div className="col-md-12">
                <AcceptTaskComponent executorPostId={this.currentUser.post_id} id={this.state.actualTaskId} handleClose={() => this.handleClose("accept")} isActive={this.state.modals.accept} />
                <CompleteTask executorPostId={this.currentUser.post_id} id={this.state.actualTaskId} handleClose={() => this.handleClose("complete")} isActive={this.state.modals.complete} />
                <h1> Tasks </h1>
                {this.currentUser.roles.includes("manager") && <>
                    <CreateTaskComponent creatorPostId={this.currentUser.post_id} handleClose={() => this.handleClose("create")} isActive={this.state.modals.create} />
                    <button type="button" class="btn btn-outline-primary" onClick={() => this.handleCreateTask()}>
                        <i class="bi bi-journal-plus"></i>
                    </button></>
                }

                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">cost</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col">description</th>
                                <th scope="col">state</th>
                                <th scope="col">creator_id</th>
                                <th scope="col">executor_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map(
                                ({ id, description, cost, state, executorPostId, creatorPostId }) => (
                                    <tr>
                                        <th scope="row" key={id}>{id} </th>

                                        <td>{cost}</td>
                                        <td>
                                            {!executorPostId && <button type="button" class="btn btn-outline-success btn-sm" onClick={() => this.handleUpdateTask(id, "accept")}>
                                                <i class="bi bi-journal-arrow-up"></i>
                                            </button>}
                                        </td>
                                        <td>
                                            {executorPostId === this.currentUser.post_id && <button type="button" class="btn btn-outline-success btn-sm" onClick={() => this.handleUpdateTask(id, "complete")}>
                                                <i class="bi bi-infinity"></i>
                                            </button>}

                                        </td>
                                        <td>{state}</td>
                                        <td>{description}</td>
                                        <td>{creatorPostId}</td>
                                        <td>{executorPostId}</td>
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