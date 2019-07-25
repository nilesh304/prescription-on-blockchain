const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/FactoryPrescription.json");
const compiledPrescription = require("../ethereum/build/CreatePrescriptionContract.json");

let accounts;
let factory;
let prescriptionAddress;
let prescription;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: 1000000 });

  await factory.methods
    .CreatePrescription("0x7a21afba803cddfcace7502b8b0d1574cac4ba6d")
    .send({
      from: accounts[0],
      gas: "1000000"
    });

  [
    prescriptionAddress
  ] = await factory.methods.getDeployedPrescription().call();

  prescription = await new web3.eth.Contract(
    JSON.parse(compiledPrescription.interface),
    prescriptionAddress
  );
});
describe("Prescription", () => {
  it("deploys a Factory and Prescription", () => {
    assert.ok(factory.options.address);
    assert.ok(prescription.options.address);
  });
});
