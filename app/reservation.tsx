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

import { convertDataToVotedest, getUserList, getVoteByOther, getVoteDest, calculateNumberOfVotes, pushDataToFirestore, getProgress, transformVotes} from "@/lib/utils";
import React, { useState, useEffect } from "react";
import type { User } from "@/lib/types";
import { FaComputerMouse } from "react-icons/fa6";



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
    // const [Button1Disabled, setButton1Disabled] = useState<boolean>(false);


    useEffect(()=> {
      
      getVoteDest()
        .then((response) => {
        const {createdAt} = response;
        setVoteDestCreatedAt(new Date(createdAt.seconds * 1000).toString())});
      
      getVoteByOther()
        .then((response) => {
        const {createdAt} = response;
        setvoteByOtherCreatedAt(new Date(createdAt.seconds * 1000).toString())});
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
        const voteDestJson = voteDestList.reduce((a, v) => ({...a, [Object.keys(a).length.toString().padStart(6, "0")]: v}), {});
        await pushDataToFirestore({collectionName: "voteDest", data: voteDestJson});
      } catch (error) {
        console.log(error);
      }
    };
    const downloadVoteByOther = async () => {
      const {voteByOther} = await getVoteByOther();
      const draft = transformVotes(voteByOther);
      return writeVoteDataToExcel(draft);
    }

    const callVoteByOtherAPI = () => {
      fetch('https://d3i2sa9pw7.execute-api.us-east-1.amazonaws.com/alpha/execution', {
    method: 'POST',  // HTTP method
    headers: {
        'Content-Type': 'application/json',  // Content type header,
    },
    body: JSON.stringify({
        input: "{}",
        stateMachineArn: "arn:aws:states:us-east-1:982722143806:stateMachine:getVoteByOther"
    })  // Body data as a string
  }).then(response => response.json())  // Convert response to JSON
    .then(data => console.log(data))  // Log the response data
    .catch(error => console.error('Error:', error));  // Log any error
    alert("取得開始！30分ほど待って再読み込みしてください。")
    }

    const callVoteAPI = () => {
      fetch('https://d3i2sa9pw7.execute-api.us-east-1.amazonaws.com/alpha/execution', {
    method: 'POST',  // HTTP method
    headers: {
        'Content-Type': 'application/json',  // Content type header,
    },
    body: JSON.stringify({
        input: "{}",
        stateMachineArn: "arn:aws:states:us-east-1:982722143806:stateMachine:getVoteByOther"
    })  // Body data as a string
  }).then(response => response.json())  // Convert response to JSON
    .then(data => console.log(data))  // Log the response data
    .catch(error => console.error('Error:', error));  // Log any error
    alert("取得開始！")
    }

    return (
      <Card className="w-full max-w-lg">
        <CardHeader className="pb-0">
        <div className="flex items-center space-x-4">
        <FaComputerMouse className="w-8 h-8"/>
          <CardTitle>予約</CardTitle>
          </div>
          {/* <CardDescription>Use the buttons below to interact with the reservation system.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 py-4">
            <div>
            <Button variant="secondary" className="max-w-md" id="1" onClick={callVoteByOtherAPI}>1.サイトから下書きを取得</Button>
            <p className="text-xs text-gray-500">最終取得日:{voteByOtherCreatedAt}</p>
            <p className="text-xs text-gray-500">反映に30分程度かかります。一度だけ押してください。</p>
            </div>
            <div>
            <Button variant="secondary" className="max-w-md" onClick={downloadVoteByOther}>2.投票数の下書きをダウンロード</Button>
            <p className="text-xs text-gray-500">※デフォルトで元の票数の3倍</p>
            </div>
            <div>
            <p className="text-sm">3.下書きを編集した投票先ファイルをアップロード</p>
            <input
                accept=".xlsx"
                className="w-full max-w-sm border border-gray-300 rounded-md py-2 px-4 text-sm"
                id="upload"
                type="file"
                onChange={handleUpload}
            />
            <p className="text-xs text-gray-500">※合計で1000票は超えないようにお願いします！</p>
            </div>
            <div>
            <Button variant="secondary" className="max-w-md" id="2" onClick={() => {}}>4.投票の実行</Button>
            <p className="text-xs text-gray-500">最終更新日:{voteDestCreatedAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}