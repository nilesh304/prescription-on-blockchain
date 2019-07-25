import web3 from "./web3";
import Prescription from "./build/CreatePrescriptionContract";

export default address => {
  return new web3.eth.Contract(JSON.parse(Prescription.interface), address);
};
