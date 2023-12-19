import { fetchEnsName } from '@wagmi/core'

export async function fetchEns(address: `0x${string}`) {
    const ensName = await fetchEnsName({
        address,
    })
    return ensName
}