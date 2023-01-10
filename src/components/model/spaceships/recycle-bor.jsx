import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { withRouter } from '../../../common/with-router';

import userService from "../../../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class RecycleBorComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeBorCount = this.onChangeBorCount.bind(this);
    this.state = {
      borType: props.borType,
      borCount:0,
      loading: false,
      message: ""
    };
  }

  onChangeBorCount(e) {
    this.setState({
        borCount: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        userService.post(`spaceships/${this.props.id}/update`,
        {
          [this.props.borType]:this.state.borCount+this.props.borCount,
        })
        .then(
          () => {
            this.props.handleClose()
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      } else {
        this.setState({
          loading: false
        });
      }
  }

  render() {
    return (

      <Modal show={this.props.isActive} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recycle Bor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={this.props.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            Choose number of bor you want to recycle
            <br/>
            Specify number of bor
            <div className="form-group">
              <label htmlFor="asteroid">number of bor</label>
              <Input
                type="text"
                className="form-control"
                name={"borCount"}
                value={this.state.borCount}
                onChange={this.onChangeBorCount}
                validations={[required]}
              />
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.loading}>
            Recycle
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default withRouter(RecycleBorComponent);