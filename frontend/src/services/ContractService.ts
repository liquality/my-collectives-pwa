import { generateSalt } from "@/utils/salt";
import { ethers, utils } from "ethers";
import * as MyCollectives from "@liquality/my-collectives-sdk";
import { Config } from "@liquality/my-collectives-sdk";
import ApiService from "./ApiService";
import { zeroAddress } from "viem";

const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        this.initSDKConfig()
        const salt = generateSalt();

        const response = await MyCollectives.Collective.create(
            this.getProvider(),
            { tokenContracts, honeyPots: honeyPots },
            salt
        );


        console.log("!!!!! response create collective => ", response);
        return { salt, ...response }
    },

    joinCollective: async function (inviteId: string, cAddress: string, cWallet: string, nonceKey: bigint, inviteSig: string) {
        this.initSDKConfig()
        const provider = this.getProvider()
        const inviteIdAsUint8Array = utils.arrayify(inviteId);
        const isMemberResponse = await MyCollectives.Collective.isMember(provider, { address: cAddress, wallet: cWallet, nonceKey }, await provider.getSigner().getAddress())
        if (isMemberResponse.isMember) {
            return
        } else {
            console.log({ address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteIdAsUint8Array }, 'PARAMS FOR Collective.Join()')
            const response = await MyCollectives.Collective.join(provider, { address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteIdAsUint8Array })
            console.log("!!!!! response frontend contract service => ", response)
        }
    },

    async createInviteSig(inviteCode: string) {
        //const inviteId = ethers.utils.randomBytes(16);
        const inviteCodeBytes = this.stringToBytes16(inviteCode)
        console.log("inviteId array tostring >> ", Array.from(inviteCodeBytes).toString());
        // Hash the inviteId
        let messageHash = ethers.utils.solidityKeccak256(
            ["bytes16"],
            [inviteCodeBytes]
        );
        // Sign the inviteID hash to get the inviteSig from the initiator
        let messageHashBinary = ethers.utils.arrayify(messageHash);
        let inviteSig = await this.getProvider().getSigner().signMessage(messageHashBinary); //TODO: the person INVITING should generate and sign this before getting the copyclip invite
        console.log("inviteSig >> ", inviteSig, inviteCodeBytes)
        const inviteIdInHex = ethers.utils.hexlify(inviteCodeBytes).toString()

        return { inviteSig: inviteSig.toString(), inviteId: inviteIdInHex }
    },

    async withdrawRewards(cAddress: string, cWallet: string, nonceKey: bigint, honeyPotAddresses: string[]) {

        const poolAddresses = await Promise.all(honeyPotAddresses.map(async (item: any) => {
            return await this.getPoolAddress(cAddress, cWallet, nonceKey, item);
        }));
        console.log(poolAddresses, 'all of the pooladdresses')

        const response = await MyCollectives.Pool.withdrawRewards(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, poolAddresses, await this.getProvider().getSigner().getAddress())
        console.log("!!!!! response withdrawal => ", response)
        return response
    },



    async createHoneyPot() {
        this.initSDKConfig()
        const salt = generateSalt();
        const createResponse = await MyCollectives.HoneyPot.create(this.getProvider(), salt)
        const response = await MyCollectives.HoneyPot.get(this.getProvider(), salt)
        console.log("!!!!! response honey pot address => ", response)
        return response
    },

    async createPools(
        cAddress: string,
        cWallet: string,
        nonceKey: bigint,
        tokenContracts: string[],
        honeyPots: string[]
    ) {
        this.initSDKConfig()
        console.log(this.getProvider(),
            { address: cAddress, wallet: cWallet, nonceKey },
            { tokenContracts, honeyPots }, 'wwwwwaaa')
        const response = await MyCollectives.Collective.createPools(
            this.getProvider(),
            { address: cAddress, wallet: cWallet, nonceKey },
            { tokenContracts, honeyPots }
        );
        console.log("!!!!! response => createPools for each ", response);
        return response;
    },

    async poolMint(cAddress: string, cWallet: string, nonceKey: bigint, amount: bigint, tokenContract: string, poolHoneyPotAddress: string, quantity: number, tokenId: string | null, platform: MyCollectives.SupportedPlatforms, groupId: string, groupMintCount: number) {
        this.initSDKConfig()
        try {
            const poolAddress = await this.getPoolAddress(cAddress, cWallet, nonceKey, poolHoneyPotAddress)
            console.log(poolAddress, 'pooladdress & tokencontract', tokenContract)
            if (poolAddress === zeroAddress) throw Error("Pool address does not exist");
            const generatedTokenId = Math.floor(Math.random() * (150 - 30 + 1)) + 30;
            console.log('TokenId', tokenId ? Number(tokenId) : generatedTokenId,)

            console.log('All of the PARAMS: Pool.mint()', { address: cAddress, wallet: cWallet, nonceKey }, {
                recipient: await this.getProvider().getSigner().getAddress(),
                tokenID: tokenId ? Number(tokenId) : generatedTokenId,
                amount,
                quantity,
                platform: platform === "Other" as MyCollectives.SupportedPlatforms ? MyCollectives.SupportedPlatforms.LOCAL : platform,
                tokenContract,
                poolAddress: poolAddress

            })
            const response = await MyCollectives.Pool.mint(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, {
                recipient: await this.getProvider().getSigner().getAddress(),
                tokenID: tokenId ? Number(tokenId) : generatedTokenId,
                amount,// amount, //amount in WEI bigint
                quantity,
                platform: platform === "Other" as MyCollectives.SupportedPlatforms ? MyCollectives.SupportedPlatforms.LOCAL : platform,
                tokenContract,
                poolAddress: poolAddress

            })
            console.log("!!!!! response poolmint => ", response)
            if (response.status === "failed") throw Error("Failed transaction")
            //After a successfull mint, update the mintCount in the group to track rewards and leaderboard data
            const updatedGroup = await ApiService.updateGroup(groupId, {
                group: {
                    mintCount: groupMintCount + 1,
                },
                pools: [],
            });
            return response
        } catch (error) {
            console.log(error, 'error minting')
        }


    },

    async getPoolAddress(cAddress: string, cWallet: string, nonceKey: bigint, honeyPot: string) {
        this.initSDKConfig()
        const response = await MyCollectives.Collective.getPoolByHoneyPot(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, honeyPot)
        console.log("!!!!! response get pool by honeyPot => ", response)
        return response
    },

    async leaveCollective(cAddress: string, cWallet: string, nonceKey: bigint) {
        this.initSDKConfig()
        const response = await MyCollectives.Collective.leave(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey })
        console.log(response, 'response for leaving collective')
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

    initSDKConfig: function () {
        return MyCollectives.setConfig({
            RPC_URL: import.meta.env.VITE_RPC_URL,
            PIMLICO_API_KEY: import.meta.env.VITE_PIMLICO_API_KEY,
            BICONOMY_PAYMASTER: import.meta.env.VITE_BICONOMY_PAYMASTER,
            BICONOMY_BUNDLER_API_KEY: import.meta.env.VITE_BICONOMY_BUNDLER_API_KEY,
            AA_PROVIDER: MyCollectives.AAProviders.PIMLICO,
        } as Config)

    },

};

export default ContractService;
