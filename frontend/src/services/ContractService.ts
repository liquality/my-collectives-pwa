import { generateSalt } from "@/utils/salt";
import { BigNumberish, ethers } from "ethers";
import * as MyCollectives from "@koderholic/my-collectives";
import { Config } from "@koderholic/my-collectives";
import { parseEther } from "viem";

const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        MyCollectives.setConfig({} as Config);
        const salt = generateSalt();
        const response = await MyCollectives.Collective.create(
            this.getProvider(),
            { tokenContracts, honeyPots: honeyPots }, //TODO: for now just use random honeypots address, can be changed later when MINT is implemented
            salt
        );
        console.log("!!!!! response create collective => ", response);
        return { salt, ...response }
    },


    joinCollective: async function (inviteCode: string, cAddress: string, cWallet: string, nonceKey: bigint) {
        MyCollectives.setConfig({} as Config)
        const provider = this.getProvider()
        const inviteCodeBytes = this.stringToBytes16(inviteCode)
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



    async createHoneyPot() {
        MyCollectives.setConfig({} as Config)
        const salt = generateSalt();

        const response = await MyCollectives.HoneyPot.get(this.getProvider(), salt)
        console.log("!!!!! response honey pot address => ", response)
        return response
    },

    async createPools(cAddress: string, cWallet: string, nonceKey: bigint, tokenContracts: string[], honeyPots: string[]) {
        const response = await MyCollectives.Collective.createPools(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, { tokenContracts, honeyPots, })
        console.log("!!!!! response => createPools for each ", response)
    },

    async poolMint(cAddress: string, cWallet: string, nonceKey: bigint, amount: bigint, tokenContract: string, poolHoneyPotAddress: string, quantity: number, tokenId: string | null, platform: MyCollectives.SupportedPlatforms) {
        MyCollectives.setConfig({} as Config)
        console.log(cAddress, cWallet, nonceKey, poolHoneyPotAddress, 'ALL THE PARAMS FOR GETTING A POOL')
        const poolAddress = await this.getPool(cAddress, cWallet, nonceKey, poolHoneyPotAddress)


        console.log(poolAddress, 'pooladdress & tokencontract', tokenContract)
        const generatedTokenId = Math.floor(Math.random() * (150 - 30 + 1)) + 30;
        console.log('TokenId', tokenId ? Number(tokenId) : generatedTokenId,)

        console.log('All of the PARAMS: Pool.mint()', this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, {
            recipient: await this.getProvider().getSigner().getAddress(),
            tokenID: tokenId ? Number(tokenId) : generatedTokenId,
            amount,
            quantity,
            platform: MyCollectives.SupportedPlatforms.ZORA,
            tokenContract,
            poolAddress: poolAddress

        })
        const response = await MyCollectives.Pool.mint(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, {
            recipient: await this.getProvider().getSigner().getAddress(),
            tokenID: tokenId ? Number(tokenId) : generatedTokenId,
            amount, //amount in WEI bigint
            quantity,
            platform: MyCollectives.SupportedPlatforms.ZORA,
            tokenContract,
            poolAddress: poolAddress

        })
        console.log("!!!!! response poolmint => ", response)

        return response
    },

    async getPool(cAddress: string, cWallet: string, nonceKey: bigint, honeyPot: string) {
        MyCollectives.setConfig({} as Config)
        const response = await MyCollectives.Collective.getPoolByHoneyPot(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, honeyPot)
        console.log("!!!!! response get pool by honeyPot => ", response)
        return response
    },


    /*---------------------------------- HELPERS  ----------------------------------------*/
    stringToBytes16(_string: string): Uint8Array {
        const bytes32 = ethers.utils.formatBytes32String(_string);
        const bytes16 = ethers.utils.arrayify(bytes32).slice(0, 16);
        return bytes16;
    },
    getProvider: function () {
        return new ethers.providers.Web3Provider((window as any).ethereum)
    },


};

export default ContractService;
