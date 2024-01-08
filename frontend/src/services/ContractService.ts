import { generateSalt } from "@/utils/salt";
import { BigNumberish, ethers } from "ethers";
import * as MyCollectives from "@liquality/my-collectives";
import { Config } from "@liquality/my-collectives";
import { parseEther } from "viem";
import ApiService from "./ApiService";

const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        this.initSDKConfig()
        const salt = generateSalt();
        console.log('mycollectives params:',
            { tokenContracts, honeyPots: honeyPots },
            salt, 'PROVIDEEER:', this.getProvider())
        const response = await MyCollectives.Collective.create(
            this.getProvider(),
            { tokenContracts, honeyPots: honeyPots },
            salt
        );
        console.log("!!!!! response create collective => ", response);
        return { salt, ...response }
    },



    joinCollective: async function (inviteCode: string, cAddress: string, cWallet: string, nonceKey: bigint) {
        this.initSDKConfig()

        const provider = this.getProvider()
        /* 
                const isMemberResponse = await MyCollectives.Collective.isMember(provider, { address: cAddress, wallet: cWallet, nonceKey }, await provider.getSigner().getAddress())
                console.log("!!!!! response => IS MEMBER ", isMemberResponse.isMember)
                if (isMemberResponse.isMember) {
                    return
                } else {
                    // const inviteCodeBytes = this.stringToBytes16(inviteCode)
                    const inviteCodeBytes = ethers.utils.randomBytes(16);
        
                    // Hash the inviteId
                    let messageHash = ethers.utils.solidityKeccak256(
                        ["bytes16"],
                        [inviteCodeBytes]
                    );
                    // Sign the inviteID hash to get the inviteSig from the initiator
                    let messageHashBinary = ethers.utils.arrayify(messageHash);
                    let inviteSig = await provider.getSigner().signMessage(messageHashBinary);
                    console.log("inviteSig >> ", inviteSig)
        
                    console.log({ address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteCodeBytes }, 'PARAMS FOR Collective.Join()')
                    const response = await MyCollectives.Collective.join(provider, { address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteCodeBytes })
                    console.log("!!!!! response frontend contract service => ", response)
                } */

        const inviteId = ethers.utils.randomBytes(16);
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
        console.log({ address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteId }, 'PARAMS FOR Collective.Join()')

        const response = await MyCollectives.Collective.join(provider, { address: cAddress, wallet: cWallet, nonceKey }, { inviteSignature: inviteSig, inviteCode: inviteId })
        console.log("!!!!! response => ", response)



    },



    async createHoneyPot() {
        this.initSDKConfig()
        const salt = generateSalt();

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

        const poolAddress = await this.getPool(cAddress, cWallet, nonceKey, poolHoneyPotAddress)
        console.log(poolAddress, 'pooladdress & tokencontract', tokenContract)
        const generatedTokenId = Math.floor(Math.random() * (150 - 30 + 1)) + 30;
        console.log('TokenId', tokenId ? Number(tokenId) : generatedTokenId,)

        console.log('All of the PARAMS: Pool.mint()', { address: cAddress, wallet: cWallet, nonceKey }, {
            recipient: await this.getProvider().getSigner().getAddress(),
            tokenID: tokenId ? Number(tokenId) : generatedTokenId,
            amount,
            quantity,
            platform,
            tokenContract,
            poolAddress: poolAddress

        })
        const response = await MyCollectives.Pool.mint(this.getProvider(), { address: cAddress, wallet: cWallet, nonceKey }, {
            recipient: await this.getProvider().getSigner().getAddress(),
            tokenID: tokenId ? Number(tokenId) : generatedTokenId,
            amount,// amount, //amount in WEI bigint
            quantity,
            platform,
            tokenContract,
            poolAddress: poolAddress

        })
        console.log("!!!!! response poolmint => ", response)
        //After a successfull mint, update the mintCount in the group to track rewards and leaderboard data
        const updatedGroup = await ApiService.updateGroup(groupId, {
            group: {
                mintCount: groupMintCount + 1,
            },
            pools: [],
        });


        return response
    },

    async getPool(cAddress: string, cWallet: string, nonceKey: bigint, honeyPot: string) {
        this.initSDKConfig()
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

    initSDKConfig: function () {
        return MyCollectives.setConfig({
            RPC_URL: import.meta.env.VITE_RPC_URL,
            PIMLICO_API_KEY: import.meta.env.VITE_PIMLICO_API_KEY,
            BICONOMY_PAYMASTER: import.meta.env.VITE_BICONOMY_PAYMASTER,
            BICONOMY_BUNDLER_API_KEY: import.meta.env.VITE_BICONOMY_BUNDLER_API_KEY,
        } as Config)

    },


};

export default ContractService;
