import { generateSalt } from "@/utils/salt";
import { ethers } from "ethers";
import * as MyCollectives from "@koderholic/my-collectives";
import { Config } from "@koderholic/my-collectives";

const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        MyCollectives.setConfig({} as Config);

        const salt = generateSalt();
        console.log('Arguments passed: -->>>>', this.getProvider(),
            { tokenContracts, honeyPots: tokenContracts },
            salt)
        const response = await MyCollectives.Collectives.create(
            this.getProvider(),
            { tokenContracts, honeyPots: tokenContracts }, //TODO: for now just use random honeypots address, can be changed later when MINT is implemented
            823472
        );
        //TODO: store salt in db 
        console.log("!!!!! response => ", response);

        return response
    },
    getProvider: function () {
        return new ethers.providers.Web3Provider((window as any).ethereum)
    },

};

export default ContractService;
