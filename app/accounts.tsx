'use client';
import React from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, limit, orderBy } from 'firebase/firestore/lite';
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button";
import { firebaseConfig } from "@/lib/firebase";
import { saveSortedDataToExcel } from "@/lib/xlsx";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

import { getUserList, getVoteByOther } from "@/lib/utils";
import type { User } from "@/lib/types";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AccountsComponent() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const userList: User[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const userJson = userList.reduce((a, v) => ({...a, [v.serial.toString().padStart(4, "0")]: v}), {})

      await setDoc(doc(db, "account_list", (new Date()).toISOString()), {"createdAt": new Date(), userJson});
      alert('Data upload completed!');
    };
    reader.readAsBinaryString(file);
  };

  const handleClick = async () => {
    try {
      const userList = await getUserList({});
      const timestamp = (new Date()).toISOString().replace(/[:.]/g, '-');
      saveSortedDataToExcel(userList, `アカウント一覧_${timestamp}.xlsx`);
    } catch (error) {
      console.error("Error fetching or processing document: ", error);
    }
  };

    return (
        <div>
        <Card className="w-full max-w-lg">
        <CardHeader className="pb-0">
            <CardTitle>投票用アカウントの更新</CardTitle>
            <CardDescription>
              このセクションは、アカウントの名義一覧を編集するときのみ操作します。
              編集の手順は、
              1. "ユーザー一覧をダウンロード"ボタンから、現在のリストをエクセル形式でダウンロード
              2. 手元で会員を追加/削除する
              3. "新規会員の行を追加してアップロード"から、編集したxlsxファイルをアップロード
              ※自動で読み取っているので、フォーマットを変更しないでください。
            </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 items-start py-4">
            <div className="flex flex-col items-start space-y-4">
            <div>
            <p className="text-sm text-gray-500">1. 既存のユーザー一覧をダウンロード</p>
            <Button variant="secondary" className="px-4 py-2" onClick={handleClick}>ダウンロード</Button>
            </div>
            <div>
            <p className="text-sm text-gray-500">2. ダウンロードしたxlsxファイルの行を削除/追加してアップロード</p>
            <input
                accept=".xlsx"
                className="w-full max-w-sm border border-gray-300 rounded-md py-2 px-4 text-sm"
                id="upload"
                type="file"
                onChange={handleUpload}
            />
            <p className="text-sm text-gray-500">※この際、他の行と同じフォーマットで、行間を空けないようにしてください！</p>
            </div>
            </div>
        </CardContent>
        </Card>
        </div>
    );
}
