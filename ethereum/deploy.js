const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/FactoryPrescription");

const mnu =
  "inquiry hand genre grief swap chuckle slush rural access toss tube winter";
const network = "https://rinkeby.infura.io/v3/eff21bcac0bd4d32aec797b10dda2e2d";

const provider = new HDWalletProvider(mnu, network);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });

  console.log("Contract deployed to", result.options.address);
};
deploy();
