import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import { Link } from "../routes";
import Layout from "../components/Layout";

class PrescriptionIndex extends Component {
  static async getInitialProps() {
    const prescription = await factory.methods.getDeployedPrescription().call();

    return { prescription };
  }
  renderCampaigns() {
    const items = this.props.prescription.map(prescription => {
      return {
        header: prescription,
        description: (
          <Link route={`prescriptions/${prescription}`}>
            <a>view Prescription</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          {" "}
          <h3>Open Prescriptions</h3>
          <Link route="prescriptions/new">
            <a>
              <Button
                content="create Prescription"
                icon="add circle"
                primary
                floated="right"
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}
export default PrescriptionIndex;
