import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";

class BoardDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
        };
    }
    componentDidMount() {
        userService.get("departments/all")
            .then(
                ({ data }) => {
                    this.setState({
                        departments: data
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
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">extracted_bor_quantity</th>
                                <th scope="col"> current_resource</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.departments.map(
                                ({ id, extracted_bor_quantity, current_resource }) => (
                                    <tr>
                                        <th scope="row" key={id}>{id} </th>
                                        <td>{extracted_bor_quantity}</td>
                                        <td>{current_resource}</td>
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
export default withRouter(BoardDepartment);