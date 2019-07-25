import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes.js";

class NewPrescription extends Component {
  state = {
    patientAddress: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const accounts = await web3.eth.getAccounts();
    try {
      await factory.methods.CreatePrescription(this.state.patientAddress).send({
        from: accounts[0]
      });
    } catch (error) {
      this.setState({ errorMessage: error.messgae });
    }
    this.setState({ loading: false });
    console.log(this.state.loading);
    Router.pushRoute("/");
  };

  render() {
    return (
      <Layout>
        <h1>New Prescription</h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label> Patients Address </label>
            <input
              placeholder="Address"
              value={this.state.patientAddress}
              onChange={event =>
                this.setState({ patientAddress: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="Errors with deployment"
            content={this.state.errorMessage}
          />
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewPrescription;
