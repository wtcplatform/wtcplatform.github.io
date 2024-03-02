'use client';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, limit } from 'firebase/firestore/lite';
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { firebaseConfig } from "@/lib/firebase";
import { saveSortedDataToExcel } from "@/lib/xlsx";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

import type { User } from "@/lib/types";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, 'accounts');
      const firstFiveUsersQuery = query(userCollection, limit(5));
      const userSnapshot = await getDocs(firstFiveUsersQuery);
      
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id, // Include the document ID
        ...doc.data()
      })) as User[];
      console.log(userList);
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: User[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      for (const user of json) {
        if (user.id) {
          try {
            await setDoc(doc(db, "accounts", user.id), user);
            console.log('User added successfully:', user.id);
          } catch (error) {
            console.error("Error adding user:", user.id, error);
          }
        } else {
          console.warn('User skipped (Missing ID):', user);
        }
      }
      alert('Data upload completed!');
    };
    reader.readAsBinaryString(file);
  };

  const handleClick = async () => {
    const userCollection = collection(db, 'accounts');
    const userSnapshot = await getDocs(userCollection);

    const userList = userSnapshot.docs.map(doc => ({
      ...doc.data()
    })) as User[];
    saveSortedDataToExcel(userList, 'sortedData.xlsx');
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Manage Users</CardTitle>
        <CardDescription>1. 既存のユーザー一覧をダウンロード 2.新規会員を追加したxlsxファイルをアップロード.xlsx</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 items-start py-4">
        <div className="flex flex-col items-center space-y-4">
          <Button className="px-4 py-2" onClick={handleClick}>ユーザー一覧をダウンロード</Button>
          <p className="text-sm text-gray-500">Update Users (Please add rows to the downloaded user list.)</p>
          <input
            accept=".xlsx"
            className="w-full max-w-sm border border-gray-300 rounded-md py-2 px-4 text-sm"
            id="upload"
            type="file"
            onChange={handleUpload}
          />
        </div>
      </CardContent>
    </Card>
  );
}
