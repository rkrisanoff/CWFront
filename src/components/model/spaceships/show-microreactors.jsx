import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import userService from "../../../services/user.service";

import { withRouter } from '../../../common/with-router';


class ShowMicroreactorsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            microreactors: [],
            message: ""
        };
    }


    componentDidMount() {
        this.props.id && userService.get(`spaceships/${this.props.id}/microreactors`)
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

            <Modal show={this.props.isActive} onHide={this.props.handleClose} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Microreactors in spacehip {this.props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">cost</th>
                                <th scope="col">b2_h6</th>
                                <th scope="col">b5_h12</th>
                                <th scope="col">b10_h14</th>
                                <th scope="col">b12_h12</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.microreactors.sort((a,b)=>a.id - b.id).map(
                                ({ id, name, b2_h6_consumption_rate, b5_h12_consumprion_rate, b10_h14_consumption_rate, b12_h12_consumption_rate, cost }) => (
                                    <tr>
                                        <th scope="row">{id}</th>
                                        <td>{name}</td>
                                        <td>{cost}</td>
                                        <td>{b2_h6_consumption_rate}</td>
                                        <td>{b5_h12_consumprion_rate}</td>
                                        <td>{b10_h14_consumption_rate}</td>
                                        <td>{b12_h12_consumption_rate}</td>
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
export default withRouter(ShowMicroreactorsComponent);