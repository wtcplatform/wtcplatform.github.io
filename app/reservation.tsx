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

import { convertDataToVotedest, getUserList, getVoteByOther, getVoteDest, calculateNumberOfVotes, pushDataToFirestore, getProgress} from "@/lib/utils";
import React, { useState, useEffect } from "react";
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

    const [voteDestCreatedAt, setVoteDestCreatedAt] = useState<string>("");
    const [voteByOtherCreatedAt, setvoteByOtherCreatedAt] = useState<string>("");


    useEffect(()=> {
      getVoteDest()
        .then((response) => {
        const {createdAt} = response;
        setVoteDestCreatedAt(new Date(createdAt.seconds * 1000).toDateString())});
      
      getVoteByOther()
        .then((response) => {
        const {createdAt} = response;
        setvoteByOtherCreatedAt(new Date(createdAt.seconds * 1000).toDateString())});
    }, [])


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
      const {voteByOther} = await getVoteByOther();
      return writeVoteDataToExcel(voteByOther);
    }

    return (
      <>
      <Card className="w-full max-w-lg">
        <CardHeader className="pb-0">
          <CardTitle>予約</CardTitle>
          {/* <CardDescription>Use the buttons below to interact with the reservation system.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 py-4">
            <div>
            <p className="text-sm text-gray-500">1.サイトから下書きを取得</p>
            <Button variant="secondary" className="max-w-sm" onClick={() => {}}>取得</Button>
            <p className="text-sm text-gray-500">最終取得日:{voteByOtherCreatedAt}</p>
            </div>
            <div>
            <p className="text-sm text-gray-500">2.投票数の下書きをダウンロード</p>
            <Button variant="secondary" className="max-w-sm" onClick={downloadVoteByOther}>ダウンロード</Button>
            <p className="text-sm text-gray-500">※デフォルトで元の票数の3倍</p>
            </div>
            <div>
            <p className="text-sm text-gray-500">3.下書きを編集した投票先ファイルをアップロード</p>
            <input
                accept=".xlsx"
                className="w-full max-w-sm border border-gray-300 rounded-md py-2 px-4 text-sm"
                id="upload"
                type="file"
                onChange={handleUpload}
            />
            <p className="text-sm text-gray-500">※合計で1000票は超えないようにお願いします！</p>
            </div>
            <div>
            <p className="text-sm text-gray-500">4.投票の実行</p>
            <Button variant="secondary" className="max-w-sm" onClick={() => {}}>投票</Button>
            <p className="text-sm text-gray-500">最終更新日:{voteDestCreatedAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </>
    )
}