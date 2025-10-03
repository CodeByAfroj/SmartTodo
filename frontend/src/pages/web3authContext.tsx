import { type Web3AuthContextConfig } from "@web3auth/modal/react";
import { WEB3AUTH_NETWORK, type Web3AuthOptions } from "@web3auth/modal";
const clientId = "BNyzLV_B3Ah0m6DAljhAuNAcVzrg26hi2wsyS1oGu1-tc6ZRT4OzyB9b_P16jcullXXTHorbVbwFfi3P5D1v3GM";
const web3AuthOptions: Web3AuthOptions = {
  clientId: clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET, // or WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
};

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
};

export default web3AuthContextConfig;