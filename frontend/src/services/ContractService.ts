import { Message, Group, GroupCreation } from "@/types/general-types";
import { generateSalt } from "@/utils/salt";
import { ethers } from "ethers";
import * as MyCollectives from "@koderholic/my-collectives";

import { Config } from "@koderholic/my-collectives";
//@ts-ignore
const ContractService = {
    createCollective: async function (tokenContracts: string[], honeyPots: string[]) {
        MyCollectives.setConfig({} as Config);

        const salt = generateSalt();
        const response = await MyCollectives.Collectives.create(
            this.getProvider(),
            { tokenContracts, honeyPots },
            salt
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
