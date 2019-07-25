import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes.js";

export default props => {
  return (
    <Menu style={{ marginTop: 10 }}>
      <Link route="/">
        <a className="item">Prescription on Blockchain</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Prescription List</a>
        </Link>
        <Link route="/prescriptions/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
