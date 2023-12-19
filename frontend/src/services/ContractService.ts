import { generateSalt } from "@/utils/salt";
import { ethers } from "ethers";
import * as MyCollectives from "@koderholic/my-collectives";
import { Config } from "@koderholic/my-collectives";
import ApiService from "./ApiService";

const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        MyCollectives.setConfig({} as Config);

        const salt = generateSalt();
        console.log('Arguments passed: -->>>>', this.getProvider(),
            { tokenContracts, honeyPots: tokenContracts },
            823472)
        const response = await MyCollectives.Collectives.create(
            this.getProvider(),
            { tokenContracts, honeyPots: tokenContracts }, //TODO: for now just use random honeypots address, can be changed later when MINT is implemented
            823472
        );
        //TODO: store salt, nonce, cAddress, cWallet in db 
        console.log("!!!!! response => ", response);

        return response
    },
    getProvider: function () {
        return new ethers.providers.Web3Provider((window as any).ethereum)
    },

    joinCollective: async function (inviteId: string, cAddress: string, cWallet: string, nonceKey: bigint) {
        MyCollectives.setConfig({} as Config)
        const provider = this.getProvider()
        const inviteIdBytes = this.stringToBytes32(inviteId)
        console.log("inviteId >> ", inviteId.toString())

        // Hash the inviteId
        let messageHash = ethers.utils.solidityKeccak256(
            ["bytes16"],
            [inviteId]
        );
        // Sign the inviteID hash to get the inviteSig from the initiator
        let messageHashBinary = ethers.utils.arrayify(messageHash);
        let inviteSig = await provider.getSigner().signMessage(messageHashBinary);
        console.log("inviteSig >> ", inviteSig)
        alert(inviteSig)
        const response = await MyCollectives.Collectives.join(provider, { address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteId })
        console.log("!!!!! response => ", response)
    },

    stringToBytes32(_string: string) {
        let result = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(_string));
        while (result.length < 66) {
            result += "0";
        }
        if (result.length !== 66) {
            throw new Error("invalid web3 implicit bytes32");
        }
        return result;
    }


};

export default ContractService;
