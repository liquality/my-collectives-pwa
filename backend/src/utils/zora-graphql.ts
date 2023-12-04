

/* 
//Can be used for getting data for a erc-721 collection, 
//but cannot be used for erc 1155 since this query does not allow to do WHERE tokenid


query MonarchCollectionTokenStats {
  aggregateStat {
    nftCount(
      where: {collectionAddresses: "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"}
    )
    ownerCount(
      where: {collectionAddresses: "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"}
    )
 
    salesVolume(
      where: {collectionAddresses: ["0x335eeef8e93a7a757d9e7912044d9cd264e2b2d8"]}
      networks: [{network: ETHEREUM, chain: MAINNET}]
    ) {
      usdcPrice
      totalCount
      chainTokenPrice
      
    }
  }
}

*/

/* ******** ABOVE QUERY RETURNS THIS DATA ********* */


/* 
{
  "data": {
    "aggregateStat": {
      "nftCount": 888,
      "ownerCount": 589,
      "salesVolume": {
        "usdcPrice": 7027507.868411335,
        "totalCount": 13563,
        "chainTokenPrice": 2313.3249116589623
      }
    }
  }
}
*/



/* 


query TokenInfos {
  tokens(
    networks: [{ network: ZORA, chain: ZORA_MAINNET }],
    pagination: { limit: 1 },
   tokens: [{ address: "your_address_here", tokenId: "your_address_here" ]} // This requires both tokenAddress and tokenId
    where: { collectionAddresses: [{collectionAddress}] }
  ) {
    nodes {
      token {
        collectionAddress
        tokenId
        name
        owner
        image {
          url
        }
        metadata
      }
    }
  }
}


*/


/* 
//As long as we have collectionAddressess, and not tokenIds or tokenContractAddresses, everything seems OK for erc-721s,
seems like collectionAddress is the same as tokencontract address and can be use interchangeably
query JacobsNFTs {
  tokens(
    networks: [{ network: ZORA, chain: ZORA_MAINNET }],
    pagination: { limit: 5 },
   
    where: {collectionAddresses: "0x1dfc778e081796f97da6d9662089dff72f6d011b"}
  ) {
    nodes {
      token {
        collectionAddress
        tokenId
        name
        owner
        image {
          url
        }
        metadata
      }
    }
  }
}


*/