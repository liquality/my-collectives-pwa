export interface Pool {
  id: string;
  groupId: string;
  mintingContractAddress?: string;
  chainId?: number;
  createdAt: Date;
  tokenId: string;
}

export interface PoolWithMeta {
  id: string;
  groupId: string;
  mintingContractAddress?: string;
  chainId?: number;
  createdAt: Date;
  tokenId: string;
  imageUrl: string;
  name?: string | null;
}

export interface CreatePoolRequest {
  groupId: string;
  mintingContractAddress: string;
  chainId: number;
  tokenId: string;
}