export type User = {
    id: string; // Changed id to string based on probable XLSX output
    serial: number;
    name: string;
    password: string;
  }
  
export type VoteByOther = {
    [date: string]: {
        [courtNumber: string]: {
            [time: string]: number;
        }
    }
}

  const samplevote = {
    "2024-04-05": {
        "1番": {
            "08:30": 1,
            "10:30": 2,
            "12:30": 3,
            "14:30": 4,
            "16:30": 5,
            "18:30": 6,
        },
        "2番": {
            "08:30": 21,
            "10:30": 22,
            "12:30": 23,
            "14:30": 24,
            "16:30": 25,
            "18:30": 26,
        }
    } 
};
