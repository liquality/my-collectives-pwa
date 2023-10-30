export const ZORA_REWARDS_ABI = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ADDRESS_ZERO",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ARRAY_LENGTH_MISMATCH",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALID_DEPOSIT",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALID_SIGNATURE",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "INVALID_WITHDRAW",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidShortString",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SIGNATURE_DEADLINE_EXPIRED",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            }
        ],
        "name": "StringTooLong",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TRANSFER_FAILED",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes4",
                "name": "reason",
                "type": "bytes4"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "comment",
                "type": "string"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "EIP712DomainChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "createReferral",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "mintReferral",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "firstMinter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "zora",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "creatorReward",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "createReferralReward",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "mintReferralReward",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "firstMinterReward",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "zoraReward",
                "type": "uint256"
            }
        ],
        "name": "RewardsDeposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdraw",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "WITHDRAW_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "bytes4",
                "name": "reason",
                "type": "bytes4"
            },
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes4[]",
                "name": "reasons",
                "type": "bytes4[]"
            },
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            }
        ],
        "name": "depositBatch",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "creatorReward",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "createReferral",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "createReferralReward",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "mintReferral",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "mintReferralReward",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "firstMinter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "firstMinterReward",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "zora",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "zoraReward",
                "type": "uint256"
            }
        ],
        "name": "depositRewards",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eip712Domain",
        "outputs": [
            {
                "internalType": "bytes1",
                "name": "fields",
                "type": "bytes1"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "version",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "verifyingContract",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            },
            {
                "internalType": "uint256[]",
                "name": "extensions",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "nonces",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawFor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "withdrawWithSig",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

//Protocol rewards contract: https://explorer.zora.energy/address/0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B?tab=contract
export const ZORA_REWARDS_CONTRACT_ADDRESS = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B"


export const BASE_GOERLI_MINT_ABI =
    [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "InvalidQueryRange", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "", "type": "uint8" }], "name": "RoundChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "TotalMintedChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "START_TOKEN_ID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "maxMint", "type": "uint256" }, { "internalType": "uint256", "name": "mintPrice", "type": "uint256" }, { "internalType": "bool", "name": "replace", "type": "bool" }], "name": "addAllowedRoleInRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "maxMint", "type": "uint256" }, { "internalType": "uint256", "name": "mintPrice", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoleInRoundParams[]", "name": "params", "type": "tuple[]" }, { "internalType": "bool", "name": "replace", "type": "bool" }], "name": "addAllowedRolesInRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }, { "internalType": "bool", "name": "replace", "type": "bool" }], "name": "addRoleAllocation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoleAllocationParams[]", "name": "params", "type": "tuple[]" }, { "internalType": "bool", "name": "replace", "type": "bool" }], "name": "addRolesAllocation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "maxMint", "type": "uint256" }, { "internalType": "uint256", "name": "mintPrice", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoleInRoundParams[]", "name": "rolesInRound", "type": "tuple[]" }, { "internalType": "bool", "name": "replaceRoleInRound", "type": "bool" }, { "components": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoundAllocationParams[]", "name": "roundAllocations", "type": "tuple[]" }, { "internalType": "bool", "name": "replaceRoundAllocations", "type": "bool" }, { "components": [{ "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoleAllocationParams[]", "name": "roleAllocations", "type": "tuple[]" }, { "internalType": "bool", "name": "replaceRoleAllocations", "type": "bool" }], "name": "addRolesRounds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }, { "internalType": "bool", "name": "replace", "type": "bool" }], "name": "addRoundAllocation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoundAllocationParams[]", "name": "params", "type": "tuple[]" }, { "internalType": "bool", "name": "replace", "type": "bool" }], "name": "addRoundsAllocation", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "adminMintTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }, { "internalType": "uint8", "name": "", "type": "uint8" }, { "internalType": "int16", "name": "", "type": "int16" }], "name": "allowedRolesInRound", "outputs": [{ "internalType": "uint8", "name": "round_id", "type": "uint8" }, { "internalType": "int16", "name": "role_id", "type": "int16" }, { "internalType": "uint256", "name": "max_mint", "type": "uint256" }, { "internalType": "uint256", "name": "mint_price", "type": "uint256" }, { "internalType": "bool", "name": "exists", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }, { "internalType": "uint8", "name": "", "type": "uint8" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allowedRolesInRoundArr", "outputs": [{ "internalType": "int16", "name": "", "type": "int16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "name": "allowedRolesInRoundCount", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "availableAllowedRounds", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "availableRoles", "outputs": [{ "internalType": "int16", "name": "", "type": "int16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "availableRounds", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURIExtended", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "currencyAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "currentRound", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "explicitOwnershipOf", "outputs": [{ "components": [{ "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "uint64", "name": "startTimestamp", "type": "uint64" }, { "internalType": "bool", "name": "burned", "type": "bool" }], "internalType": "struct IERC721A.TokenOwnership", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "explicitOwnershipsOf", "outputs": [{ "components": [{ "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "uint64", "name": "startTimestamp", "type": "uint64" }, { "internalType": "bool", "name": "burned", "type": "bool" }], "internalType": "struct IERC721A.TokenOwnership[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "freezeMetadata", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAllAllowedRolesInRounds", "outputs": [{ "components": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "maxMint", "type": "uint256" }, { "internalType": "uint256", "name": "mintPrice", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoleInRoundParams[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllRoleAllocations", "outputs": [{ "components": [{ "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoleAllocationParams[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllRoundAllocations", "outputs": [{ "components": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }], "internalType": "struct ApetimismLaunchpadNFT.RoundAllocationParams[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "round", "type": "uint8" }], "name": "getAllowedRolesInRoundArr", "outputs": [{ "internalType": "int16[]", "name": "", "type": "int16[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintPerAddress", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxMintPerTx", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "int16", "name": "role", "type": "int16" }], "name": "maxMintableForRole", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "int16", "name": "role", "type": "int16" }], "name": "maxMintableForTxForRole", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "metadataFrozen", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "metdataHasExtension", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "int16", "name": "role", "type": "int16" }, { "internalType": "uint16", "name": "apetimismFee", "type": "uint16" }, { "internalType": "address", "name": "apetimismAddress", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "int16", "name": "role", "type": "int16" }], "name": "mintPriceForCurrentRoundForRole", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mintableLeft", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "int16", "name": "role", "type": "int16" }], "name": "removeAllowedRoleInRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }, { "internalType": "int16", "name": "", "type": "int16" }], "name": "roleAllocations", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }, { "internalType": "uint8", "name": "", "type": "uint8" }], "name": "roundAllocations", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransfersFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "safeTransfersFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "baseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }], "name": "setCurrencyAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "round_", "type": "uint8" }], "name": "setCurrentRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint8", "name": "round", "type": "uint8" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "setCurrentRoundFromSignature", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "count", "type": "uint16" }], "name": "setMaxMintPerAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "count", "type": "uint16" }], "name": "setMaxMintPerTx", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "hasExtension", "type": "bool" }], "name": "setMetadataHasExtension", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "setSignerAddressFromSignature", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "signerAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "tokensOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "start", "type": "uint256" }, { "internalType": "uint256", "name": "stop", "type": "uint256" }], "name": "tokensOfOwnerIn", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalMinted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "name": "totalMintedInRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalRevenueShared", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "transfersFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "withdrawToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]


export const BASE_GOERLI_MINT_CONTRACT_ADDRESS = "0x5999e6eF7ee0b5Dd2fbEE53ac96DE8dF2F906441"