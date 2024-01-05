import { SimulateContractParameters, formatEther, parseEther } from "viem";

export function calculateMintFeeAmount(platform: string, network: string, params: SimulateContractParameters | undefined): bigint | null {
    let amountInWeiToPay
    if (platform === "Zora" && network === "goerli") {
        if (params && params.value) {
            let add = params.value - removeSomeWeirdLeftoverDecimalFromZoraSDK()
            let result = (getZoraFee() + add).toString()
            amountInWeiToPay = BigInt(result);
        } else {
            //TODO: throw error, could not find price
            return null
        }
    }
    else {
        amountInWeiToPay = BigInt(parseEther("0.0005").toString());
    }
    return amountInWeiToPay
}

export function removeSomeWeirdLeftoverDecimalFromZoraSDK() {
    return parseEther("0.00000000000001")


}

export function getZoraFee() {
    return parseEther("0.000777")
    //return BigInt(parseEther("0.000777").toString());
}

