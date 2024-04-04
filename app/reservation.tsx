'use client';
import { VoteByOther } from "@/lib/types";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, limit, orderBy } from 'firebase/firestore/lite';
import { firebaseConfig } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { processVoteDataFromExcel } from "@/lib/xlsx";
import * as XLSX from 'xlsx';

import { convertDataToVotedest, getUserList, getVoteByOther, calculateNumberOfVotes, pushDataToFirestore} from "@/lib/utils";

import type { User } from "@/lib/types";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ReservationComponent() {
    //1. Scrape votes from the website
    //2. Push the votes object to the firestore
    //3. Create a votedest from the object.
    //4. Vote from the votedest
    // The problem is how to specify the votedest and votes object to use:
    //  -> Simply delete votedest and votebyother every time

    // This is a sample collected vote destinations
    const sampleVote = {
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
    } satisfies VoteByOther;

    // push the data to Firestore
    
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return null;
      try {
        // Process the data from the uploaded file
        const data = await processVoteDataFromExcel(file);
        console.log(calculateNumberOfVotes(data));
        // todo: if number of votes exceeds the limit, show a warning
      } catch (error) {
        console.log(error);
      }
    };

    const reserve = async () => {

      // get the data from Firestore
      const voteByOther = await getVoteByOther();
      const userList = await getUserList();
      // convert the data to votedest
      const voteDest = convertDataToVotedest(userList, voteByOther);
      console.log(voteDest.length);
      // console.log(voteDest);
      const userJson = userList.reduce((a, v) => ({...a, [v.serial.toString().padStart(6, "0")]: v}), {});
      await pushDataToFirestore({collectionName: "voteDest", data: userJson});
    }

    return (
      <Card className="w-full max-w-lg">
        <CardHeader className="pb-0">
          <CardTitle>Reservation</CardTitle>
          <CardDescription>Use the buttons below to interact with the reservation system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 py-4">
            <Button variant="secondary" onClick={getVoteByOther}>Get voteByOther(sample)</Button>
            <div>
            <p className="text-sm text-gray-500">投票数のxlsxファイルをアップロードしてください。</p>
            <input
                accept=".xlsx"
                className="w-full max-w-sm border border-gray-300 rounded-md py-2 px-4 text-sm"
                id="upload"
                type="file"
                onChange={handleUpload}
            />
            <Button variant="secondary" onClick={reserve}>予約を開始する</Button>
            </div>
            </div>
        </CardContent>
      </Card>
    )
}