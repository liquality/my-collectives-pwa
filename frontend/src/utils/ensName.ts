import { fetchEnsName } from '@wagmi/core'

export async function fetchEns(address: `0x${string}`, chainId: number) {
    const ensName = await fetchEnsName({
        address, chainId
    })
    return ensName
}