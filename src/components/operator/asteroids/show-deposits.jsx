import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import userService from "../../../services/user.service";

import { withRouter } from '../../../common/with-router';


class ShowDepositsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deposits: [],
            // loading: false,
            message: ""
        };
    }


    componentDidMount() {
        userService.get(`asteroid/${this.props.id}/deposits`)
            .then(
                ({ data }) => {
                    this.setState({
                        deposits: data.slice(0, 50)
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

            <Modal show={this.props.isActive} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposits in asteroid {this.props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                {["id", "bor_quantity"].map(value => <th scope="col">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.deposits.map(
                                ({ id, bor_quantity }) => (
                                    <tr>
                                        <th scope="row">{id}
                                        </th>
                                        <td>{bor_quantity}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default withRouter(ShowDepositsComponent);