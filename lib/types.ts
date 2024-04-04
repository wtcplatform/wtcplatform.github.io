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



export type voteDest = {
    date: string, 
    destination: string, 
    time: string,
    id: string, 
    password: string, 
    done: false
}