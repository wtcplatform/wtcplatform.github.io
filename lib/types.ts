export type User = {
    id: string; // Changed id to string based on probable XLSX output
    serial: number;
    name: string;
    password: string;
    penaltyCount?: number;
  }

export type UserWithRights = User & {rights: number;}
  
export type VoteByOther = {
    [date: string]: {
        [courtNumber: string]: {
            [time: string]: number;
        }
    }
}

export type VoteDest = {
    date: string, 
    destination: string, 
    time: string,
    serial: string,
    id: string, 
    password: string, 
    done: boolean
}


export type CreatedAt = {
    "seconds": number,
    "nanoseconds": number
}