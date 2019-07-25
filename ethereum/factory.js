import web3 from "./web3";
import prescriptionFactory from "./build/FactoryPrescription.json";

const instance = new web3.eth.Contract(
  JSON.parse(prescriptionFactory.interface),
  "0xdeCb2B39D9dD90593D47376B314189620b631EfB"
);

export default instance;
