const routes = require("next-routes")();

routes
  .add("/prescriptions/new", "/prescriptions/new")
  .add("/prescriptions/:address", "/prescriptions/show");
// .add('/campaigns/:address/add', '/campaigns/requests/index')
// .add('/campaigns/:address/requests/new', '/campaigns/requests/new')

module.exports = routes;
