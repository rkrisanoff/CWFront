import React, { Component } from "react";
import Form from "react-validation/build/form";


import AuthService from "../../services/auth.service";

import { withRouter } from '../../common/with-router';
import userService from "../../services/user.service";

class BoardMicroreactor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            microreactors: [],
        };
    }
    componentDidMount() {
        userService.get("microreactors/all")
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
    }
    render() {
        return (
            <div className="col-md-12">
                <div>
                <h1> Microreactors </h1>

                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "name", "b2_h6_consumption_rate",
                                    "b5_h12_consumption_rate", "b10_h14_consumption_rate",
                                    "b12_h12_consumption_rate"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.microreactors.sort((a,b)=>a.id - b.id).map(
                                ({ id, name, cost, b2_h6_consumption_rate, b5_h12_consumption_rate, b10_h14_consumption_rate, b12_h12_consumption_rate }) => (

                                    <tr>
                                        <th scope="row" key={id}>{id} </th>
                                        <td>{name}</td>
                                        {/* <td>{cost}</td> */}
                                        <td>{b2_h6_consumption_rate}</td>
                                        <td>{b5_h12_consumption_rate}</td>
                                        <td>{b10_h14_consumption_rate}</td>
                                        <td>{b12_h12_consumption_rate}</td>
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
export default withRouter(BoardMicroreactor);