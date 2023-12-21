import { generateSalt } from "@/utils/salt";
import { BigNumberish, ethers } from "ethers";
import * as MyCollectives from "@koderholic/my-collectives";
import { Config } from "@koderholic/my-collectives";
import ApiService from "./ApiService";

const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        MyCollectives.setConfig({} as Config);

        const salt = generateSalt();

        console.log(MyCollectives.HoneyPot, 'HONEYPOT VALUE')
        const response = await MyCollectives.Collective.create(
            this.getProvider(),
            { tokenContracts, honeyPots: tokenContracts }, //TODO: for now just use random honeypots address, can be changed later when MINT is implemented
            salt
        );
        //TODO: store salt, nonce, cAddress, cWallet in db 
        console.log("!!!!! response => ", response);

        return { salt, ...response }
    },
    getProvider: function () {
        return new ethers.providers.Web3Provider((window as any).ethereum)
    },

    joinCollective: async function (inviteCode: string, cAddress: string, cWallet: string, nonceKey: bigint) {
        MyCollectives.setConfig({} as Config)
        const provider = this.getProvider()
        const inviteCodeBytes = this.stringToBytes16(inviteCode)
        const generatedId = ethers.utils.randomBytes(16);
        console.log(generatedId, typeof generatedId, 'GENERATED')
        console.log(inviteCodeBytes, typeof inviteCodeBytes, "NON-GENERATED")
        console.log(MyCollectives, 'my collectives')


        // Hash the inviteId
        let messageHash = ethers.utils.solidityKeccak256(
            ["bytes16"],
            [inviteCodeBytes]
        );
        // Sign the inviteID hash to get the inviteSig from the initiator
        let messageHashBinary = ethers.utils.arrayify(messageHash);
        let inviteSig = await provider.getSigner().signMessage(messageHashBinary);
        console.log("inviteSig >> ", inviteSig)
        alert(inviteSig)
        const response = await MyCollectives.Collective.join(provider, { address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteCodeBytes })
        console.log("!!!!! response frontend contract service => ", response)
    },

    stringToBytes16(_string: string): Uint8Array {
        const bytes32 = ethers.utils.formatBytes32String(_string);
        const bytes16 = ethers.utils.arrayify(bytes32).slice(0, 16);
        return bytes16;
    },

    async createHoneyPot(tokenContract: string) {
        MyCollectives.setConfig({} as Config)
        const salt = generateSalt();
        const response = await MyCollectives.HoneyPot.get(this.getProvider(), salt, tokenContract)
        console.log("!!!!! response honey pot address => ", response)
        return response
    }


};

export default ContractService;
