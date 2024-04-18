'use client';
import { VoteByOther } from "@/lib/types";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, limit, orderBy } from 'firebase/firestore/lite';
import { firebaseConfig } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { processVoteDataFromExcel, writeVoteDataToExcel } from "@/lib/xlsx";
import * as XLSX from 'xlsx';

import { convertDataToVotedest, getUserList, getVoteByOther, calculateNumberOfVotes, pushDataToFirestore, getProgress} from "@/lib/utils";

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

    // push the data to Firestore
    
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return null;
      try {
        // Process the data from the uploaded file
        const voteByOther = await processVoteDataFromExcel(file);
        const userList = await getUserList({onlyAvailable: true});
        // convert the data to votedest
        const voteDestList = convertDataToVotedest(userList, voteByOther);
        // console.log(voteDest);
        const voteDestJson = voteDestList.reduce((a, v) => ({...a, [Object.keys(a).length.toString().padStart(6, "0")]: v}), {});
        await pushDataToFirestore({collectionName: "voteDest", data: voteDestJson});
        
         // todo: if number of votes exceeds the limit, show a warning
      } catch (error) {
        console.log(error);
      }
    };
    const downloadVoteByOther = async () => {
      const voteByOther = await getVoteByOther();
      return writeVoteDataToExcel(voteByOther);
    }

    const reserve = async () => {

      // get the data from Firestore
      const voteByOther = await getVoteByOther();
      const userList = await getUserList({onlyAvailable: true});
      console.log(userList.length);
      // convert the data to votedest
      const voteDestList = convertDataToVotedest(userList, voteByOther);
      // console.log(voteDest);
      const voteDestJson = voteDestList.reduce((a, v) => ({...a, [Object.keys(a).length.toString().padStart(6, "0")]: v}), {});
      await pushDataToFirestore({collectionName: "voteDest", data: voteDestJson});
    }

    return (
      <>
      <Card className="w-full max-w-lg">
        <CardHeader className="pb-0">
          <CardTitle>予約</CardTitle>
          <CardDescription>予約するために、下のボタンを操作してください</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 py-4">
            <Button variant="secondary" onClick={downloadVoteByOther}>たたき台を取得</Button>
            <div>
            <p className="text-sm text-gray-500">投票数のxlsxファイルをアップロードしてください。</p>
            <input
                accept=".xlsx"
                className="w-full max-w-sm border border-gray-300 rounded-md py-2 px-4 text-sm"
                id="upload"
                type="file"
                onChange={handleUpload}
            />
            <div>
            <div className="py-4">
            {(async () => {
              const {total, done} = await getProgress();
              return (
              <div className="py-4">
                <Button variant="secondary" onClick={reserve} disabled={!!done}>予約を開始する</Button>
                {!!done && (<p className = "text-sm text-gray-500">予約進行中 {done}/{total} </p>)}
                <Progress value={done/total*100} />
                <p className="text-sm text-gray-500">推定残り時間: {`${Math.floor((total-done)*15 / 3600)}時間${Math.floor(((total-done)*10 % 3600) / 60)}分`}
                </p>
              </div>
              )
            })()}
            </div>
            </div>
            </div>
            </div>
        </CardContent>
      </Card>
      </>
    )
}