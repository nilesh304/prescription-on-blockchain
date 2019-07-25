import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Card, Grid, Button, Label, Table } from "semantic-ui-react";
import { Link } from "../../routes";
import web3 from "../../ethereum/web3";
import Prescription from "../../ethereum/prescription";

class PrescriptionShow extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const prescription = Prescription(address);

    // const count = await prescription.methods.getMedCount().call();
    // console.log(count);

    const requests = await Promise.all(
      Array(parseInt(2))
        .fill()
        .map((element, index) => {
          return prescription.methods.returnMedDetails(index).call();
        })
    );
    console.log(requests);

    return { requests };
  }

  render() {
    const { address } = this.props;
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Medicine</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{this.props.requests[0][0]}</Table.Cell>
              <Table.Cell> {this.props.requests[0][1]}</Table.Cell>
              <Table.Cell> {this.props.requests[0][2]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.props.requests[1][0]}</Table.Cell>
              <Table.Cell> {this.props.requests[1][1]}</Table.Cell>
              <Table.Cell> {this.props.requests[1][2]}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Layout>
    );
  }
}

export default PrescriptionShow;
