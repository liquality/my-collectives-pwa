export const ZORA_REWARDS_ABI = [{ "inputs": [], "stateMutability": "payable", "type": "constructor" }, { "inputs": [], "name": "ADDRESS_ZERO", "type": "error" }, { "inputs": [], "name": "ARRAY_LENGTH_MISMATCH", "type": "error" }, { "inputs": [], "name": "INVALID_DEPOSIT", "type": "error" }, { "inputs": [], "name": "INVALID_SIGNATURE", "type": "error" }, { "inputs": [], "name": "INVALID_WITHDRAW", "type": "error" }, { "inputs": [], "name": "InvalidShortString", "type": "error" }, { "inputs": [], "name": "SIGNATURE_DEADLINE_EXPIRED", "type": "error" }, { "inputs": [{ "internalType": "string", "name": "str", "type": "string" }], "name": "StringTooLong", "type": "error" }, { "inputs": [], "name": "TRANSFER_FAILED", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "bytes4", "name": "reason", "type": "bytes4" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "comment", "type": "string" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [], "name": "EIP712DomainChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "createReferral", "type": "address" }, { "indexed": true, "internalType": "address", "name": "mintReferral", "type": "address" }, { "indexed": false, "internalType": "address", "name": "firstMinter", "type": "address" }, { "indexed": false, "internalType": "address", "name": "zora", "type": "address" }, { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "creatorReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "createReferralReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "mintReferralReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "firstMinterReward", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "zoraReward", "type": "uint256" }], "name": "RewardsDeposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "WITHDRAW_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes4", "name": "reason", "type": "bytes4" }, { "internalType": "string", "name": "comment", "type": "string" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }, { "internalType": "bytes4[]", "name": "reasons", "type": "bytes4[]" }, { "internalType": "string", "name": "comment", "type": "string" }], "name": "depositBatch", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "creator", "type": "address" }, { "internalType": "uint256", "name": "creatorReward", "type": "uint256" }, { "internalType": "address", "name": "createReferral", "type": "address" }, { "internalType": "uint256", "name": "createReferralReward", "type": "uint256" }, { "internalType": "address", "name": "mintReferral", "type": "address" }, { "internalType": "uint256", "name": "mintReferralReward", "type": "uint256" }, { "internalType": "address", "name": "firstMinter", "type": "address" }, { "internalType": "uint256", "name": "firstMinterReward", "type": "uint256" }, { "internalType": "address", "name": "zora", "type": "address" }, { "internalType": "uint256", "name": "zoraReward", "type": "uint256" }], "name": "depositRewards", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "eip712Domain", "outputs": [{ "internalType": "bytes1", "name": "fields", "type": "bytes1" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "version", "type": "string" }, { "internalType": "uint256", "name": "chainId", "type": "uint256" }, { "internalType": "address", "name": "verifyingContract", "type": "address" }, { "internalType": "bytes32", "name": "salt", "type": "bytes32" }, { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawFor", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "withdrawWithSig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

//Protocol rewards contract: https://explorer.zora.energy/address/0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B?tab=contract
//Protocol rewards contract on BASE: https://basescan.org/address/0x7777777f279eba3d3ad8f4e708545291a6fdba8b#code
export const ZORA_REWARDS_CONTRACT_ADDRESS = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B"


export const THE_KEEPERS_ABI = [{ "inputs": [{ "internalType": "address", "name": "_logic", "type": "address" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "previousAdmin", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAdmin", "type": "address" }], "name": "AdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "beacon", "type": "address" }], "name": "BeaconUpgraded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "stateMutability": "payable", "type": "receive" }]




export const SONG_CONTRACT = {
    THE_KEEPERS: "0xbd87f4da73ff92a7bea31e2de20e14f9829f42fe",
    HONEY: "0x9f3303e2c04e79387c3b5089b8a73e0b466e9076",
    BREATHE: "0xfcf069b5876ab35107e44906933cf67110a60bcd"
}

export const PROHOBITION_ADDRESS = "0x47a91457a3a1f700097199fd63c039c4784384ab"

export const PROHOBITION_ABI = [{ "inputs": [{ "internalType": "string", "name": "_tokenName", "type": "string" }, { "internalType": "string", "name": "_tokenSymbol", "type": "string" }, { "internalType": "address", "name": "_renderProviderAddress", "type": "address" }, { "internalType": "address", "name": "_platformProviderAddress", "type": "address" }, { "internalType": "address", "name": "_randomizerContract", "type": "address" }, { "internalType": "address", "name": "_adminACLContract", "type": "address" }, { "internalType": "uint248", "name": "_startingProjectId", "type": "uint248" }, { "internalType": "bool", "name": "_autoApproveArtistSplitProposals", "type": "bool" }, { "internalType": "address", "name": "_engineRegistryContract", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "AcceptedArtistAddressesAndSplits", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "ExternalAssetDependencyRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "_index", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "_cid", "type": "string" }, { "indexed": false, "internalType": "enum IGenArt721CoreContractV3_Engine_Flex.ExternalAssetDependencyType", "name": "_dependencyType", "type": "uint8" }, { "indexed": false, "internalType": "uint24", "name": "_externalAssetDependencyCount", "type": "uint24" }], "name": "ExternalAssetDependencyUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum IGenArt721CoreContractV3_Engine_Flex.ExternalAssetDependencyType", "name": "_dependencyType", "type": "uint8" }, { "indexed": false, "internalType": "string", "name": "_gatewayAddress", "type": "string" }], "name": "GatewayUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_currentMinter", "type": "address" }], "name": "MinterUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "_field", "type": "bytes32" }], "name": "PlatformUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "ProjectExternalAssetDependenciesLocked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "indexed": true, "internalType": "bytes32", "name": "_update", "type": "bytes32" }], "name": "ProjectUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "_artistAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "_additionalPayeePrimarySales", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_additionalPayeePrimarySalesPercentage", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "_additionalPayeeSecondarySales", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_additionalPayeeSecondarySalesPercentage", "type": "uint256" }], "name": "ProposedArtistAddressesAndSplits", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "_projectName", "type": "string" }, { "internalType": "address payable", "name": "_artistAddress", "type": "address" }], "name": "addProject", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_cidOrData", "type": "string" }, { "internalType": "enum IGenArt721CoreContractV3_Engine_Flex.ExternalAssetDependencyType", "name": "_dependencyType", "type": "uint8" }], "name": "addProjectExternalAssetDependency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_script", "type": "string" }], "name": "addProjectScript", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_sender", "type": "address" }, { "internalType": "address", "name": "_contract", "type": "address" }, { "internalType": "bytes4", "name": "_selector", "type": "bytes4" }], "name": "adminACLAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_sender", "type": "address" }, { "internalType": "address", "name": "_contract", "type": "address" }, { "internalType": "bytes4", "name": "_selector", "type": "bytes4" }, { "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "adminACLAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminACLContract", "outputs": [{ "internalType": "contract IAdminACLV0", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "address payable", "name": "_artistAddress", "type": "address" }, { "internalType": "address payable", "name": "_additionalPayeePrimarySales", "type": "address" }, { "internalType": "uint256", "name": "_additionalPayeePrimarySalesPercentage", "type": "uint256" }, { "internalType": "address payable", "name": "_additionalPayeeSecondarySales", "type": "address" }, { "internalType": "uint256", "name": "_additionalPayeeSecondarySalesPercentage", "type": "uint256" }], "name": "adminAcceptArtistAddressesAndSplits", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "artblocksDependencyRegistryAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "autoApproveArtistSplitProposals", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "coreType", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "coreVersion", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "defaultBaseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "forbidNewProjects", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "getHistoricalRandomizerAt", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_price", "type": "uint256" }], "name": "getPrimaryRevenueSplits", "outputs": [{ "internalType": "uint256", "name": "renderProviderRevenue_", "type": "uint256" }, { "internalType": "address payable", "name": "renderProviderAddress_", "type": "address" }, { "internalType": "uint256", "name": "platformProviderRevenue_", "type": "uint256" }, { "internalType": "address payable", "name": "platformProviderAddress_", "type": "address" }, { "internalType": "uint256", "name": "artistRevenue_", "type": "uint256" }, { "internalType": "address payable", "name": "artistAddress_", "type": "address" }, { "internalType": "uint256", "name": "additionalPayeePrimaryRevenue_", "type": "uint256" }, { "internalType": "address payable", "name": "additionalPayeePrimaryAddress_", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "getRoyalties", "outputs": [{ "internalType": "address payable[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "bps", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_minter", "type": "address" }], "name": "isMintWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "lockProjectExternalAssetDependencies", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "address", "name": "_by", "type": "address" }], "name": "mint_Ecf", "outputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minterContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "newProjectsForbidden", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nextProjectId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numHistoricalRandomizers", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "platformProviderPrimarySalesAddress", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "platformProviderPrimarySalesPercentage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "platformProviderSecondarySalesAddress", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "platformProviderSecondarySalesBPS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "preferredArweaveGateway", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "preferredIPFSGateway", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectArtistPaymentInfo", "outputs": [{ "internalType": "address", "name": "artistAddress", "type": "address" }, { "internalType": "address", "name": "additionalPayeePrimarySales", "type": "address" }, { "internalType": "uint256", "name": "additionalPayeePrimarySalesPercentage", "type": "uint256" }, { "internalType": "address", "name": "additionalPayeeSecondarySales", "type": "address" }, { "internalType": "uint256", "name": "additionalPayeeSecondarySalesPercentage", "type": "uint256" }, { "internalType": "uint256", "name": "secondaryMarketRoyaltyPercentage", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectDetails", "outputs": [{ "internalType": "string", "name": "projectName", "type": "string" }, { "internalType": "string", "name": "artist", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "website", "type": "string" }, { "internalType": "string", "name": "license", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "projectExternalAssetDependencyByIndex", "outputs": [{ "components": [{ "internalType": "string", "name": "cid", "type": "string" }, { "internalType": "enum IGenArt721CoreContractV3_Engine_Flex.ExternalAssetDependencyType", "name": "dependencyType", "type": "uint8" }, { "internalType": "address", "name": "bytecodeAddress", "type": "address" }, { "internalType": "string", "name": "data", "type": "string" }], "internalType": "struct IGenArt721CoreContractV3_Engine_Flex.ExternalAssetDependencyWithData", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectExternalAssetDependencyCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectIdToAdditionalPayeePrimarySales", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectIdToAdditionalPayeePrimarySalesPercentage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectIdToAdditionalPayeeSecondarySales", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectIdToAdditionalPayeeSecondarySalesPercentage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectIdToArtistAddress", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectIdToSecondaryMarketRoyaltyPercentage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "projectScriptByIndex", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "projectScriptBytecodeAddressByIndex", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectScriptDetails", "outputs": [{ "internalType": "string", "name": "scriptTypeAndVersion", "type": "string" }, { "internalType": "string", "name": "aspectRatio", "type": "string" }, { "internalType": "uint256", "name": "scriptCount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectStateData", "outputs": [{ "internalType": "uint256", "name": "invocations", "type": "uint256" }, { "internalType": "uint256", "name": "maxInvocations", "type": "uint256" }, { "internalType": "bool", "name": "active", "type": "bool" }, { "internalType": "bool", "name": "paused", "type": "bool" }, { "internalType": "uint256", "name": "completedTimestamp", "type": "uint256" }, { "internalType": "bool", "name": "locked", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "projectURIInfo", "outputs": [{ "internalType": "string", "name": "projectBaseURI", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "address payable", "name": "_artistAddress", "type": "address" }, { "internalType": "address payable", "name": "_additionalPayeePrimarySales", "type": "address" }, { "internalType": "uint256", "name": "_additionalPayeePrimarySalesPercentage", "type": "uint256" }, { "internalType": "address payable", "name": "_additionalPayeeSecondarySales", "type": "address" }, { "internalType": "uint256", "name": "_additionalPayeeSecondarySalesPercentage", "type": "uint256" }], "name": "proposeArtistPaymentAddressesAndSplits", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "proposedArtistAddressesAndSplitsHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "randomizerContract", "outputs": [{ "internalType": "contract IRandomizerV2", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_index", "type": "uint256" }], "name": "removeProjectExternalAssetDependency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "removeProjectLastScript", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renderProviderPrimarySalesAddress", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renderProviderPrimarySalesPercentage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renderProviderSecondarySalesAddress", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renderProviderSecondarySalesBPS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "bytes32", "name": "_hashSeed", "type": "bytes32" }], "name": "setTokenHash_8PT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startingProjectId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "toggleProjectIsActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "name": "toggleProjectIsPaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenIdToHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenIdToHashSeed", "outputs": [{ "internalType": "bytes12", "name": "", "type": "bytes12" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenIdToProjectId", "outputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_artblocksDependencyRegistryAddress", "type": "address" }], "name": "updateArtblocksDependencyRegistryAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_gateway", "type": "string" }], "name": "updateArweaveGateway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_defaultBaseURI", "type": "string" }], "name": "updateDefaultBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_gateway", "type": "string" }], "name": "updateIPFSGateway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "updateMinterContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "address payable", "name": "_artistAddress", "type": "address" }], "name": "updateProjectArtistAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_projectArtistName", "type": "string" }], "name": "updateProjectArtistName", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_aspectRatio", "type": "string" }], "name": "updateProjectAspectRatio", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "updateProjectBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_projectDescription", "type": "string" }], "name": "updateProjectDescription", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_index", "type": "uint256" }, { "internalType": "string", "name": "_cidOrData", "type": "string" }, { "internalType": "enum IGenArt721CoreContractV3_Engine_Flex.ExternalAssetDependencyType", "name": "_dependencyType", "type": "uint8" }], "name": "updateProjectExternalAssetDependency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_projectLicense", "type": "string" }], "name": "updateProjectLicense", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint24", "name": "_maxInvocations", "type": "uint24" }], "name": "updateProjectMaxInvocations", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_projectName", "type": "string" }], "name": "updateProjectName", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_scriptId", "type": "uint256" }, { "internalType": "string", "name": "_script", "type": "string" }], "name": "updateProjectScript", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "bytes32", "name": "_scriptTypeAndVersion", "type": "bytes32" }], "name": "updateProjectScriptType", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_secondMarketRoyalty", "type": "uint256" }], "name": "updateProjectSecondaryMarketRoyaltyPercentage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "string", "name": "_projectWebsite", "type": "string" }], "name": "updateProjectWebsite", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "renderProviderPrimarySalesPercentage_", "type": "uint256" }, { "internalType": "uint256", "name": "platformProviderPrimarySalesPercentage_", "type": "uint256" }], "name": "updateProviderPrimarySalesPercentages", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_renderProviderPrimarySalesAddress", "type": "address" }, { "internalType": "address payable", "name": "_renderProviderSecondarySalesAddress", "type": "address" }, { "internalType": "address payable", "name": "_platformProviderPrimarySalesAddress", "type": "address" }, { "internalType": "address payable", "name": "_platformProviderSecondarySalesAddress", "type": "address" }], "name": "updateProviderSalesAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_renderProviderSecondarySalesBPS", "type": "uint256" }, { "internalType": "uint256", "name": "_platformProviderSecondarySalesBPS", "type": "uint256" }], "name": "updateProviderSecondarySalesBPS", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_randomizerAddress", "type": "address" }], "name": "updateRandomizerAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]


export const MINT_REWARDS_ABI_ERC1155 = [
    {
        "stateMutability": "nonpayable",
        "type": "constructor",
        "inputs": [
            {
                "name": "_mintFeeRecipient",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "_upgradeGate",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "_protocolRewards",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "CONTRACT_BASE_ID",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "PERMISSION_BIT_ADMIN",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "PERMISSION_BIT_FUNDS_MANAGER",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "PERMISSION_BIT_METADATA",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "PERMISSION_BIT_MINTER",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "PERMISSION_BIT_SALES",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "PLATFORM_REFERRAL_REWARD_DEPOSIT_REASON",
        "outputs": [
            {
                "name": "",
                "internalType": "bytes4",
                "type": "bytes4"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "user",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "permissionBits",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "addPermission",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "recipient",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "quantity",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "adminMint",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "recipient",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "tokenIds",
                "internalType": "uint256[]",
                "type": "uint256[]"
            },
            {
                "name": "quantities",
                "internalType": "uint256[]",
                "type": "uint256[]"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "adminMintBatch",
        "outputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "lastTokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "assumeLastTokenIdMatches",
        "outputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "account",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "id",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "accounts",
                "internalType": "address[]",
                "type": "address[]"
            },
            {
                "name": "ids",
                "internalType": "uint256[]",
                "type": "uint256[]"
            }
        ],
        "name": "balanceOfBatch",
        "outputs": [
            {
                "name": "batchBalances",
                "internalType": "uint256[]",
                "type": "uint256[]"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "tokenIds",
                "internalType": "uint256[]",
                "type": "uint256[]"
            },
            {
                "name": "amounts",
                "internalType": "uint256[]",
                "type": "uint256[]"
            }
        ],
        "name": "burnBatch",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "callRenderer",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "salesConfig",
                "internalType": "contract IMinter1155",
                "type": "address"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "callSale",
        "outputs": []
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [
            {
                "name": "numTokens",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "computeFreeMintRewards",
        "outputs": [
            {
                "name": "",
                "internalType": "struct RewardsSettings",
                "type": "tuple",
                "components": [
                    {
                        "name": "creatorReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "createReferralReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "mintReferralReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "firstMinterReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "zoraReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "platformReferralReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [
            {
                "name": "numTokens",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "computePaidMintRewards",
        "outputs": [
            {
                "name": "",
                "internalType": "struct RewardsSettings",
                "type": "tuple",
                "components": [
                    {
                        "name": "creatorReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "createReferralReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "mintReferralReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "firstMinterReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "zoraReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "platformReferralReward",
                        "internalType": "uint256",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [
            {
                "name": "numTokens",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "computeTotalReward",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "config",
        "outputs": [
            {
                "name": "owner",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "__gap1",
                "internalType": "uint96",
                "type": "uint96"
            },
            {
                "name": "fundsRecipient",
                "internalType": "address payable",
                "type": "address"
            },
            {
                "name": "__gap2",
                "internalType": "uint96",
                "type": "uint96"
            },
            {
                "name": "transferHook",
                "internalType": "contract ITransferHookReceiver",
                "type": "address"
            },
            {
                "name": "__gap3",
                "internalType": "uint96",
                "type": "uint96"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "contractURI",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ]
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [],
        "name": "contractVersion",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "createReferrals",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "customRenderers",
        "outputs": [
            {
                "name": "",
                "internalType": "contract IRenderer1155",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "premintConfig",
                "internalType": "bytes",
                "type": "bytes"
            },
            {
                "name": "premintVersion",
                "internalType": "bytes32",
                "type": "bytes32"
            },
            {
                "name": "signature",
                "internalType": "bytes",
                "type": "bytes"
            },
            {
                "name": "sender",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "delegateSetupNewToken",
        "outputs": [
            {
                "name": "newTokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint32",
                "type": "uint32"
            }
        ],
        "name": "delegatedTokenId",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "firstMinters",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "getCreatorRewardRecipient",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "getCustomRenderer",
        "outputs": [
            {
                "name": "customRenderer",
                "internalType": "contract IRenderer1155",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "getRoyalties",
        "outputs": [
            {
                "name": "",
                "internalType": "struct ICreatorRoyaltiesControl.RoyaltyConfiguration",
                "type": "tuple",
                "components": [
                    {
                        "name": "royaltyMintSchedule",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyBPS",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyRecipient",
                        "internalType": "address",
                        "type": "address"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "getTokenInfo",
        "outputs": [
            {
                "name": "",
                "internalType": "struct IZoraCreator1155TypesV1.TokenData",
                "type": "tuple",
                "components": [
                    {
                        "name": "uri",
                        "internalType": "string",
                        "type": "string"
                    },
                    {
                        "name": "maxSupply",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "totalMinted",
                        "internalType": "uint256",
                        "type": "uint256"
                    }
                ]
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "implementation",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "contractName",
                "internalType": "string",
                "type": "string"
            },
            {
                "name": "newContractURI",
                "internalType": "string",
                "type": "string"
            },
            {
                "name": "defaultRoyaltyConfiguration",
                "internalType": "struct ICreatorRoyaltiesControl.RoyaltyConfiguration",
                "type": "tuple",
                "components": [
                    {
                        "name": "royaltyMintSchedule",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyBPS",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyRecipient",
                        "internalType": "address",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "defaultAdmin",
                "internalType": "address payable",
                "type": "address"
            },
            {
                "name": "setupActions",
                "internalType": "bytes[]",
                "type": "bytes[]"
            }
        ],
        "name": "initialize",
        "outputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "user",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "role",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "isAdminOrRole",
        "outputs": [
            {
                "name": "",
                "internalType": "bool",
                "type": "bool"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "account",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "operator",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "name": "",
                "internalType": "bool",
                "type": "bool"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "metadataRendererContract",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "payable",
        "type": "function",
        "inputs": [
            {
                "name": "minter",
                "internalType": "contract IMinter1155",
                "type": "address"
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "quantity",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "rewardsRecipients",
                "internalType": "address[]",
                "type": "address[]"
            },
            {
                "name": "minterArguments",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "mint",
        "outputs": []
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [],
        "name": "mintFee",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "payable",
        "type": "function",
        "inputs": [
            {
                "name": "minter",
                "internalType": "contract IMinter1155",
                "type": "address"
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "quantity",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "minterArguments",
                "internalType": "bytes",
                "type": "bytes"
            },
            {
                "name": "mintReferral",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "mintWithRewards",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "data",
                "internalType": "bytes[]",
                "type": "bytes[]"
            }
        ],
        "name": "multicall",
        "outputs": [
            {
                "name": "results",
                "internalType": "bytes[]",
                "type": "bytes[]"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "nextTokenId",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "permissions",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "protocolRewards",
        "outputs": [
            {
                "name": "",
                "internalType": "contract IProtocolRewards",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
            {
                "name": "",
                "internalType": "bytes32",
                "type": "bytes32"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "user",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "permissionBits",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "removePermission",
        "outputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "royalties",
        "outputs": [
            {
                "name": "royaltyMintSchedule",
                "internalType": "uint32",
                "type": "uint32"
            },
            {
                "name": "royaltyBPS",
                "internalType": "uint32",
                "type": "uint32"
            },
            {
                "name": "royaltyRecipient",
                "internalType": "address",
                "type": "address"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "salePrice",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "royaltyInfo",
        "outputs": [
            {
                "name": "receiver",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "royaltyAmount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "ids",
                "internalType": "uint256[]",
                "type": "uint256[]"
            },
            {
                "name": "amounts",
                "internalType": "uint256[]",
                "type": "uint256[]"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "id",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "operator",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "approved",
                "internalType": "bool",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "fundsRecipient",
                "internalType": "address payable",
                "type": "address"
            }
        ],
        "name": "setFundsRecipient",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "newOwner",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "renderer",
                "internalType": "contract IRenderer1155",
                "type": "address"
            }
        ],
        "name": "setTokenMetadataRenderer",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "transferHook",
                "internalType": "contract ITransferHookReceiver",
                "type": "address"
            }
        ],
        "name": "setTransferHook",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "newURI",
                "internalType": "string",
                "type": "string"
            },
            {
                "name": "maxSupply",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "setupNewToken",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "newURI",
                "internalType": "string",
                "type": "string"
            },
            {
                "name": "maxSupply",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "createReferral",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "setupNewTokenWithCreateReferral",
        "outputs": [
            {
                "name": "",
                "internalType": "uint256",
                "type": "uint256"
            }
        ]
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [],
        "name": "supportedPremintSignatureVersions",
        "outputs": [
            {
                "name": "",
                "internalType": "string[]",
                "type": "string[]"
            }
        ]
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "interfaceId",
                "internalType": "bytes4",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "name": "",
                "internalType": "bool",
                "type": "bool"
            }
        ]
    },
    {
        "stateMutability": "pure",
        "type": "function",
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "_newURI",
                "internalType": "string",
                "type": "string"
            },
            {
                "name": "_newName",
                "internalType": "string",
                "type": "string"
            }
        ],
        "name": "updateContractMetadata",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "recipient",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "updateCreateReferral",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "newConfiguration",
                "internalType": "struct ICreatorRoyaltiesControl.RoyaltyConfiguration",
                "type": "tuple",
                "components": [
                    {
                        "name": "royaltyMintSchedule",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyBPS",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyRecipient",
                        "internalType": "address",
                        "type": "address"
                    }
                ]
            }
        ],
        "name": "updateRoyaltiesForToken",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "_newURI",
                "internalType": "string",
                "type": "string"
            }
        ],
        "name": "updateTokenURI",
        "outputs": []
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [
            {
                "name": "newImplementation",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "upgradeTo",
        "outputs": []
    },
    {
        "stateMutability": "payable",
        "type": "function",
        "inputs": [
            {
                "name": "newImplementation",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "data",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": []
    },
    {
        "stateMutability": "view",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "name": "",
                "internalType": "string",
                "type": "string"
            }
        ]
    },
    {
        "stateMutability": "nonpayable",
        "type": "function",
        "inputs": [],
        "name": "withdraw",
        "outputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "previousAdmin",
                "internalType": "address",
                "type": "address",
                "indexed": false
            },
            {
                "name": "newAdmin",
                "internalType": "address",
                "type": "address",
                "indexed": false
            }
        ],
        "name": "AdminChanged"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "account",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "operator",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "approved",
                "internalType": "bool",
                "type": "bool",
                "indexed": false
            }
        ],
        "name": "ApprovalForAll"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "beacon",
                "internalType": "address",
                "type": "address",
                "indexed": true
            }
        ],
        "name": "BeaconUpgraded"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "updater",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "updateType",
                "internalType": "enum IZoraCreator1155.ConfigUpdate",
                "type": "uint8",
                "indexed": true
            },
            {
                "name": "newConfig",
                "internalType": "struct IZoraCreator1155TypesV1.ContractConfig",
                "type": "tuple",
                "components": [
                    {
                        "name": "owner",
                        "internalType": "address",
                        "type": "address"
                    },
                    {
                        "name": "__gap1",
                        "internalType": "uint96",
                        "type": "uint96"
                    },
                    {
                        "name": "fundsRecipient",
                        "internalType": "address payable",
                        "type": "address"
                    },
                    {
                        "name": "__gap2",
                        "internalType": "uint96",
                        "type": "uint96"
                    },
                    {
                        "name": "transferHook",
                        "internalType": "contract ITransferHookReceiver",
                        "type": "address"
                    },
                    {
                        "name": "__gap3",
                        "internalType": "uint96",
                        "type": "uint96"
                    }
                ],
                "indexed": false
            }
        ],
        "name": "ConfigUpdated"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "updater",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "uri",
                "internalType": "string",
                "type": "string",
                "indexed": false
            },
            {
                "name": "name",
                "internalType": "string",
                "type": "string",
                "indexed": false
            }
        ],
        "name": "ContractMetadataUpdated"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "renderer",
                "internalType": "contract IRenderer1155",
                "type": "address",
                "indexed": false
            }
        ],
        "name": "ContractRendererUpdated"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "structHash",
                "internalType": "bytes32",
                "type": "bytes32",
                "indexed": false
            },
            {
                "name": "domainName",
                "internalType": "string",
                "type": "string",
                "indexed": false
            },
            {
                "name": "version",
                "internalType": "string",
                "type": "string",
                "indexed": false
            },
            {
                "name": "creator",
                "internalType": "address",
                "type": "address",
                "indexed": false
            },
            {
                "name": "signature",
                "internalType": "bytes",
                "type": "bytes",
                "indexed": false
            }
        ],
        "name": "CreatorAttribution"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "version",
                "internalType": "uint8",
                "type": "uint8",
                "indexed": false
            }
        ],
        "name": "Initialized"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "lastOwner",
                "internalType": "address",
                "type": "address",
                "indexed": false
            },
            {
                "name": "newOwner",
                "internalType": "address",
                "type": "address",
                "indexed": false
            }
        ],
        "name": "OwnershipTransferred"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "sender",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "minter",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            },
            {
                "name": "quantity",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false
            },
            {
                "name": "value",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false
            }
        ],
        "name": "Purchased"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            },
            {
                "name": "renderer",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "user",
                "internalType": "address",
                "type": "address",
                "indexed": true
            }
        ],
        "name": "RendererUpdated"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            },
            {
                "name": "sender",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "newURI",
                "internalType": "string",
                "type": "string",
                "indexed": false
            },
            {
                "name": "maxSupply",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false
            }
        ],
        "name": "SetupNewToken"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "operator",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "from",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "ids",
                "internalType": "uint256[]",
                "type": "uint256[]",
                "indexed": false
            },
            {
                "name": "values",
                "internalType": "uint256[]",
                "type": "uint256[]",
                "indexed": false
            }
        ],
        "name": "TransferBatch"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "operator",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "from",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "id",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false
            },
            {
                "name": "value",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": false
            }
        ],
        "name": "TransferSingle"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "value",
                "internalType": "string",
                "type": "string",
                "indexed": false
            },
            {
                "name": "id",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            }
        ],
        "name": "URI"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            },
            {
                "name": "user",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "permissions",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            }
        ],
        "name": "UpdatedPermissions"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            },
            {
                "name": "user",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "configuration",
                "internalType": "struct ICreatorRoyaltiesControl.RoyaltyConfiguration",
                "type": "tuple",
                "components": [
                    {
                        "name": "royaltyMintSchedule",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyBPS",
                        "internalType": "uint32",
                        "type": "uint32"
                    },
                    {
                        "name": "royaltyRecipient",
                        "internalType": "address",
                        "type": "address"
                    }
                ],
                "indexed": false
            }
        ],
        "name": "UpdatedRoyalties"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "from",
                "internalType": "address",
                "type": "address",
                "indexed": true
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256",
                "indexed": true
            },
            {
                "name": "tokenData",
                "internalType": "struct IZoraCreator1155TypesV1.TokenData",
                "type": "tuple",
                "components": [
                    {
                        "name": "uri",
                        "internalType": "string",
                        "type": "string"
                    },
                    {
                        "name": "maxSupply",
                        "internalType": "uint256",
                        "type": "uint256"
                    },
                    {
                        "name": "totalMinted",
                        "internalType": "uint256",
                        "type": "uint256"
                    }
                ],
                "indexed": false
            }
        ],
        "name": "UpdatedToken"
    },
    {
        "type": "event",
        "anonymous": false,
        "inputs": [
            {
                "name": "implementation",
                "internalType": "address",
                "type": "address",
                "indexed": true
            }
        ],
        "name": "Upgraded"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ADDRESS_DELEGATECALL_TO_NON_CONTRACT"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ADDRESS_LOW_LEVEL_CALL_FAILED"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "operator",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "user",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "Burn_NotOwnerOrApproved"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "CREATOR_FUNDS_RECIPIENT_NOT_SET"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "reason",
                "internalType": "bytes",
                "type": "bytes"
            }
        ],
        "name": "CallFailed"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "Call_TokenIdMismatch"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "CallerNotZoraCreator1155"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "quantity",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "totalMinted",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "maxSupply",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "CannotMintMoreTokens"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "proposedAddress",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "Config_TransferHookNotSupported"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_ACCOUNTS_AND_IDS_LENGTH_MISMATCH"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_ADDRESS_ZERO_IS_NOT_A_VALID_OWNER"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_BURN_AMOUNT_EXCEEDS_BALANCE"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_BURN_FROM_ZERO_ADDRESS"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_CALLER_IS_NOT_TOKEN_OWNER_OR_APPROVED"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_ERC1155RECEIVER_REJECTED_TOKENS"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_IDS_AND_AMOUNTS_LENGTH_MISMATCH"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_INSUFFICIENT_BALANCE_FOR_TRANSFER"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_MINT_TO_ZERO_ADDRESS"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_MINT_TO_ZERO_ADDRESS"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_SETTING_APPROVAL_FOR_SELF"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_TRANSFER_TO_NON_ERC1155RECEIVER_IMPLEMENTER"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1155_TRANSFER_TO_ZERO_ADDRESS"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1967_NEW_IMPL_NOT_CONTRACT"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1967_NEW_IMPL_NOT_UUPS"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ERC1967_UNSUPPORTED_PROXIABLEUUID"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "recipient",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "ETHWithdrawFailed"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "FUNCTION_MUST_BE_CALLED_THROUGH_ACTIVE_PROXY"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "FUNCTION_MUST_BE_CALLED_THROUGH_DELEGATECALL"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "contractValue",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "FundsWithdrawInsolvent"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "INITIALIZABLE_CONTRACT_ALREADY_INITIALIZED"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "INITIALIZABLE_CONTRACT_IS_NOT_INITIALIZING"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "INVALID_ADDRESS_ZERO"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "INVALID_ETH_AMOUNT"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "mintTo",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "merkleProof",
                "internalType": "bytes32[]",
                "type": "bytes32[]"
            },
            {
                "name": "merkleRoot",
                "internalType": "bytes32",
                "type": "bytes32"
            }
        ],
        "name": "InvalidMerkleProof"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "InvalidMintSchedule"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "InvalidSignatureVersion"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "MintNotYetStarted"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "Mint_InsolventSaleTransfer"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "Mint_TokenIDMintNotAllowed"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "Mint_UnknownCommand"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "Mint_ValueTransferFail"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "MinterContractAlreadyExists"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "MinterContractDoesNotExist"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "NewOwnerNeedsToBeAdmin"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "NoRendererForToken"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "ONLY_CREATE_REFERRAL"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "PremintDeleted"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "caller",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "recipient",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "amount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "ProtocolRewardsWithdrawFailed"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "renderer",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "RendererNotValid"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "Renderer_NotValidRendererContract"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "SaleEnded"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "SaleHasNotStarted"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "targetContract",
                "internalType": "address",
                "type": "address"
            }
        ],
        "name": "Sale_CannotCallNonSalesContract"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "expected",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "actual",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "TokenIdMismatch"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "UUPS_UPGRADEABLE_MUST_NOT_BE_CALLED_THROUGH_DELEGATECALL"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "user",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "limit",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "requestedAmount",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "UserExceedsMintLimit"
    },
    {
        "type": "error",
        "inputs": [
            {
                "name": "user",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "tokenId",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "role",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "UserMissingRoleForToken"
    },
    {
        "type": "error",
        "inputs": [],
        "name": "WrongValueSent"
    }
]