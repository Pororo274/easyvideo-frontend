export interface StorageBrief {
  usedSpace: number;
  totalAvailableSpace: number;
}

export interface UsersBrief {
  total: number;
  totalWithSubscription: number;
  totalBanned: number;
}

export interface Brief {
  disk: StorageBrief;
  users: UsersBrief;
}